# Multi-stage build for both backend and frontend
FROM node:18-alpine AS frontend-builder

# Build frontend
WORKDIR /app/frontend
COPY interactive-portfolio/package*.json ./
RUN npm install
COPY interactive-portfolio/ ./
RUN npm run build

# Python backend stage
FROM python:3.11-slim AS backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend
COPY --from=frontend-builder /app/frontend/out ./static/

# Expose port
EXPOSE 8000

# Set environment variables
ENV PYTHONPATH=/app

# Start command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]