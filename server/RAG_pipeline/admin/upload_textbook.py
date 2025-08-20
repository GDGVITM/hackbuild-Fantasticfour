import os
from fastapi import UploadFile
from ..utils.file_utils import create_directory, save_file

UPLOAD_DIR = "uploaded_textbooks"

class AdminUpload:
    def __init__(self):
        self.upload_directory = UPLOAD_DIR
        create_directory(self.upload_directory)

    async def upload_textbook(self, file: UploadFile):
        allowed_extensions = ['pdf', 'txt']
        file_extension = file.filename.split('.')[-1].lower()
        if file_extension not in allowed_extensions:
            raise ValueError("Invalid file type. Please upload a PDF or TXT file.")

        file_path = os.path.join(self.upload_directory, file.filename)
        await save_file(file, file_path)
        return file_path