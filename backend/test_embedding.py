from app.rag.embedding import EmbeddingModel

embedding = EmbeddingModel()

vector = embedding.embed_query(
    "What is the mileage of Hyundai Verna?"
)

print(type(vector))
print(vector.shape)
print(vector[:10])