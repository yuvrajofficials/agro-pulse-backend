from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io
import tensorflow as tf
import torch
from transformers import BertForSequenceClassification, BertTokenizer
from pydantic import BaseModel
import json
import torch.nn.functional as F

# Initialize FastAPI app
app = FastAPI()

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins or specify the frontend origin here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Image Prediction Section -----

# Load the TensorFlow model for image classification
try:
    tf_model = tf.keras.models.load_model("./models/final/wheat_leaf_nn_model.h5")
except Exception as e:
    raise RuntimeError(f"Error loading TensorFlow model: {e}")

# Define disease categories for image predictions
disease_categories = ['Healthy', 'wheat_leaf_rust', 'wheat_loose_smut']

# Image preprocessing function
def preprocess_image(image: Image.Image) -> np.ndarray:
    """
    Preprocess the image for TensorFlow model prediction.
    Convert the image to a numpy array and normalize it.
    """
    image = image.resize((150, 150))  # Resize image to the input size of the model
    image = image.convert("RGB")  # Ensure the image is in RGB format
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension (1, 150, 150, 3)
    return image

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to predict the disease based on uploaded image using TensorFlow model.
    """
    try:
        # Read and open the uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Preprocess the image
        preprocessed_image = preprocess_image(image)

        # Make prediction
        prediction = tf_model.predict(preprocessed_image)

        # Get the predicted class
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Map the predicted class to the disease category
        predicted_disease = disease_categories[predicted_class]

        return {"predicted_disease": predicted_disease}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {e}")

# ----- Chatbot Section -----

# Load the fine-tuned BERT model and tokenizer
# model_path = "fine_tuned_tinybert"  # Adjust the model path accordingly
# try:
#     bert_model = BertForSequenceClassification.from_pretrained(model_path)
#     tokenizer = BertTokenizer.from_pretrained(model_path)
# except Exception as e:
#     raise RuntimeError(f"Error loading BERT model or tokenizer: {e}")

# # Set the BERT model to evaluation mode
# bert_model.eval()

# # Load chatbot completions data from a JSON file
# try:
#     with open('completions.json', 'r') as file:
#         completions_data = json.load(file)
# except FileNotFoundError:
#     raise RuntimeError("completions.json file not found. Ensure it exists in the working directory.")

# # Define the schema for the chatbot query
# class Query(BaseModel):
#     instruction: str

# @app.post("/chatbot/")
# async def chatbot(query: Query):
#     """
#     Endpoint for the chatbot to provide answers based on instructions using BERT.
#     """
#     try:
#         # Tokenize the query instruction
#         inputs = tokenizer.encode_plus(
#             query.instruction,
#             return_tensors="pt",
#             padding="max_length",
#             truncation=True,
#             max_length=128
#         )

#         # Run the model to get predictions
#         with torch.no_grad():
#             outputs = bert_model(**inputs)

#         logits = outputs.logits

#         # Get the predicted class index
#         predicted_index = torch.argmax(logits, dim=-1).item()

#         # Retrieve the answer
#         response = completions_data.get(str(predicted_index), "Sorry, I don't have an answer for that query.")
        
#         return {"instruction": query.instruction, "completion": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error during chatbot response generation: {e}")

# ----- General Routes -----

@app.get("/")
async def home():
    """
    Home route for API.
    """
    return {"message": "Welcome to the Agro Pulse API. Use /predict/ for image predictions or /chatbot/ for text queries."}

# Run the app with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)  # Make sure it binds to the correct IP
