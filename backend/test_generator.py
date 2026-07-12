from app.rag.retriever import Retriever
from app.rag.generator import AnswerGenerator

retriever = Retriever()
generator = AnswerGenerator()

question = "What is the driving range of Hyundai Creta Electric?"

chunks = retriever.search(question)

answer = generator.generate(question, chunks)

print("\nAnswer:\n")
print(answer)