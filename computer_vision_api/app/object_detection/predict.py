import cv2
import numpy as np
import time
import json


def predict_on_image(yolo_session, efficientnet_engine, image):
    bboxes = predict_bboxes(yolo_session, image)

    # no detections
    if bboxes.shape[1] == 0:
        return json.dumps({
            "bboxes": [],
            "classes": []
        })

    bboxes = bboxes[:, :, 0:5][0].tolist()
    bboxes = expand_bboxes(bboxes)
    classes = predict_classes(efficientnet_engine, bboxes, image)

    return json.dumps({
        "bboxes": bboxes,
        "classes": classes
    })


def predict_classes(session, bboxes, image):
    input_name = session.get_inputs()[0].name
    predicted_classes = []
    for bbox in bboxes:
        bbox_data = [int(coord) for coord in bbox]
        xmin, ymin, xmax, ymax, _ = bbox_data
        frame_cut = image[ymin:ymax, xmin:xmax]

        IN_IMAGE_H = session.get_inputs()[0].shape[2]
        IN_IMAGE_W = session.get_inputs()[0].shape[3]

        resized = cv2.resize(frame_cut, (IN_IMAGE_W, IN_IMAGE_H), interpolation=cv2.INTER_LINEAR)
        img_in = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
        img_in = np.transpose(img_in, (2, 0, 1)).astype(np.float32)
        img_in = np.expand_dims(img_in, axis=0)
        # img_in /= 255.0
        print("Shape of the network input: ", img_in.shape)

        outputs = session.run(None, {input_name: img_in})[0]
        top_5_indices = np.argsort(-outputs[0])[0:5]
        predicted_classes.append({
            "class_ids": top_5_indices.tolist(),
            "scores": outputs[0, top_5_indices].tolist()
        })
    return predicted_classes


def predict_bboxes(session, image_src):

    original_image_shape = image_src.shape

    IN_IMAGE_H = session.get_inputs()[0].shape[2]
    IN_IMAGE_W = session.get_inputs()[0].shape[3]

    # Input
    resized = cv2.resize(image_src, (IN_IMAGE_W, IN_IMAGE_H), interpolation=cv2.INTER_LINEAR)
    img_in = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
    img_in = np.transpose(img_in, (2, 0, 1)).astype(np.float32)
    img_in = np.expand_dims(img_in, axis=0)
    img_in /= 255.0
    print("Shape of the network input: ", img_in.shape)

    # Compute
    input_name = session.get_inputs()[0].name
    outputs = session.run(None, {input_name: img_in})
    boxes = post_processing(original_image_shape, 0.5, 0.45, outputs)
    return boxes


def post_processing(original_image_shape, conf_thresh, nms_thresh, output):

    width = original_image_shape[1]
    height = original_image_shape[0]

    # [batch, num, 1, 4]
    box_array = output[0]

    # [batch, num, num_classes]
    confs = output[1]

    t1 = time.time()

    if type(box_array).__name__ != 'ndarray':
        box_array = box_array.cpu().detach().numpy()
        confs = confs.cpu().detach().numpy()

    num_classes = confs.shape[2]

    # [batch, num, 4]
    box_array = box_array[:, :, 0]

    # [batch, num, num_classes] --> [batch, num]
    max_conf = np.max(confs, axis=2)
    max_id = np.argmax(confs, axis=2)

    t2 = time.time()

    bboxes_batch = []
    # we are iterating through every image in batch here
    for i in range(box_array.shape[0]):

        argwhere = max_conf[i] > conf_thresh
        l_box_array = box_array[i, argwhere, :]
        l_max_conf = max_conf[i, argwhere]
        l_max_id = max_id[i, argwhere]

        bboxes = []
        # nms for each class
        for j in range(num_classes):

            cls_argwhere = l_max_id == j
            ll_box_array = l_box_array[cls_argwhere, :]
            ll_max_conf = l_max_conf[cls_argwhere]
            ll_max_id = l_max_id[cls_argwhere]

            keep = nms_cpu(ll_box_array, ll_max_conf, nms_thresh)

            if keep.size > 0:
                ll_box_array = ll_box_array[keep, :]
                ll_max_conf = ll_max_conf[keep]
                ll_max_id = ll_max_id[keep]

                for k in range(ll_box_array.shape[0]):
                    bboxes.append(
                        [
                            ll_box_array[k, 0] * width,
                            ll_box_array[k, 1] * height,
                            ll_box_array[k, 2] * width,
                            ll_box_array[k, 3] * height,
                            ll_max_conf[k], ll_max_id[k]
                        ]
                    )

        bboxes_batch.append(bboxes)

    t3 = time.time()

    print('-----------------------------------')
    print('       max and argmax : %f' % (t2 - t1))
    print('                  nms : %f' % (t3 - t2))
    print('Post processing total : %f' % (t3 - t1))
    print('-----------------------------------')

    return np.array(bboxes_batch)


def nms_cpu(boxes, confs, nms_thresh=0.5, min_mode=False):
    # print(boxes.shape)
    x1 = boxes[:, 0]
    y1 = boxes[:, 1]
    x2 = boxes[:, 2]
    y2 = boxes[:, 3]

    areas = (x2 - x1) * (y2 - y1)
    order = confs.argsort()[::-1]

    keep = []
    while order.size > 0:
        idx_self = order[0]
        idx_other = order[1:]

        keep.append(idx_self)

        xx1 = np.maximum(x1[idx_self], x1[idx_other])
        yy1 = np.maximum(y1[idx_self], y1[idx_other])
        xx2 = np.minimum(x2[idx_self], x2[idx_other])
        yy2 = np.minimum(y2[idx_self], y2[idx_other])

        w = np.maximum(0.0, xx2 - xx1)
        h = np.maximum(0.0, yy2 - yy1)
        inter = w * h

        if min_mode:
            over = inter / np.minimum(areas[order[0]], areas[order[1:]])
        else:
            over = inter / (areas[order[0]] + areas[order[1:]] - inter)

        inds = np.where(over <= nms_thresh)[0]
        order = order[inds + 1]

    return np.array(keep)


def expand_bboxes(bboxes, expand_by=60):
    updated_bboxes = []
    for bbox in bboxes:
        bbox[0] -= expand_by
        bbox[1] -= expand_by
        bbox[2] += expand_by
        bbox[3] += expand_by
        updated_bboxes.append(bbox)
    return updated_bboxes