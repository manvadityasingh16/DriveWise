from app.rag.loader import PDFLoader
from app.rag.text_chunker import TextChunker
from app.rag.metadata import MetadataBuilder
from app.rag.embedding import EmbeddingModel
from app.rag.vector_store import VectorStore

print("=" * 60)
print("Building DriveWise Vector Database")
print("=" * 60)

loader = PDFLoader()
chunker = TextChunker()
metadata_builder = MetadataBuilder()
embedding_model = EmbeddingModel()
vector_store = VectorStore()

pdfs = loader.get_all_pdfs()

all_documents = []

for pdf in pdfs:

    print(f"\nProcessing: {pdf.name}")

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
                    )
                }
            )

print(f"\nTotal Chunks: {len(all_documents)}")

texts = [doc["text"] for doc in all_documents]

print("\nGenerating embeddings...")
embeddings = embedding_model.embed_documents(texts)

print("\nBuilding FAISS index...")
vector_store.build(all_documents, embeddings)

print("\nSaving vector database...")
vector_store.save()

print("\n✅ DriveWise Vector Database Created Successfully!")