from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
import json
import numpy as np

from app.services.anomaly.detector import detect_anomalies
from app.services.correlation.analyzer import calculate_correlations
from app.services.forecasting.forecaster import generate_forecast

router = APIRouter()

def process_file(file_content: bytes, filename: str) -> pd.DataFrame:
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(file_content))
        elif filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(io.BytesIO(file_content))
        else:
            raise ValueError("Unsupported file format. Please upload CSV or Excel.")
        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")

def replace_nan(obj):
    if isinstance(obj, float) and np.isnan(obj):
        return None
    elif isinstance(obj, dict):
        return {k: replace_nan(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [replace_nan(v) for v in obj]
    return obj

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    content = await file.read()
    df = process_file(content, file.filename)
    
    # 1. Basic Profiling
    num_rows, num_cols = df.shape
    columns_info = []
    numeric_cols = []
    datetime_cols = []
    
    for col in df.columns:
        dtype = str(df[col].dtype)
        col_type = "categorical"
        if pd.api.types.is_numeric_dtype(df[col]):
            col_type = "numeric"
            numeric_cols.append(col)
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            col_type = "datetime"
            datetime_cols.append(col)
        elif pd.api.types.is_bool_dtype(df[col]):
            col_type = "boolean"
            
        stats = {
            "name": col,
            "type": col_type,
            "dtype": dtype,
            "missing": int(df[col].isna().sum()),
            "unique": int(df[col].nunique())
        }
        
        if col_type == "numeric":
            stats.update({
                "mean": float(df[col].mean()) if not pd.isna(df[col].mean()) else None,
                "min": float(df[col].min()) if not pd.isna(df[col].min()) else None,
                "max": float(df[col].max()) if not pd.isna(df[col].max()) else None,
            })
            
        columns_info.append(stats)
        
    # Generate simple KPIs
    kpis = []
    for col in columns_info:
        if col["type"] == "numeric" and col["name"].lower() in ["revenue", "sales", "profit", "amount", "total"]:
            total_val = float(df[col["name"]].sum())
            kpis.append({
                "name": f"Total {col['name'].title()}",
                "value": total_val,
                "format": "currency"
            })
            
    # Phase 2: Advanced Analytics
    anomalies = detect_anomalies(df, numeric_cols)
    correlations = calculate_correlations(df, numeric_cols)
    
    forecast_data = None
    if datetime_cols and numeric_cols:
        # Just pick the first datetime and first KPI-like numeric col
        target_metric = None
        for col in numeric_cols:
            if col.lower() in ["revenue", "sales", "profit", "amount"]:
                target_metric = col
                break
        if not target_metric:
            target_metric = numeric_cols[0]
            
        forecast_data = generate_forecast(df, datetime_cols[0], target_metric)
            
    # Return preview data (first 10 rows)
    preview_df = df.head(10).replace({np.nan: None})
    preview_data = replace_nan(preview_df.to_dict(orient='records'))

    profile_data = replace_nan({
        "filename": file.filename,
        "summary": {
            "rows": num_rows,
            "columns": num_cols,
            "duplicate_rows": int(df.duplicated().sum()),
        },
        "columns": columns_info,
        "kpis": kpis,
        "anomalies": anomalies,
        "correlations": correlations,
        "forecast": forecast_data,
        "preview": preview_data
    })
    
    return profile_data
