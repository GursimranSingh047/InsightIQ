from fastapi import FastAPI, Query
import sqlite3
import os
import subprocess

app = FastAPI()

# Load secret from environment variable; fail fast if missing
API_SECRET = os.environ.get("API_SECRET")
if not API_SECRET:
    raise RuntimeError("API_SECRET environment variable not set")

DB_PATH = "users.db"


def get_db():
    return sqlite3.connect(DB_PATH)


@app.get("/")
def home():
    return {"message": "Insight IQ security test application"}


# VULNERABILITY 1: SQL Injection
@app.get("/user")
def get_user(user_id: str = Query(...)):
    conn = get_db()

    # INTENTIONALLY VULNERABLE:
    # User input is directly inserted into SQL.
    query = f"SELECT * FROM users WHERE id = '{user_id}'"

    cursor = conn.cursor()
    cursor.execute(query)

    result = cursor.fetchall()
    conn.close()

    return {"users": result}


# VULNERABILITY 2: Command Injection
@app.get("/ping")
def ping(host: str = Query(...)):
    # INTENTIONALLY VULNERABLE:
    # User input is passed directly to a shell command.
    result = subprocess.check_output(
        f"ping -c 1 {host}",
        shell=True
    )

    return {"result": result.decode()}


# VULNERABILITY 3: Arbitrary Code Execution
@app.get("/calculate")
def calculate(expression: str = Query(...)):
    # INTENTIONALLY VULNERABLE
    result = eval(expression)

    return {"result": result}


# VULNERABILITY 4: Debug Mode
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )
