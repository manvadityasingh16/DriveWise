import fitz
from pathlib import Path
from app.paths import BROCHURE_DIR


class PDFLoader:

    def __init__(self, brochure_folder=BROCHURE_DIR):
        self.brochure_folder = Path(brochure_folder)

    def get_all_pdfs(self):
        return list(self.brochure_folder.rglob("*.pdf"))

    def extract_text(self, pdf_path):

        document = fitz.open(pdf_path)

        pages = []

        for page_number, page in enumerate(document):

            pages.append(
                {
                    "page": page_number + 1,
                    "text": page.get_text("text"),
                }
            )

        document.close()

        return pages