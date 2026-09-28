import pandas as pd
import numpy as np

def generate_forecast(df: pd.DataFrame, date_col: str, metric_col: str, periods: int = 7) -> dict:
    try:
        from statsmodels.tsa.holtwinters import ExponentialSmoothing
        
        # Prepare data
        ts_data = df[[date_col, metric_col]].copy()
        ts_data[date_col] = pd.to_datetime(ts_data[date_col])
        ts_data = ts_data.sort_values(by=date_col)
        ts_data = ts_data.groupby(date_col)[metric_col].sum().reset_index()
        ts_data.set_index(date_col, inplace=True)
        
        # Ensure sufficient data
        if len(ts_data) < 14:
            return {"status": "error", "message": "Not enough data points for forecasting. Minimum 14 required."}
            
        # Fit model (Simple Exponential Smoothing as fallback, try Holt for trend)
        try:
            model = ExponentialSmoothing(ts_data[metric_col], trend='add', seasonal=None, initialization_method="estimated")
            fit_model = model.fit()
        except:
            model = ExponentialSmoothing(ts_data[metric_col], initialization_method="estimated")
            fit_model = model.fit()
            
        forecast = fit_model.forecast(periods)
        
        # Format for Recharts
        historical = []
        for idx, val in ts_data[metric_col].items():
            historical.append({
                "date": idx.strftime('%Y-%m-%d'),
                "actual": float(val),
                "forecast": None
            })
            
        # Add a connecting point for the chart
        last_date = ts_data.index[-1]
        last_val = float(ts_data[metric_col].iloc[-1])
        
        forecast_data = []
        # forecast_data.append({
        #     "date": last_date.strftime('%Y-%m-%d'),
        #     "actual": None,
        #     "forecast": last_val
        # })
        
        freq = pd.infer_freq(ts_data.index) or 'D'
        future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=periods, freq=freq)
        
        for date, val in zip(future_dates, forecast):
            forecast_data.append({
                "date": date.strftime('%Y-%m-%d'),
                "actual": None,
                "forecast": float(val)
            })
            
        return {
            "status": "success",
            "historical": historical[-30:], # Return last 30 points of history
            "forecast": forecast_data,
            "metric": metric_col
        }
        
    except Exception as e:
        return {"status": "error", "message": str(e)}
