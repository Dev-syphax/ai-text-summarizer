# app.py
from fastapi import FastAPI
from pydantic import BaseModel

from summarizer import Summarizer
from key_extractor import KeywordExtractor

app = FastAPI(
    title="AI Summarization & Keyword API",
    description="APIs for summarizing text and extracting keywords",
    version="1.0.0"
)

summarizer = Summarizer()
keyword_extractor = KeywordExtractor(top_k=10)

class TextRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "API is running!"}


# -------- Summarization --------
@app.post("/summarize")
def summarize_text(request: TextRequest):
    summary = summarizer.summarize(request.text)
    return {"summary": summary}


# -------- Keyword Extraction --------
@app.post("/keywords")
def extract_keywords(request: TextRequest):
    keywords = keyword_extractor.extract(request.text)
    return {"keywords": keywords}
