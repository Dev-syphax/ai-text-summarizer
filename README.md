# AI Text Summarizer & Keyword Extractor

**A simple AI-powered tool to summarize text and extract important keywords.**  
This project is the starting point for a more advanced application for summarizing documents, meeting notes, and articles.

---

## Features 
- Summarize long text in a concise form
- Extract top keywords automatically
- API-ready for backend integration
- Web interface planned for easy interaction

---

## 🛠 Tech Stack
- Python 3.11+
- FastAPI (backend API)
- React (frontend UI)
- HuggingFace Transformers (summarization)
- scikit-learn (keyword extraction)

---
## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Dev-syphax/ai-text-summarizer.git
cd ai-text-summarizer
```
## Backend Setup
### 2. Install dependencies
```bash 
pip install -r requirements.txt
```
### 3. (Optional) Download model for offline use
``` bash
python model/download_model.py
```
### 4. Start the FastAPI server
```bash
cd scr uvicorn app:app --reload
```
#### Server runs at:
 ```
 http://localhost:8000
 ```
## Interface setup 

### 5. Install dependencies
```bash 
cd interface
npm install
```
### 6. Run  the development server
```bash
npm run dev
```
#### Interface runs at:
```
http://localhost:5173
```

## Model Folder: `model/` 
### `download_model.py`
Script used to pre-download NLP model into local cashe so the application can run **offline** without fetching from HuggingFace.

## Contributions
Pull Requests are welcome! <br>
Feel free toopen Issue fro bug reports or feature suggestions.