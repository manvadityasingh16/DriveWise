import json
from app.rag.generator import AnswerGenerator


class ComparisonGenerator:

    def __init__(self):
        self.generator = AnswerGenerator()

    def ask(self, car_name, field, chunks):

        prompt = f"""
You are an automotive expert.

Using ONLY the brochure context, answer this question.

Vehicle:
{car_name}

Question:
What is the {field}?

Rules:
- Give ONLY the value.
- Do not explain.
- If the brochure truly does not contain it, return "Not Available".
"""

        answer = self.generator.generate(prompt, chunks)

        return answer.strip()

    def extract_specs(self, car_name, chunks):

        return {
            "car_name": car_name,
            "engine": self.ask(car_name, "engine", chunks),
            "power": self.ask(car_name, "power", chunks),
            "torque": self.ask(car_name, "torque", chunks),
            "fuel": self.ask(car_name, "fuel type", chunks),
            "transmission": self.ask(car_name, "transmission", chunks),
            "mileage": self.ask(car_name, "mileage", chunks),
            "price": self.ask(car_name, "price", chunks),
        }