from functools import lru_cache

import numpy as np
from fastembed import TextEmbedding

# Same model as before, but run via ONNX (fastembed) instead of PyTorch /
# sentence-transformers. This produces 384-dim embeddings with a fraction of
# the memory, so the backend fits on small free-tier instances.
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


@lru_cache(maxsize=1)
def _load_model():
    """Load the ONNX embedding model once and share it process-wide."""
    print("Loading embedding model (fastembed / ONNX)...")
    model = TextEmbedding(model_name=MODEL_NAME)
    print("Embedding model loaded.")
    return model


class EmbeddingModel:

    def __init__(self):
        self.model = _load_model()

    def embed_documents(self, texts):
        """Generate embeddings for multiple chunks -> (n, 384) float array."""
        return np.array(list(self.model.embed(list(texts))))

    def embed_query(self, query):
        """Generate an embedding for a single query -> (384,) float array."""
        return list(self.model.embed([query]))[0]
