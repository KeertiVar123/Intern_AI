import os
import json
import shutil
import requests
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Azure Library (Optional)
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CLIENT SETUP ---
GROQ_KEY = os.getenv("GROQ_API_KEY") 
DOC_ENDPOINT = os.getenv("DOC_INTEL_ENDPOINT")
DOC_KEY = os.getenv("DOC_INTEL_KEY")

doc_client = None
try:
    if DOC_ENDPOINT and DOC_KEY and "YOUR-KEY" not in DOC_KEY:
        doc_client = DocumentIntelligenceClient(endpoint=DOC_ENDPOINT, credential=AzureKeyCredential(DOC_KEY))
except:
    pass

# --- HELPER: Call Groq API (Updated Model) ---
def call_groq_ai(api_key, text_prompt):
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        # UPDATED MODEL NAME HERE:
        "model": "llama-3.3-70b-versatile", 
        "messages": [
            {"role": "system", "content": "You are a JSON-only API. You output strictly valid JSON."},
            {"role": "user", "content": text_prompt}
        ],
        "response_format": {"type": "json_object"}
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"⚠️ Groq API Error: {response.status_code} - {response.text}")
        return None

@app.post("/signup-student")
async def signup_student(
    full_name: str = Form(default="Student"),
    email: str = Form(default="test@test.com"),
    selected_domains: str = Form(default="[]"),
    degree: str = Form(default=""),
    resume: UploadFile = File(...)
):
    print(f"✅ Processing Signup for: {full_name}")
    
    # 1. Save Resume
    temp_filename = f"temp_{resume.filename}"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    resume_text = "Resume text missing (Azure skipped)."
    
    # FALLBACK DATA
    ai_analysis = {
        "match_score": 85,
        "skills_to_learn": ["Python", "React", "Cloud Basics"],
        "learning_path": [
            {"phase": "Week 1", "title": "Foundation", "tasks": ["Learn Syntax", "Build Calculator"]},
            {"phase": "Week 2", "title": "Advanced", "tasks": ["API Integration", "DB Design"]}
        ],
        "suggested_projects": [
            {"title": "Portfolio Site", "desc": "Build a personal site", "difficulty": "Beginner"}
        ],
        "advice": "Focus on building practical projects."
    }

    try:
        # 2. Read Resume (Azure)
        if doc_client:
            print("   -> Reading PDF with Azure...")
            with open(temp_filename, "rb") as f:
                poller = doc_client.begin_analyze_document("prebuilt-read", analyze_request=f, content_type="application/octet-stream")
                resume_text = poller.result().content
        
        # 3. AI Analysis (Groq Llama 3.3)
        if GROQ_KEY:
            print("   -> Asking Groq (Llama 3.3)...")
            prompt = f"""
            Act as a Career Coach for {full_name}.
            Interests: {selected_domains}
            Resume: {resume_text[:2000]}
            
            OUTPUT JSON ONLY with this structure:
            {{
                "match_score": 85,
                "skills_to_learn": ["Skill1", "Skill2", "Skill3"],
                "learning_path": [
                    {{"phase": "Week 1-4", "title": "Foundation", "tasks": ["Task 1", "Task 2"]}},
                    {{"phase": "Week 5-8", "title": "Building", "tasks": ["Task 1", "Task 2"]}}
                ],
                "suggested_projects": [
                    {{"title": "Project A", "desc": "Description", "difficulty": "Beginner"}}
                ],
                "advice": "One sentence advice."
            }}
            """
            
            # Call Groq
            api_result = call_groq_ai(GROQ_KEY, prompt)
            
            if api_result:
                raw_text = api_result["choices"][0]["message"]["content"]
                ai_analysis = json.loads(raw_text)
                print("   -> ✅ Groq Success!")

    except Exception as e:
        print(f"⚠️ AI Error (Using Fallback): {e}")

    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

    return {
        "status": "success",
        "message": "Signup Successful",
        "ai_analysis": ai_analysis
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)