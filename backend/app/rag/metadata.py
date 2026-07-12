from pathlib import Path


class MetadataBuilder:

    def create(self, pdf_path, page):

        pdf = Path(pdf_path)

        filename = pdf.stem.lower()

        if any(x in filename for x in [
            "hyundai", "creta", "verna", "venue", "exter",
            "alcazar", "aura", "i20", "ioniq", "grand"
        ]):
            brand = "Hyundai"

        elif any(x in filename for x in [
            "mahindra", "xuv", "thar", "bolero",
            "be", "scorpio", "alturas"
        ]):
            brand = "Mahindra"

        elif any(x in filename for x in [
            "tata", "harrier", "nexon",
            "safari", "punch", "curvv",
            "tiago", "tigor"
        ]):
            brand = "Tata"

        elif any(x in filename for x in [
            "toyota", "fortuner",
            "innova", "glanza", "hyryder"
        ]):
            brand = "Toyota"

        elif any(x in filename for x in [
            "honda", "city", "amaze", "elevate"
        ]):
            brand = "Honda"

        elif any(x in filename for x in [
            "kia", "seltos", "sonet", "carens"
        ]):
            brand = "Kia"

        elif any(x in filename for x in [
            "maruti", "baleno", "swift",
            "brezza", "fronx", "dzire"
        ]):
            brand = "Maruti Suzuki"

        else:
            brand = "Unknown"

        return {
            "brand": brand,
            "model": pdf.stem.replace("-", " ").title(),
            "page": page,
            "source": pdf.name,
        }