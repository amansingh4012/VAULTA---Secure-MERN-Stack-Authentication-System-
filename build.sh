#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Build script for Render deployment
# This script installs dependencies and builds the frontend

echo "=== Current Directory ==="
pwd
ls -la

echo ""
echo "=== Installing Backend Dependencies ==="
cd backend
pwd
# Clean install to avoid cache issues
rm -rf node_modules package-lock.json 2>/dev/null || true
# Force install all dependencies (production mode skips devDeps by default)
NODE_ENV=development npm install
cd ..

echo ""
echo "=== Installing Frontend Dependencies ==="
cd frontend
pwd
# Clean install to avoid cache issues
rm -rf node_modules package-lock.json 2>/dev/null || true
# Force install all dependencies including devDependencies (needed for Vite build)
NODE_ENV=development npm install

echo ""
echo "=== Verifying Vite Plugin Installation ==="
if [ ! -d "node_modules/@vitejs/plugin-react" ]; then
  echo "ERROR: @vitejs/plugin-react not installed!"
  echo "Attempting to install it directly..."
  npm install @vitejs/plugin-react --save-dev
fi

echo ""
echo "=== Building Frontend ==="
npm run build

echo ""
echo "=== Verifying Build Output ==="
if [ ! -d "dist" ]; then
  echo "ERROR: dist directory was not created!"
  ls -la
  exit 1
fi

if [ ! -f "dist/index.html" ]; then
  echo "ERROR: dist/index.html was not created!"
  ls -la dist/
  exit 1
fi

echo "✅ Build output verified successfully"
echo "Contents of dist directory:"
ls -la dist/

cd ..

echo ""
echo "=== Build Complete Successfully ==="
