import re
from pdfminer.high_level import extract_text
import io

def parse_resume(file_path):
    """
    Extracts text from PDF and performs basic keyword matching.
    """
    try:
        text = extract_text(file_path)
    except Exception as e:
        return {"error": str(e), "score": 0, "skills": []}

    # Basic Keyword Database (Expand this later)
    COMMON_SKILLS = {
        "python", "django", "react", "javascript", "sql", "postgresql", 
        "docker", "aws", "html", "css", "rest api", "git", "machine learning"
    }

    try:
        # Basic Keyword Database (Expand this later)
        COMMON_SKILLS = {
            "python", "django", "react", "javascript", "sql", "postgresql", 
            "docker", "aws", "html", "css", "rest api", "git", "machine learning"
        }

        # Normalize text
        text_lower = text.lower()
        
        # Detect Skills
        found_skills = [skill for skill in COMMON_SKILLS if skill in text_lower]
        
        # Simple Scoring Logic (10 points per skill, max 100)
        score = min(len(found_skills) * 10, 100)
        
        return {
            "text": text,
            "skills": found_skills,
            "score": score
        }
    except Exception as e:
        print(f"Error parsing resume: {e}")
        return {
            "text": "",
            "skills": [],
            "score": 0,
            "error": str(e)
        }

