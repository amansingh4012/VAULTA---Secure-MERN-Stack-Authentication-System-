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
echo "=== Verifying Environment Configuration ==="
echo "Checking if .env.production exists..."
if [ -f ".env.production" ]; then
  echo "✅ .env.production found"
  echo "Contents:"
  cat .env.production
else
  echo "⚠️  .env.production not found, creating it..."
  echo "VITE_API_URL=" > .env.production
  echo "✅ Created .env.production"
fi

echo ""
echo "=== Building Frontend ==="
# Build in production mode to use .env.production
NODE_ENV=production npm run build

echo ""
echo "=== Checking Built Files for API URL ==="
# Check if the built JS contains localhost (it shouldn't)
if grep -r "localhost:5000" dist/ 2>/dev/null; then
  echo "⚠️  WARNING: Found localhost:5000 in built files!"
  echo "This indicates the build didn't use .env.production correctly"
else
  echo "✅ No localhost:5000 found in built files (good!)"
fi

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
