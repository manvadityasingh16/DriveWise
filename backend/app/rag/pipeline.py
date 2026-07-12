from app.rag.loader import PDFLoader
from app.rag.text_chunker import TextChunker
from app.rag.metadata import MetadataBuilder
from app.rag.embedding import EmbeddingModel
from app.rag.vector_store import VectorStore

import json
from pathlib import Path


def rebuild_vector_database():

    loader = PDFLoader()
    chunker = TextChunker()
    metadata_builder = MetadataBuilder()
    embedding_model = EmbeddingModel()
    vector_store = VectorStore()

    pdfs = loader.get_all_pdfs()

    all_documents = []

    for pdf in pdfs:

        pages = loader.extract_text(pdf)

        for page in pages:

            chunks = chunker.split(page["text"])

            for chunk in chunks:

                all_documents.append(
                    {
                        "text": chunk,
                        "metadata": metadata_builder.create(
                            pdf,
                            page["page"]
                        ),
                    }
                )

    texts = [doc["text"] for doc in all_documents]

    embeddings = embedding_model.embed_documents(texts)

    vector_store.build(all_documents, embeddings)

    vector_store.save()

    # -----------------------------
    # Create cars.json automatically
    # -----------------------------
    cars = []
    seen = set()

    for doc in all_documents:

        brand = doc["metadata"]["brand"]
        model = doc["metadata"]["model"]
        source = doc["metadata"]["source"]

        key = (brand, model)

        if key not in seen:
            seen.add(key)

            cars.append({
                "brand": brand,
                "model": model,
                "source": source
            })

    cars_file = CARS_FILE

    with cars_file.open("w", encoding="utf-8") as f:
        json.dump(cars, f, indent=4)

    print(f"Saved {len(cars)} cars to cars.json")

    return len(pdfs), len(all_documents)