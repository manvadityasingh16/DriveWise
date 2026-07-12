import fitz
from pathlib import Path
from app.paths import BROCHURE_DIR


class PDFLoader:

    def extract_text(self, pdf_path):
        doc = fitz.open(pdf_path)

        text = ""

        for page in doc:
            text += page.get_text()

        doc.close()

        return text


if __name__ == "__main__":

    brochure_folder = BROCHURE_DIR

    loader = PDFLoader()

    for pdf in brochure_folder.rglob("*.pdf"):

        print("=" * 60)
        print(pdf.name)

        text = loader.extract_text(pdf)

        print(text[:500])
        print()