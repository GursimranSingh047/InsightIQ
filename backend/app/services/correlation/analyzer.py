import pandas as pd
import numpy as np

def calculate_correlations(df: pd.DataFrame, numeric_cols: list) -> dict:
    if len(numeric_cols) < 2:
        return {"matrix": [], "top_positive": [], "top_negative": []}
        
    df_numeric = df[numeric_cols].dropna()
    if len(df_numeric) < 2:
        return {"matrix": [], "top_positive": [], "top_negative": []}
        
    corr_matrix = df_numeric.corr(method='pearson')
    
    # Format for frontend visualization
    matrix_data = []
    for col1 in numeric_cols:
        row = {"name": col1}
        for col2 in numeric_cols:
            val = corr_matrix.loc[col1, col2]
            row[col2] = float(val) if pd.notna(val) else 0.0
        matrix_data.append(row)
        
    # Find top correlations
    correlations = []
    for i in range(len(numeric_cols)):
        for j in range(i + 1, len(numeric_cols)):
            col1 = numeric_cols[i]
            col2 = numeric_cols[j]
            val = corr_matrix.loc[col1, col2]
            if pd.notna(val):
                correlations.append({
                    "feature1": col1,
                    "feature2": col2,
                    "score": float(val)
                })
                
    correlations.sort(key=lambda x: x["score"], reverse=True)
    
    top_positive = [c for c in correlations if c["score"] >= 0.5][:5]
    top_negative = [c for c in correlations if c["score"] <= -0.5][::-1][:5]
    
    return {
        "matrix": matrix_data,
        "top_positive": top_positive,
        "top_negative": top_negative
    }
