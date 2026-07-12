from pathlib import Path

# Absolute paths anchored to the backend/ directory so the app works no
# matter what the current working directory is (local dev, uvicorn, Render, …).
# This file is backend/app/paths.py -> parents[1] is backend/.
BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"

BROCHURE_DIR = DATA_DIR / "brochures"
VECTORSTORE_DIR = DATA_DIR / "vectorstore"
CARS_FILE = DATA_DIR / "cars.json"
