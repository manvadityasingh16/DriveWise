import faiss
import pickle
import numpy as np
from pathlib import Path
from app.paths import VECTORSTORE_DIR


class VectorStore:

    def __init__(self):

        self.index = None
        self.documents = []

    def build(self, chunks, embeddings):

        embeddings = np.array(embeddings).astype("float32")

        dimension = embeddings.shape[1]

        self.index = faiss.IndexFlatL2(dimension)

        self.index.add(embeddings)

        self.documents = chunks

    def save(self, folder=VECTORSTORE_DIR):

        Path(folder).mkdir(parents=True, exist_ok=True)

        faiss.write_index(
            self.index,
            f"{folder}/index.faiss"
        )

        with open(f"{folder}/documents.pkl", "wb") as f:
            pickle.dump(self.documents, f)

    def load(self, folder=VECTORSTORE_DIR):

        self.index = faiss.read_index(
            f"{folder}/index.faiss"
        )

        with open(f"{folder}/documents.pkl", "rb") as f:
            self.documents = pickle.load(f)