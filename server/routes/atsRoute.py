from fastapi import APIRouter, UploadFile, Form, HTTPException
import pdfplumber
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter()

def extract_text_from_pdf(file: UploadFile) -> str:
    text = ""
    try:
        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
    except Exception as e:
        raise ValueError(f"Error reading PDF: {e}")
    
    return " ".join(text.split()).lower() 

def ats_score(resume_text: str, jd_text: str) -> float:
    if not resume_text or not jd_text:
        return 0.0
    
    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform([jd_text, resume_text])

    score = cosine_similarity(vectors[0], vectors[1])[0][0]
    return round(score * 100, 2)

@router.post("/score")
async def get_ats_score(resume: UploadFile, jd: str = Form(...)):
    try:
        resume_text = extract_text_from_pdf(resume)
        if not resume_text:
            raise ValueError("No text found in the resume PDF.")
        
        score = ats_score(resume_text, jd)
        return {
            "score": score,
            "message": "ATS score calculated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
