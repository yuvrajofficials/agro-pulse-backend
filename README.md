# 🌾 AgroPulse: Wheat Disease Detection Model

AgroPulse is an 🌱 agricultural prediction system designed to detect wheat leaf diseases and provide crop health insights using machine learning. Built with 🚀 **FastAPI**,** 🧠 TensorFlow**, and powered by **☁️ AWS Services** (EC2 and S3), this project aims to assist farmers and agricultural enthusiasts worldwide.


## Key Features:
**✨ Disease Prediction:** Detects wheat leaf diseases using advanced deep learning models.

**⚡ FastAPI Backend:** A modern, high-performance web framework.

**☁️ AWS S3 Integration:** Efficient model and data storage in the cloud.

**🐳 Dockerized Deployment:** Fully containerized for seamless deployment.

**📊 Data Pipelines:** Robust pipelines for preprocessing and training.

---

## 🛠️ Key Contributors

👨‍💻 **[Kishor Patil](https://github.com/kishorpatil)** 

👩‍💻 **[Pradnyanad Bhadarge](https://github.com/pradnyanand09)** 

👨‍💻 **[Shreejit Bhakte](https://github.com/shreejitbhakte)**

👨‍💻 **[Yuvraj Sankilwar](https://github.com/yuvrajofficials)**


---

## 📑 Table of Contents
1. 🗂️ Project Structure
2. 🚀 Installation
3. 🖥️ Usage
4. 🔗 API Endpoints
5. ☁️ Model and Data Storage
6. 🐳 Docker Setup
7. 📜 License


---

## Project Structure

The project follows a standard directory structure for FastAPI-based applications, organized as follows:


```plaintext
📂 agro-pulse-backend/
├── 📁 config/                    # YAML configuration files
│   ├── 📝 dev.yaml               # Development configuration
│   └── 📝 prod.yaml              # Production configuration
├── 📁 data/                      # Data storage
│   ├── 📂 raw/                   # Raw data
│   ├── 📂 processed/             # Processed data
│   └── 📂 interim/               # Interim data
├── 📁 docs/                      # Documentation
│   └── 📝 README.md              # Project-specific documentation
├── 📁 logs/                      # Log files
├── 📁 models/                    # Machine learning models
│   ├── 📂 checkpoints/           # Intermediate model checkpoints
│   └── 📂 final/                 # Final saved models
├── 📁 notebooks/                 # Jupyter notebooks for experimentation
├── 📁 scripts/                   # Utility scripts
│   ├── 📝 download_data.py       # Script to download datasets
│   └── 📝 train_model.py         # Script to train ML models
├── 📁 src/                       # Core source code
│   ├── 📂 api/                   # API routing
│   │   ├── 📝 routes.py          # API endpoints
│   │   └── 📝 app.py             # FastAPI app setup
│   ├── 📂 configs/               # Configuration logic
│   │   ├── 📝 base.py            # Base configuration setup
│   │   └── 📝 custom.py          # Custom configuration overrides
│   ├── 📂 pipelines/             # Data and training pipelines
│   │   ├── 📝 data_pipeline.py   # Data preprocessing pipeline
│   │   └── 📝 train_pipeline.py  # Model training pipeline
│   ├── 📂 tasks/                 # Task implementations
│   │   ├── 📝 model_training.py  # Model training tasks
│   │   └── 📝 monitoring.py      # Monitoring and validation tasks
│   ├── 📂 tests/                 # Unit tests
│   │   ├── 📝 test_api.py        # Tests for API functionality
│   │   └── 📝 test_pipeline.py   # Tests for pipelines
│   ├── 📂 utils/                 # Utility modules
│   │   ├── 📝 logger.py          # Custom logger utility
│   │   └── 📝 file_handler.py    # File handling utilities
│   └── 📂 workers/               # Background tasks and workers
│       └── 📝 task_runner.py     # Task runner implementation
├── ⚙️ .env                       # Environment variables
├── ⚙️ .gitignore                 # Git ignore file
├── 🐳 Dockerfile                 # Dockerfile for containerization
├── ⚙️ Makefile                   # Makefile for automating tasks
├── ⚙️ pyproject.toml             # Python project configuration
├── ⚙️ requirements.txt           # Python dependencies
└── 📜 README.md                  # Main project documentation

```




## 🚀 Installation

### ✅  Prerequisites

Before you begin, ensure you have the following installed on your system:

- **🐍Python 3.9+**
- **📦Pip**: Python package installer
- **🐳Docker** (Optional but recommended for containerization)
- **☁️AWS CLI** (For working with AWS S3 and EC2)

### 🛠️ Steps to Install:

1.Clone the repository:
   ```bash
   git clone https://github.com/yuvrajofficials/agro-pulse-backend.git
   cd agro-pulse-backend
   ```

2.Create a Python Virtual Environment:
 ```bash 
 python3 -m venv venv
source venv/bin/activate
```


3.Install dependencies:
```bash
pip install -r requirements.txt
```

4.Configure AWS (if working with S3/EC2): 

Make sure you have the AWS CLI installed and configured with the necessary credentials:

```bash
aws configure
```



## 🖥️ Usage
### 🏃Running Locally
- Start the FastAPI app locally:

```bash
uvicorn app.main:app --reload
```

- Open your browser and navigate to:
 ```bash 
 🌐http://127.0.0.1:8000 
 ```


### 📖Interacting with the API

Once the server is running, you can use Swagger UI for interactive API documentation. Visit the following URL:

```bash
🌐 http://127.0.0.1:8000/docs
```
Here, you can test various endpoints like disease prediction by uploading an image.


## 🌐 API Endpoints
**🧪 Disease Prediction**

- Endpoint: `/predict-disease/`

- Method: `POST`

- Description:  Upload an image of a wheat leaf to get disease predictions.
- 📩Request Body:
```bash
Content-Type: multipart/form-data
File: Image of the wheat leaf.
```

- 📋Example Request:

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/predict-disease/' \
  -H 'accept: application/json' \
  -F 'file=@/path/to/leaf_image.jpg'
```
- 📤Response:
```bash
{
  "disease": "Wheat Yellow Rust",
  "confidence": 0.87
}
```

## 📂Model and Data Storage

The trained model and dataset are stored in AWS S3 for scalable access and management.

###🚀 Uploading Files to S3
Use the AWS CLI to upload models and datasets to your S3 bucket:

🗂️ **Upload Model:**
```bash
aws s3 cp /path/to/your/model.h5 s3://agro-pulse/models/
```

📊 **Upload Dataset:**
```bash
aws s3 cp /path/to/your/dataset.csv s3://agro-pulse/datasets/
```

Once uploaded, the backend fetches the model and data directly from S3 at runtime, ensuring seamless scalability.

## 🐳 Docker Setup
This project is containerized using Docker, making it easy to deploy anywhere.

📦 **1. Building the Docker Image**
Navigate to the project directory and build the Docker image:

```bash
docker build -t agropulse-backend .
```
▶️ **2. Running the Docker Container**
Run the Docker container to start the application:

```bash
docker run -d -p 8000:8000 agropulse-backend
```
The FastAPI app will be available at: 🌐 http://localhost:8000

## 📜 License

This project is licensed under the `Apache 2.0 License` - see the [LICENSE](https://github.com/yuvrajofficials/agro-pulse-backend/blob/main/LICENSE) file for details.

## 🙌 Acknowledgements
**🏎️FastAPI:** Fast and high-performance web framework for building APIs with Python 3.8+.

**🤖TensorFlow:** Open-source machine learning library used for training and inference of the model.

**☁️AWS S3:** Cloud storage service used for storing the models and datasets.

**🐳Docker:** Used for creating a containerized environment for the project.
