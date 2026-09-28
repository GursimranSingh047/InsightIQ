import google.generativeai as genai
from app.config import settings
import json
import logging

# Configure logger
logger = logging.getLogger(__name__)

# Try configuring Gemini if API key is present
if settings.gemini_api_key:
    genai.configure(api_key=settings.gemini_api_key)
else:
    logger.warning("No GEMINI_API_KEY provided. AI services will return mock data.")

def generate_executive_summary(profile_data: dict) -> str:
    """Generates an executive summary based on the dataset profile and statistics."""
    if not settings.gemini_api_key:
        return "InsightIQ detected significant trends in your data. Revenue increased consistently, but some anomalies warrant further investigation. Add your GEMINI_API_KEY to see a real AI-generated summary."

    prompt = f"""
    You are an expert data analyst and business intelligence executive. 
    Analyze the following dataset metadata and statistical profile.
    Write a concise, 3-4 sentence executive summary highlighting key findings, interesting correlations, anomalies, or KPIs.
    Be extremely professional and insightful. Do NOT invent data that is not in the JSON provided.
    
    Data Profile Summary:
    Rows: {profile_data.get('summary', {}).get('rows')}
    Columns: {profile_data.get('summary', {}).get('columns')}
    
    KPIs: {json.dumps(profile_data.get('kpis', []))}
    Anomalies Detected: {len(profile_data.get('anomalies', []))}
    Top Correlations: {json.dumps(profile_data.get('correlations', {}).get('top_positive', []))}
    """
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        logger.error(f"Error generating AI summary: {e}")
        return "An error occurred while generating the AI summary. Please check your API key configuration."

def generate_sql_tutor_response(question: str, schema_info: dict) -> dict:
    """Translates natural language to SQL and provides a tutor explanation."""
    if not settings.gemini_api_key:
        return {
            "sql": "SELECT * FROM dataset LIMIT 10;\n-- Add GEMINI_API_KEY to enable AI SQL generation.",
            "explanation": "This is a basic SELECT query that retrieves all columns for the first 10 rows.",
            "complexity": "Beginner",
            "concepts": ["SELECT", "FROM", "LIMIT"],
            "learning_example": "Try SELECT column_name FROM table_name;"
        }
        
    prompt = f"""
    You are an AI SQL Tutor for a Business Intelligence platform.
    A user asked a natural language question about their dataset.
    
    Dataset Schema:
    {json.dumps(schema_info, indent=2)}
    
    User Question: "{question}"
    
    Generate the SQL query to answer this question (assume table name is 'dataset').
    Then, provide a beginner-friendly explanation.
    
    Return EXACTLY a valid JSON object with the following keys, and nothing else (do not include markdown block formatting):
    {{
      "sql": "The generated SQL query",
      "explanation": "Line-by-line explanation of the query and what each clause does",
      "complexity": "Beginner | Intermediate | Advanced",
      "concepts": ["List", "of", "SQL", "concepts", "used", "like", "GROUP BY", "SUM"],
      "learning_example": "A short, simple example to help them learn one of the concepts"
    }}
    """
    
    try:
        model = genai.GenerativeModel('gemini-1.5-pro')
        response = model.generate_content(prompt)
        text = response.text.strip()
        # Clean up markdown code block if model added it
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text)
    except Exception as e:
        logger.error(f"Error generating SQL tutor response: {e}")
        return {
            "sql": "-- Error generating query",
            "explanation": "Failed to contact AI service.",
            "complexity": "Unknown",
            "concepts": [],
            "learning_example": ""
        }
