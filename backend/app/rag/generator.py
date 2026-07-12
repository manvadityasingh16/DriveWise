import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


class AnswerGenerator:

    def generate(self, question, retrieved_chunks):

        # Build a larger context from the retrieved chunks
        context_parts = []
        total_chars = 0
        max_chars = 25000  # Keep comfortably within model limits

        for chunk in retrieved_chunks:
            text = chunk["text"]

            if total_chars + len(text) > max_chars:
                break

            context_parts.append(text)
            total_chars += len(text)

        context = "\n\n".join(context_parts)

        prompt = f"""
You are an automotive expert.

Use ONLY the brochure context below.

Search ALL of the provided context carefully before answering.

Never guess specifications.

If a specification exists anywhere in the context,
return the exact value.

Only answer "Not Available"
if it truly does not exist in the provided brochure.

Brochure Context:
{context}

Question:
{question}

Return only the answer.
"""

        models = [
            "gemini-2.0-flash-lite",
            "gemini-2.0-flash",
            "gemini-3.1-flash-lite",
        ]

        for model_name in models:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                )

                return response.text.strip()

            except Exception as e:
                print(f"{model_name} failed: {e}")

        raise Exception("All Gemini models failed.")