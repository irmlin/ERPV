import cv2

from app.object_detection.predict import predict_on_image
import numpy as np
import json
from fastapi import FastAPI
import base64
from app.payload.request import ImageInput
import onnxruntime
from app.constants import YOLOV4_ONNX_MODEL_PATH, EFFICIENTNET_ONNX_MODEL_PATH, TEST_IMAGE_PATH

app = FastAPI()
yolo_session = onnxruntime.InferenceSession(YOLOV4_ONNX_MODEL_PATH)
efficientnet_session = onnxruntime.InferenceSession(EFFICIENTNET_ONNX_MODEL_PATH)


async def process_image(image_input) -> str:
    encoded_image = image_input.base64_image.encode("utf-8")
    decoded_image = base64.b64decode(encoded_image)
    np_arr = np.frombuffer(decoded_image, np.uint8)
    image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    return predict_on_image(yolo_session, efficientnet_session, image)


@app.post("/cv_api/detect")
async def detect(image_input: ImageInput):
    return await process_image(image_input)

