from fastapi import FastAPI, Query
import sqlite3
import subprocess

app = FastAPI()

# INTENTIONALLY HARDCODED SECRET
API_SECRET = "demo-secret-12345"

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
import ast
import operator
from fastapi import HTTPException, Query

@app.get("/calculate")
def calculate(expression: str = Query(...)):
    # Safe evaluation of mathematical expressions only
    allowed_operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.Pow: operator.pow,
        ast.USub: operator.neg,
        ast.UAdd: operator.pos,
    }
    
    def eval_expr(node):
        if isinstance(node, ast.Constant):
            if isinstance(node.value, (int, float)):
                return node.value
            raise ValueError("Only numeric literals are allowed")
        elif isinstance(node, ast.BinOp):
            left = eval_expr(node.left)
            right = eval_expr(node.right)
            op_type = type(node.op)
            if op_type in allowed_operators:
                return allowed_operators[op_type](left, right)
            raise ValueError(f"Unsupported operator: {op_type}")
        elif isinstance(node, ast.UnaryOp):
            operand = eval_expr(node.operand)
            op_type = type(node.op)
            if op_type in allowed_operators:
                return allowed_operators[op_type](operand)
            raise ValueError(f"Unsupported unary operator: {op_type}")
        else:
            raise ValueError(f"Unsupported expression type: {type(node)}")
    
    try:
        parsed = ast.parse(expression, mode='eval')
        result = eval_expr(parsed.body)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid expression: {e}")
    
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
