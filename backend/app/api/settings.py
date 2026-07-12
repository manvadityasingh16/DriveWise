from fastapi import APIRouter
from pathlib import Path
from app.paths import BROCHURE_DIR, VECTORSTORE_DIR

router = APIRouter()


@router.get("/settings")
def settings():

    return {

        "backend": True,

        "gemini": True,

        "embedding_model": "all-MiniLM-L6-v2",

        "vector_store": VECTORSTORE_DIR.exists(),

        "brochures": len(list(BROCHURE_DIR.glob("*.pdf"))),

        "chunks": 224,

        "version": "1.0.0"

    }