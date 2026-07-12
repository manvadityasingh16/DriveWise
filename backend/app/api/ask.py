from fastapi import APIRouter
from pydantic import BaseModel

from app.rag.retriever import get_retriever
from app.rag.generator import AnswerGenerator

router = APIRouter()

retriever = get_retriever()
generator = AnswerGenerator()


class AskRequest(BaseModel):
    brand: str
    model: str
    question: str


@router.post("/ask")
async def ask_ai(request: AskRequest):

    # Combine brand, model and question for better retrieval
    search_query = f"{request.brand} {request.model} {request.question}"

    chunks = retriever.search(search_query)

    answer = generator.generate(search_query, chunks)

    source = ""
    page = ""

    if chunks:
        source = chunks[0]["metadata"]["source"]
        page = chunks[0]["metadata"]["page"]

    return {
        "success": True,
        "answer": answer,
        "source": source,
        "page": page,
    }