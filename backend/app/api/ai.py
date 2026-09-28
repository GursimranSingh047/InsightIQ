from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from app.services.ai.gemini_service import generate_executive_summary, generate_sql_tutor_response

router = APIRouter()

class ProfileDataRequest(BaseModel):
    profile_data: Dict[str, Any]
    
class SqlTutorRequest(BaseModel):
    question: str
    schema_info: Dict[str, Any]

@router.post("/summary")
async def get_ai_summary(request: ProfileDataRequest):
    try:
        summary = generate_executive_summary(request.profile_data)
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/sql-tutor")
async def get_sql_tutor(request: SqlTutorRequest):
    try:
        response = generate_sql_tutor_response(request.question, request.schema_info)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
