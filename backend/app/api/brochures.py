from fastapi import APIRouter
from pathlib import Path
from app.paths import BROCHURE_DIR

router = APIRouter()

BROCHURE_FOLDER = BROCHURE_DIR


@router.get("/brochures")
def get_brochures():
    brochures = []

    for pdf in BROCHURE_FOLDER.glob("*.pdf"):
        brochures.append({
            "name": pdf.stem.replace("-", " ").title(),
            "filename": pdf.name,
            "size": round(pdf.stat().st_size / 1024, 2)
        })

    return brochures