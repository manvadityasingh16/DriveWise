from app.rag.loader import PDFLoader
from app.rag.text_chunker import TextChunker

loader = PDFLoader()
chunker = TextChunker()

pdfs = loader.get_all_pdfs()

print(f"\nFound {len(pdfs)} PDF(s)\n")

for pdf in pdfs:

    print("=" * 60)
    print("File :", pdf.name)

    pages = loader.extract_text(pdf)

    print("Pages :", len(pages))

    if pages:

        total_chunks = 0

        for page in pages:

            chunks = chunker.split(page["text"])
            total_chunks += len(chunks)

        print(f"Total Chunks : {total_chunks}")

    print()