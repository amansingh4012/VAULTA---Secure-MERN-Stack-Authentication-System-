#!/bin/bash

# Build script for Render deployment
# This script installs dependencies and builds the frontend

echo "=== Installing Backend Dependencies ==="
cd backend
npm install
cd ..

echo "=== Installing Frontend Dependencies ==="
cd frontend
npm install

echo "=== Building Frontend ==="
npm run build
cd ..

echo "=== Build Complete ==="
