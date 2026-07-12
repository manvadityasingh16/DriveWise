from fastapi import APIRouter
import json
from pathlib import Path
from app.paths import CARS_FILE

from app.rag.retriever import get_retriever
from app.rag.comparison_generator import ComparisonGenerator

router = APIRouter()

DATA_FILE = CARS_FILE

retriever = get_retriever()
comparison_generator = ComparisonGenerator()


def load_cars():
    with DATA_FILE.open("r", encoding="utf-8") as f:
        return json.load(f)


@router.get("/cars")
def get_cars():
    return load_cars()


@router.get("/compare")
def compare(car1: str, car2: str):

    cars = load_cars()

    # Find first car
    first = next(
        (
            car
            for car in cars
            if f"{car['brand']} {car['model']}".lower() == car1.lower()
        ),
        None,
    )

    # Find second car
    second = next(
        (
            car
            for car in cars
            if f"{car['brand']} {car['model']}".lower() == car2.lower()
        ),
        None,
    )

    if first is None or second is None:
        return {
            "success": False,
            "message": "One or both cars were not found."
        }

    print(f"\nComparing: {first['source']}  VS  {second['source']}")

    # Get ALL chunks from each brochure
    chunks1 = retriever.get_all_chunks_from_source(
        first["source"]
    )

    chunks2 = retriever.get_all_chunks_from_source(
        second["source"]
    )

    # Extract specifications
    specs1 = comparison_generator.extract_specs(
        car1,
        chunks1,
    )

    specs2 = comparison_generator.extract_specs(
        car2,
        chunks2,
    )

    return {
        "success": True,
        "car1": specs1,
        "car2": specs2,
    }