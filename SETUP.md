# Vaulta — Quick Setup (Windows PowerShell)

This file contains minimal, copy/paste-ready steps to run the project locally on Windows (PowerShell). It assumes you have Git and Docker (optional) installed.

## 1 — Prerequisites

- Node.js 16+ and npm
- Git
- (Optional) Docker (for MongoDB and Redis)

## 2 — Start MongoDB and Redis (choose one)

Option A — Run locally (if you already have services installed)
- Ensure MongoDB and Redis are running on their default ports.

Option B — Quick Docker startup (recommended for a clean local dev environment)

```powershell
# Pull and run MongoDB
docker run -d --name vaulta-mongo -p 27017:27017 mongo:6.0

# Pull and run Redis
docker run -d --name vaulta-redis -p 6379:6379 redis:7
```

## 3 — Backend setup

```powershell
# Move to backend folder
Set-Location 'c:\Users\AMAN KUMAR SINGH\OneDrive\Desktop\PROJECTS\Vaulta\backend'

# Install dependencies
npm install

# Create .env from example and edit it
copy .env.example .env
# Open .env in your editor and replace placeholder values with real ones (MONGO_URI, REDIS_URL, JWT_SECRET, REFRESH_SECRET, SMTP_USER, SMTP_PASSWORD, FRONTEND_URL)

# Start the backend (development)
npm run dev
# OR if there is no dev script
node index.js
```

Notes:
- Make sure `MONGO_URI` is reachable (e.g., `mongodb://127.0.0.1:27017/vaulta_db`)
- Use long, random strings for `JWT_SECRET` and `REFRESH_SECRET` (at least 32 chars)

## 4 — Frontend setup

```powershell
# In a new terminal
Set-Location 'c:\Users\AMAN KUMAR SINGH\OneDrive\Desktop\PROJECTS\Vaulta\frontend'

# Install dependencies
npm install

# Start frontend (Vite)
npm run dev
```

Open the URL Vite shows (usually http://localhost:5173) and test the app.

## 5 — Build for production (optional)

```powershell
# Frontend build
Set-Location 'c:\Users\AMAN KUMAR SINGH\OneDrive\Desktop\PROJECTS\Vaulta\frontend'
npm run build

# Backend: ensure .env has production values then run the production start command (if provided)
Set-Location 'c:\Users\AMAN KUMAR SINGH\OneDrive\Desktop\PROJECTS\Vaulta\backend'
node index.js
```

## 6 — Quick verification

- Register a user and confirm verification email (check backend logs for SMTP errors).
- Login to trigger OTP email and verify OTP.

## 7 — Git & safety reminders

- Do NOT commit `.env`. Add it to `.gitignore`.
- Keep `.env.example` with placeholders and commit that.
- Before pushing, run `git status` and `git diff --staged` to review changes.
- See `PushSequence.md` for recommended commit order and checks.

## Troubleshooting

- If Redis connection fails, ensure the `REDIS_URL` in `.env` matches your Redis instance (e.g., `redis://127.0.0.1:6379`).
- If Mongo fails, check `MONGO_URI` and whether Mongo container is running.
- Check backend console logs for detailed errors.
