import os

def create_project_structure(base_dir="mlops-backend"):
    structure = {
        base_dir: [
            "config/dev.yaml",
            "config/prod.yaml",
            "data/raw/.gitkeep",
            "data/processed/.gitkeep",
            "data/interim/.gitkeep",
            "docs/README.md",
            "logs/.gitkeep",
            "models/checkpoints/.gitkeep",
            "models/final/.gitkeep",
            "notebooks/.gitkeep",
            "scripts/download_data.py",
            "scripts/train_model.py",
            "src/api/routes.py",
            "src/api/app.py",
            "src/configs/base.py",
            "src/configs/custom.py",
            "src/pipelines/data_pipeline.py",
            "src/pipelines/train_pipeline.py",
            "src/tasks/model_training.py",
            "src/tasks/monitoring.py",
            "src/tests/test_api.py",
            "src/tests/test_pipeline.py",
            "src/utils/logger.py",
            "src/utils/file_handler.py",
            "src/workers/task_runner.py",
            ".env",
            ".gitignore",
            "Dockerfile",
            "Makefile",
            "pyproject.toml",
            "requirements.txt",
            "README.md",
        ]
    }

    for root, files in structure.items():
        for file_path in files:
            full_path = os.path.join(root, file_path)
            directory = os.path.dirname(full_path)
            os.makedirs(directory, exist_ok=True)
            if not file_path.endswith("/.gitkeep"):  # Skip writing to placeholder files
                with open(full_path, "w") as f:
                    if file_path.endswith(".py"):
                        f.write("# TODO: Add implementation\n")
                    elif file_path.endswith(".md"):
                        f.write("# Documentation\n")
                    elif file_path.endswith(".gitignore"):
                        f.write("# Add patterns to ignore\n")
                    elif file_path.endswith(".yaml"):
                        f.write("# YAML Configuration\n")
                    elif file_path in [".env", "requirements.txt"]:
                        f.write("# Environment or requirements\n")
                    elif file_path == "Dockerfile":
                        f.write("# Dockerfile configuration\n")
                    elif file_path == "Makefile":
                        f.write("# Makefile commands\n")
                    elif file_path == "pyproject.toml":
                        f.write("# Python project metadata\n")
                    elif file_path == "README.md":
                        f.write("# Project Description\n")

if __name__ == "__main__":
    create_project_structure()
import os

def create_project_structure(base_dir="mlops-backend"):
    structure = {
        base_dir: [
            "config/dev.yaml",
            "config/prod.yaml",
            "data/raw/.gitkeep",
            "data/processed/.gitkeep",
            "data/interim/.gitkeep",
            "docs/README.md",
            "logs/.gitkeep",
            "models/checkpoints/.gitkeep",
            "models/final/.gitkeep",
            "notebooks/.gitkeep",
            "scripts/download_data.py",
            "scripts/train_model.py",
            "src/api/routes.py",
            "src/api/app.py",
            "src/configs/base.py",
            "src/configs/custom.py",
            "src/pipelines/data_pipeline.py",
            "src/pipelines/train_pipeline.py",
            "src/tasks/model_training.py",
            "src/tasks/monitoring.py",
            "src/tests/test_api.py",
            "src/tests/test_pipeline.py",
            "src/utils/logger.py",
            "src/utils/file_handler.py",
            "src/workers/task_runner.py",
            ".env",
            ".gitignore",
            "Dockerfile",
            "Makefile",
            "pyproject.toml",
            "requirements.txt",
            "README.md",
        ]
    }

    for root, files in structure.items():
        for file_path in files:
            full_path = os.path.join(root, file_path)
            directory = os.path.dirname(full_path)
            os.makedirs(directory, exist_ok=True)
            if not file_path.endswith("/.gitkeep"):  # Skip writing to placeholder files
                with open(full_path, "w") as f:
                    if file_path.endswith(".py"):
                        f.write("# TODO: Add implementation\n")
                    elif file_path.endswith(".md"):
                        f.write("# Documentation\n")
                    elif file_path.endswith(".gitignore"):
                        f.write("# Add patterns to ignore\n")
                    elif file_path.endswith(".yaml"):
                        f.write("# YAML Configuration\n")
                    elif file_path in [".env", "requirements.txt"]:
                        f.write("# Environment or requirements\n")
                    elif file_path == "Dockerfile":
                        f.write("# Dockerfile configuration\n")
                    elif file_path == "Makefile":
                        f.write("# Makefile commands\n")
                    elif file_path == "pyproject.toml":
                        f.write("# Python project metadata\n")
                    elif file_path == "README.md":
                        f.write("# Project Description\n")

if __name__ == "__main__":
    create_project_structure()
