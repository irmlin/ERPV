import cv2

from app.object_detection.predict import predict_bboxes
import numpy as np
import json
from fastapi import FastAPI
import base64
from app.payload.request import ImageInput
import onnxruntime
from app.constants import YOLOV4_ONNX_MODEL_PATH

app = FastAPI()
session = onnxruntime.InferenceSession(YOLOV4_ONNX_MODEL_PATH)


async def process_image(image) -> str:
    prediction_data = predict_bboxes(session, image)
    prediction_data = np.array(prediction_data)

    # no detections
    if prediction_data.shape[1] == 0:
        return json.dumps({
            "bboxes": []
        })

    bboxes = prediction_data[:, :, 0:5]
    result = {
        "bboxes": bboxes.tolist()
    }
    return json.dumps(result)


@app.post("/cv_api/detect")
async def detect(image_input: ImageInput):

    encoded_image = image_input.base64_image.encode("utf-8")
    decoded_image = base64.b64decode(encoded_image)
    np_arr = np.frombuffer(decoded_image, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    result = await process_image(image)

    return result

