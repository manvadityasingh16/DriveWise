# 🚗 DriveWise – Metadata-Aware Automotive RAG Assistant

DriveWise is an AI-powered automotive assistant that helps users compare cars and answer vehicle-related questions by retrieving information directly from official car brochures instead of relying on general internet knowledge.

It uses a Retrieval-Augmented Generation (RAG) pipeline with FAISS vector search and Google Gemini AI to provide brochure-grounded responses.

---

## 📸 Project Preview

> Add screenshots of your application here after deployment.

- Dashboard
- AI Assistant
- Compare Cars
- Analytics
- Brochure Upload
- Settings

---

## ✨ Features

- 🤖 AI-powered automotive assistant
- 📄 Upload official car brochures (PDF)
- 🧠 Metadata-aware Retrieval-Augmented Generation (RAG)
- 🔍 Semantic search using FAISS vector database
- 🚗 Compare two cars side-by-side
- 📊 Analytics dashboard
- 📂 Automatic brochure detection by brand and model
- 📈 Dynamic brochure statistics
- 🎨 Modern responsive React UI
- ⚡ FastAPI backend
- 🔐 Settings page
- 🔔 Notification system

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

### Backend
- FastAPI
- Python

### AI & RAG
- Google Gemini API
- Sentence Transformers
- FAISS
- PyMuPDF
- LangChain

---

## 📂 Project Structure

```
DriveWise/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── rag/
│   │   └── main.py
│   │
│   ├── data/
│   │   ├── brochures/
│   │   ├── vectorstore/
│   │   └── chunks/
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/manvadityasingh16/DriveWise.git
cd DriveWise
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📄 How It Works

1. Upload official vehicle brochures.
2. PDFs are processed and converted into text.
3. Text is split into chunks.
4. Metadata is generated for each chunk.
5. Embeddings are created using Sentence Transformers.
6. Embeddings are stored in a FAISS vector database.
7. User queries retrieve the most relevant brochure content.
8. Google Gemini generates brochure-grounded answers.

---

## 🚘 Compare Cars

DriveWise compares vehicles by extracting information from official brochures, including:

- Engine
- Power
- Torque
- Fuel Type
- Transmission
- Mileage
- Price

The comparison is generated using the RAG pipeline instead of relying on generic web data.

---

## 📊 Analytics Dashboard

The dashboard provides:

- Total brochures
- Storage usage
- Brochure distribution by brand
- Vector database status
- Chunk statistics

---

## 📦 AI Pipeline

```
PDF Brochure
      │
      ▼
Text Extraction
      │
      ▼
Chunking
      │
      ▼
Metadata Generation
      │
      ▼
Embeddings
      │
      ▼
FAISS Vector Database
      │
      ▼
Retriever
      │
      ▼
Google Gemini
      │
      ▼
AI Answer
```

---

## 🌟 Future Improvements

- Voice-enabled assistant
- Image-based brochure search
- Multi-language support
- Vehicle recommendation system
- OCR support for scanned brochures
- Cloud brochure storage
- User authentication
- Favorite comparisons

---

## 👨‍💻 Author

**Manvaditya Singh**

GitHub:
https://github.com/manvadityasingh16

---

## 📜 License

This project is developed for educational and research purposes.
