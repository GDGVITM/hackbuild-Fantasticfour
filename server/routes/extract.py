from fastapi import APIRouter, UploadFile, HTTPException
import pdfplumber

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

@router.post("/extract-pdf")
async def extract_pdf_text(pdf_file: UploadFile):
    try:
        # Validate file type
        if not pdf_file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="File must be a PDF")
        
        extracted_text = extract_text_from_pdf(pdf_file)
        
        if not extracted_text:
            raise ValueError("No text found in the PDF file.")
        
        return {
            "extracted_text": extracted_text,
            "filename": pdf_file.filename,
            "message": "PDF text extracted successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
