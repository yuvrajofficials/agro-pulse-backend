# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set environment variables to prevent Python from writing .pyc files and to buffer output
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/requirements.txt

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the entire project into the working directory
COPY . /app/

# Expose the application port (if running a FastAPI/Flask app)
EXPOSE 8000

# Specify the command to run your application
CMD ["python", "main.py"]
