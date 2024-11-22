import tensorflow as tf
from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image, UnidentifiedImageError
import numpy as np
import io
import logging
from prometheus_fastapi_instrumentator import Instrumentator
import structlog

# Configure logging
logging.basicConfig(
    filename="api_logs.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

structlog.configure(
    processors=[
        structlog.processors.JSONRenderer()  # Log in JSON format for better parsing
    ]
)
logger = structlog.get_logger()

logger.info("API Starting")

# Load the trained model
try:
    model = tf.keras.models.load_model("./models/final/wheat_leaf_nn_model.h5")
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise RuntimeError(f"Error loading model: {e}")

# Initialize FastAPI app
app = FastAPI()

# Define disease categories (ensure they match training data)
disease_categories = ['Healthy', 'wheat_leaf_rust', 'wheat_loose_smut']

# Preprocessing function
def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Preprocess the input image to prepare it for the model.
    """
    try:
        image = image.resize((150, 150))  # Resize image to the model input size
        image = image.convert("RGB")      # Ensure image is in RGB format
        image = np.array(image) / 255.0   # Normalize pixel values
        image = np.expand_dims(image, axis=0)  # Add batch dimension (1, 150, 150, 3)
        return image
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise ValueError("Failed to preprocess image.")

# Instrumentation for metrics
Instrumentator().instrument(app).expose(app, endpoint="/metrics")

@app.get("/")
def home():
    """
    Home endpoint to check API status.
    """
    logger.info("Home endpoint accessed.")
    return {"message": "Welcome to the Wheat Leaf Disease Detection API"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """
    Prediction endpoint for wheat leaf disease detection.
    """
    try:
        # Validate file type
        if not file.filename.lower().endswith(('png', 'jpg', 'jpeg')):
            logger.error("Unsupported file format.")
            raise HTTPException(
                status_code=400, detail="Unsupported file format. Please upload PNG, JPG, or JPEG images."
            )

        # Read and open the uploaded image
        contents = await file.read()
        try:
            image = Image.open(io.BytesIO(contents))
        except UnidentifiedImageError as e:
            logger.error(f"Invalid image format: {e}")
            raise HTTPException(status_code=400, detail="Invalid image format.")

        # Preprocess the image
        preprocessed_image = preprocess_image(image)

        # Make prediction
        prediction = model.predict(preprocessed_image)

        # Get the predicted class
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Map the predicted class to the disease category
        predicted_disease = disease_categories[predicted_class]
        logger.info(f"Predicted disease: {predicted_disease}")
        return {"predicted_disease": predicted_disease}
    except HTTPException as http_exc:
        logger.error(f"HTTP error: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        return {"error": "An error occurred while processing the image."}

# Run the app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
