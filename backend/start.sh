#!/bin/bash
# Startup script for Legal Document Summarizer backend

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Activate virtual environment
source "$PROJECT_ROOT/.venv/bin/activate"

# Navigate to backend directory
cd "$SCRIPT_DIR"

# Start uvicorn
echo "Starting Legal Document Summarizer backend..."
echo "API will be available at http://127.0.0.1:8000"
echo "API docs at http://127.0.0.1:8000/docs"
echo ""
uvicorn app.main:app --reload --port 8000
