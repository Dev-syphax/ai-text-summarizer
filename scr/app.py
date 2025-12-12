# app.py
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pdfplumber
import tempfile
import os
from PIL import Image
import pytesseract

from summarizer import Summarizer
from key_extractor import KeywordExtractor


app = FastAPI(
    title="AI Summarization & Keyword API",
    description="Summarize text, extract keywords, and extract text from PDFs",
    version="2.0.0"
)

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Models ------------------
summarizer = Summarizer()
keyword_extractor = KeywordExtractor(top_k=10)

class TextRequest(BaseModel):
    text: str


# ------------------ Helper: PDF Extraction ------------------
def extract_pdf_text(file: UploadFile):
    """Reads PDF using pdfplumber, falls back to OCR if needed."""

    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF.")

    # Save to temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(file.file.read())
        tmp_path = tmp.name

    extracted_text = ""

    try:
        # First: try pdfplumber (fast, accurate)
        with pdfplumber.open(tmp_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"

        # If no text found → fallback to OCR
        if not extracted_text.strip():
            with pdfplumber.open(tmp_path) as pdf:
                for page in pdf.pages:
                    img = page.to_image(resolution=300).original
                    img = Image.fromarray(img)
                    extracted_text += pytesseract.image_to_string(img) + "\n"

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    if not extracted_text.strip():
        raise HTTPException(400, "Unable to extract text from PDF.")

    return extracted_text.strip()


# ------------------ HOME ------------------
@app.get("/")
def home():
    return {"message": "API is running!"}


# ------------------ SUMMARIZE ------------------
@app.post("/summarize")
async def summarize(text: str = Form(None), file: UploadFile = File(None)):
    if not text and not file:
        raise HTTPException(400, "You must provide text or a PDF file.")

    content = extract_pdf_text(file) if file else text

    result = summarizer.summarize(content)
    return {"summary": result}


# ------------------ KEYWORDS ------------------
@app.post("/keywords")
async def keywords(text: str = Form(None), file: UploadFile = File(None)):
    if not text and not file:
        raise HTTPException(400, "You must provide text or a PDF file.")

    content = extract_pdf_text(file) if file else text

    result = keyword_extractor.extract(content)
    return {"keywords": result}


# ------------------ PDF Upload Only ------------------
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    """Extract text from PDF and return raw text (for Option B behavior)."""
    extracted_text = extract_pdf_text(file)
    return {"text": extracted_text}
