async def save_file(file, destination: str):
    with open(destination, 'wb') as f:
        content = await file.read()
        f.write(content)

def load_file(filepath):
    with open(filepath, 'rb') as f:
        return f.read()

def validate_file_type(file, allowed_types):
    file_type = file.content_type
    if file_type not in allowed_types:
        raise ValueError(f"Invalid file type: {file_type}. Allowed types are: {allowed_types}")

def create_directory(directory):
    import os
    if not os.path.exists(directory):
        os.makedirs(directory)