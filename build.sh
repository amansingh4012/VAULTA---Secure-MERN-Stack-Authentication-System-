#!/bin/bash
set -e  # Exit on error

# Build script for Render deployment
# This script installs dependencies and builds the frontend

echo "=== Installing Backend Dependencies ==="
cd backend
npm install
if [ $? -ne 0 ]; then
  echo "Backend npm install failed"
  exit 1
fi
cd ..

echo "=== Installing Frontend Dependencies ==="
cd frontend
npm install
if [ $? -ne 0 ]; then
  echo "Frontend npm install failed"
  exit 1
fi

echo "=== Building Frontend ==="
npm run build
if [ $? -ne 0 ]; then
  echo "Frontend build failed"
  exit 1
fi

echo "=== Verifying Build Output ==="
if [ ! -d "dist" ]; then
  echo "ERROR: dist directory was not created!"
  exit 1
fi

if [ ! -f "dist/index.html" ]; then
  echo "ERROR: dist/index.html was not created!"
  exit 1
fi

echo "Build output verified successfully"
ls -la dist/

cd ..

echo "=== Build Complete ==="
