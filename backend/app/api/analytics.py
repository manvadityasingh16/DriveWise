from fastapi import APIRouter
from pathlib import Path
from app.paths import BROCHURE_DIR, VECTORSTORE_DIR, CARS_FILE as CARS_FILE_PATH
import json

router = APIRouter()

BROCHURE_FOLDER = BROCHURE_DIR
VECTOR_FOLDER = VECTORSTORE_DIR
CARS_FILE = CARS_FILE_PATH


@router.get("/analytics")
def analytics():

    # Count brochures
    pdfs = list(BROCHURE_FOLDER.glob("*.pdf"))

    # Total storage used
    total_size = sum(pdf.stat().st_size for pdf in pdfs)

    # Read cars.json
    brands = {}
    cars = []

    if CARS_FILE.exists():
        with CARS_FILE.open("r", encoding="utf-8") as f:
            cars = json.load(f)

        for car in cars:
            brand = car["brand"]
            brands[brand] = brands.get(brand, 0) + 1

    return {
        "brochures": len(pdfs),
        "storage": round(total_size / (1024 * 1024), 2),
        "brands": brands,
        "chunks": len(cars),
        "vector_ready": VECTOR_FOLDER.exists(),
    }