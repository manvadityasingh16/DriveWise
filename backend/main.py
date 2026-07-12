import os

from dotenv import load_dotenv

from app.api.settings import router as settings_router
from app.api.analytics import router as analytics_router
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.paths import BROCHURE_DIR
from app.api.upload import router as upload_router
from app.api.brochures import router as brochure_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import API routers
from app.api.ask import router as ask_router
from app.api.compare import router as compare_router

load_dotenv()

app = FastAPI(
    title="DriveWise API",
    description="Metadata-Aware Automotive RAG Assistant",
    version="1.0.0"
)

# Allowed frontend origins (comma-separated env var; falls back to local dev).
# e.g. ALLOWED_ORIGINS="https://drivewise.vercel.app,http://localhost:5173"
allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "ALLOWED_ORIGINS", "http://localhost:5173"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(ask_router)
app.include_router(compare_router)  
app.include_router(brochure_router)
app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(settings_router)

# Serve brochure PDFs
BROCHURE_FOLDER = BROCHURE_DIR
print("Serving brochures from:", BROCHURE_FOLDER.resolve())
print("Folder exists:", BROCHURE_FOLDER.exists())
print("Files:", list(BROCHURE_FOLDER.glob("*.pdf")))

app.mount(
    "/files",
    StaticFiles(directory=BROCHURE_FOLDER),
    name="files",
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DriveWise 🚗",
        "status": "Backend Running Successfully"
    }

@app.get("/health")
def health():
    return {
        "status": "OK"
    }