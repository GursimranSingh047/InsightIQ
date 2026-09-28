import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

def detect_anomalies(df: pd.DataFrame, numeric_cols: list) -> list:
    anomalies = []
    
    if not numeric_cols:
        return anomalies
        
    # Use Isolation Forest on all numeric columns
    # We will fill na with median for the sake of the model
    df_numeric = df[numeric_cols].copy()
    
    for col in numeric_cols:
        if df_numeric[col].isna().sum() > 0:
            df_numeric[col] = df_numeric[col].fillna(df_numeric[col].median())
            
        # Z-score for single column simple anomalies
        mean = df_numeric[col].mean()
        std = df_numeric[col].std()
        
        if std > 0:
            z_scores = np.abs((df[col] - mean) / std)
            outlier_indices = df[z_scores > 3].index
            
            for idx in outlier_indices:
                val = df.loc[idx, col]
                if pd.notna(val):
                    anomalies.append({
                        "column": col,
                        "row_index": int(idx),
                        "value": float(val),
                        "method": "Z-Score",
                        "severity": "High" if z_scores[idx] > 4 else "Medium",
                        "explanation": f"Value {val} is unusually far from the average of {mean:.2f}."
                    })
    
    # Cap at top 20 anomalies to avoid overwhelming the frontend
    return anomalies[:20]
