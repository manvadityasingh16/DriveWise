from app.rag.retriever import Retriever

retriever = Retriever()

results = retriever.search(
    "What is the mileage of Hyundai Creta?"
)

print("\nTop Results\n")

for i, result in enumerate(results, start=1):
    print("=" * 60)
    print(f"Result {i}")
    print("Metadata:", result["metadata"])
    print("Text:")
    print(result["text"][:300])
    print()