from functools import lru_cache

import numpy as np

from app.rag.embedding import EmbeddingModel
from app.rag.vector_store import VectorStore


@lru_cache(maxsize=1)
def get_retriever():
    """Return a shared Retriever so the FAISS index and documents are
    loaded into memory only once across all API routes."""
    return Retriever()


class Retriever:

    def __init__(self):
        self.embedding_model = EmbeddingModel()
        self.vector_store = VectorStore()
        self.vector_store.load()

    def search(self, question, source=None, k=15):
        """
        Semantic search using FAISS.

        Parameters:
            question (str): User query
            source (str): Optional brochure filename
            k (int): Number of chunks to retrieve
        """

        query_embedding = self.embedding_model.embed_query(question)
        query_embedding = np.array([query_embedding]).astype("float32")

        distances, indices = self.vector_store.index.search(
            query_embedding,
            k
        )

        results = []

        for index in indices[0]:

            if index == -1:
                continue

            document = self.vector_store.documents[index]

            # Filter by brochure source if provided
            if source:

                doc_source = document["metadata"].get("source", "")

                if doc_source.lower() != source.lower():
                    continue

            results.append(document)

        return results

    def get_all_chunks_from_source(self, source):
        """
        Return every chunk belonging to a brochure.
        Useful for brochure comparison.
        """

        results = []

        for document in self.vector_store.documents:

            doc_source = document["metadata"].get("source", "")

            if doc_source.lower() == source.lower():
                results.append(document)

        print(
            f"Retrieved {len(results)} chunks from {source}"
        )

        return results