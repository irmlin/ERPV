FROM python:3.8.5
RUN apt-get update && apt-get install -y libgl1-mesa-glx && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app