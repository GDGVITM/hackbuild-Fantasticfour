import requests
import json

class GeminiIntegration:
    def __init__(self, api_key, model_name='gemini-1.5-flash'):
        self.api_key = api_key
        self.model_name = model_name
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"

    def generate_text(self, prompt):
        url = f"{self.base_url}/{self.model_name}:generateContent?key={self.api_key}"
        
        headers = {
            "Content-Type": "application/json"
        }
        
        data = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            return response.json()['candidates'][0]['content']['parts'][0]['text']
        else:
            raise Exception(f"Error generating text: {response.status_code} - {response.text}")

    def get_model_info(self):
        url = f"{self.base_url}/{self.model_name}?key={self.api_key}"
        
        response = requests.get(url)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error fetching model info: {response.status_code} - {response.text}")