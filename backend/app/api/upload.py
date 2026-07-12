from fastapi import APIRouter, UploadFile, File
from pathlib import Path
from app.paths import BROCHURE_DIR
import shutil

from app.rag.pipeline import rebuild_vector_database

router = APIRouter()

BROCHURE_FOLDER = BROCHURE_DIR
BROCHURE_FOLDER.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_brochure(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Only PDF files are allowed."
        }

    destination = BROCHURE_FOLDER / file.filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"Uploaded: {file.filename}")

    # Automatically rebuild vector database
    total_pdfs, total_chunks = rebuild_vector_database()

    return {
        "success": True,
        "message": "Brochure uploaded successfully!",
        "filename": file.filename,
        "total_brochures": total_pdfs,
        "total_chunks": total_chunks
    }