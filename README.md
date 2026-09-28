# InsightIQ

**AI Business Intelligence Platform**

InsightIQ is a production-quality AI, Data, and Backend analytics platform. It allows users to upload datasets (CSV, Excel) or connect to SQL databases and automatically receive data cleaning, analytics, visualizations, forecasting, and natural-language data analysis.

## Problem

Traditional business intelligence tools require significant technical expertise, complex SQL knowledge, or dedicated data teams to extract meaningful insights. Business users often struggle to quickly analyze data, detect anomalies, or generate forecasts without specialized help.

## Solution

InsightIQ bridges this gap by combining automated data profiling with an AI-driven analytics engine. It automatically cleans data, generates KPIs, visualizes trends, and most importantly, allows users to ask questions in plain English. 

## Features

- **Automated Data Profiling**: Instantly detect data types, missing values, duplicates, and statistical summaries.
- **Data Cleaning**: Smart suggestions for handling missing data, invalid types, and outliers.
- **Interactive Dashboard**: Automatically generated KPIs and charts based on dataset semantics.
- **Advanced Analytics**: Anomaly detection, correlation matrices, and time-series forecasting.
- **AI Executive Summary**: Natural-language summaries of key dataset insights.
- **Natural Language Querying**: Ask "What were my sales last month?" and get instant answers and visualizations.
- **AI SQL Tutor**: A standout feature that not only generates SQL from plain English but explains it line-by-line to help users learn.

## Standout Feature: AI SQL Tutor Mode

The AI SQL Tutor is designed to demystify data analysis. When a user asks a question, the system generates the required SQL/Pandas query and provides a beginner-friendly explanation of the concepts used, query complexity, and potential alternatives.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed system design.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Recharts
- **Backend**: Python, FastAPI, Pandas, Scikit-learn, SQLAlchemy, Pydantic
- **Database**: PostgreSQL (Production) / SQLite (Local MVP)
- **AI Integration**: Modular LLM abstraction layer

## Project Structure

```text
insightiq/
├── backend/          # FastAPI backend, data processing, AI layer
├── frontend/         # React, Vite, Tailwind UI
├── ARCHITECTURE.md   # System design document
└── docker-compose.yml# Container orchestration
```

## Running Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### Setup

1. **Clone the repository** (if applicable) and navigate to the root directory.
2. **Environment Variables**: Copy `.env.example` to `.env` and fill in required API keys.

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend runs on `http://localhost:8000`.

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.

## Future Roadmap

- [ ] Support for multiple SQL dialects in Tutor Mode.
- [ ] Direct database connections (PostgreSQL, MySQL, Snowflake).
- [ ] User authentication and role-based access control.
- [ ] Export to PDF/PowerPoint reports.
- [ ] Real-time data streaming support.

## License

MIT License
