from fastapi import APIRouter, UploadFile, Form, HTTPException
import pdfplumber
from sentence_transformers import SentenceTransformer, util

router = APIRouter()

model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(file):
    text = ""
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + " "
    return text.strip()

def ats_score(resume_text, jd_text):
    jd_emb = model.encode(jd_text, convert_to_tensor=True)
    resume_emb = model.encode(resume_text, convert_to_tensor=True)
    score = util.cos_sim(jd_emb, resume_emb).item() * 100
    return round(score, 2)

@router.post("/score")
async def get_ats_score(resume: UploadFile, jd: str = Form(...)):
    try:
        resume_text = extract_text_from_pdf(resume)
        score = ats_score(resume_text, jd)
        return {"score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
