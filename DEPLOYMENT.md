# 🚀 Deployment Guide - Render (Single Service)

This guide explains how to deploy both frontend and backend together as a single service on Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - For production database ([mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
4. **Redis Cloud** - For production Redis ([redis.com/try-free](https://redis.com/try-free/))

---

## 🔧 Pre-Deployment Checklist

### 1. Update .gitignore
Ensure `.env` files are not committed:
```
.env
.env.local
.env.production
node_modules/
```

### 2. Commit all changes
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## 🌐 Set Up External Services

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/vaulta_db
   ```
5. **Important**: Whitelist all IPs (0.0.0.0/0) for Render access

### Redis Cloud Setup
1. Go to [Redis Cloud](https://redis.com/try-free/)
2. Create a free database
3. Get your connection string (looks like):
   ```
   redis://default:<password>@redis-xxxxx.cloud.redislabs.com:xxxxx
   ```

---

## 🎯 Deploy to Render

### Option A: Using Render Dashboard (Recommended)

1. **Login to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Sign in with GitHub

2. **Create New Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select your **Vaulta** repository

3. **Configure Build Settings**
   ```
   Name: vaulta (or your preferred name)
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: chmod +x build.sh && ./build.sh
   Start Command: npm start
   ```

4. **Select Plan**
   - Choose **Free** plan (or paid plan for better performance)

5. **Add Environment Variables**
   Click **"Advanced"** and add these environment variables:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `REDIS_URL` | Your Redis Cloud connection string |
   | `PORT` | `5000` |
   | `JWT_SECRET` | Generate a long random string (min 32 chars) |
   | `REFRESH_SECRET` | Generate another long random string (min 32 chars) |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASSWORD` | Your Gmail App Password |
   | `APP_NAME` | `Vaulta` |

   **Note**: No need for `FRONTEND_URL` since frontend and backend are served together from the same domain!

6. **Deploy**
   - Click **"Create Web Service"**
   - Render will automatically build and deploy your app
   - Wait 5-10 minutes for the first deployment
   - Your app will be available at your Render URL (e.g., `https://vaulta.onrender.com`)

---

### Option B: Using render.yaml (Infrastructure as Code)

1. **Push render.yaml to GitHub** (already created in the project)

2. **Create Blueprint**
   - Go to Render Dashboard
   - Click **"New +"** → **"Blueprint"**
   - Connect your repository
   - Render will detect `render.yaml` and create the service

3. **Add Environment Variables** (same as Option A)

---

## ✅ Post-Deployment Steps

### 1. Test Your Deployment
- Open your Render URL (e.g., `https://vaulta.onrender.com`)
- Try registering a new user
- Check email delivery
- Test OTP login

### 2. Monitor Logs
- Go to Render Dashboard → Your Service → **Logs**
- Check for any errors

### 3. Update CORS Settings (if needed)
If you have CORS issues in development mode, ensure `FRONTEND_URL` in your local `.env` is set to `http://localhost:5173`. In production, CORS is automatically configured for same-origin requests.

---

## 🔐 Security Best Practices

1. **Use Strong Secrets**
   - Generate JWT_SECRET and REFRESH_SECRET with at least 32 characters
   - Use: `openssl rand -base64 32` or online generator

2. **Keep Secrets Safe**
   - Never commit `.env` files to Git
   - Use Render's environment variables feature

3. **Database Security**
   - Use MongoDB Atlas with authentication
   - Don't expose database publicly

4. **HTTPS Only**
   - Render provides free SSL certificates
   - All traffic is automatically encrypted

---

## 🐛 Troubleshooting

### Build Fails - Cannot Find Package
**Error**: `Cannot find package '@vitejs/plugin-react'`

**Root Cause**: When `NODE_ENV=production`, npm skips `devDependencies` during installation. However, Vite and its plugins (like `@vitejs/plugin-react`) are required to build the frontend, even though they're in `devDependencies`.

**Solution**: The `build.sh` script has been updated to:
1. Set `NODE_ENV=development` during dependency installation
2. Perform a clean install of all dependencies (including dev dependencies)
3. Verify that `@vitejs/plugin-react` is installed before building
4. Automatically install it if missing

**What the script does**:
1. Removes old `node_modules` and lock files
2. Performs fresh `npm install` with `NODE_ENV=development` for both backend and frontend
3. Verifies critical build dependencies are present
4. Builds the frontend with all dependencies available

**If still failing**:
1. Clear Render's build cache: Settings → Build & Deploy → Clear Build Cache
2. Check that `build.sh` has execute permissions
3. Verify the build command in Render is: `chmod +x build.sh && ./build.sh`
4. Check build logs for the exact error location
5. Ensure `package.json` files are valid and committed
6. Try manually redeploying from Render dashboard

### PathError - Missing Parameter Name
**Error**: `PathError [TypeError]: Missing parameter name at index 1: *`

**Solution**: This was caused by Express 5's routing changes. The wildcard route syntax has been updated to use middleware instead of `app.get("*", ...)`. This is already fixed in the codebase.

### Failed to Connect (Redis/MongoDB)
**Error**: `Failed to connect`

**Possible causes**:
1. **Missing environment variables** - Ensure `MONGO_URI` and `REDIS_URL` are set in Render
2. **Incorrect connection strings** - Verify MongoDB and Redis URLs are correct
3. **Network issues** - Check if MongoDB Atlas allows connections from all IPs (0.0.0.0/0)

**Solution**:
- Check Render logs for specific connection errors
- Verify environment variables in Render dashboard
- Test MongoDB connection string locally
- Ensure Redis URL doesn't have `redis-cli -u` prefix

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### App Crashes After Deploy
- Check runtime logs
- Verify all environment variables are set correctly
- Test MongoDB and Redis connections

### Email Not Sending
- Verify SMTP credentials
- Use Gmail App Password, not regular password
- Check backend logs for email errors

### 404 on Routes
**Error**: `ENOENT: no such file or directory, stat '/opt/render/project/src/frontend/dist/index.html'`

**Possible causes**:
1. Frontend build failed silently
2. Build output directory not created
3. Vite build configuration issue

**Solution**:
- Check build logs to ensure frontend build completed successfully
- Look for "Building Frontend" and "Build Complete" messages
- Verify `frontend/dist` directory was created
- The updated `build.sh` now includes verification steps
- Ensure `vite.config.js` has correct `outDir` configuration

### 404 on Routes (General)
- Ensure frontend routing is handled correctly
- Check `backend/index.js` has the catch-all route for production

### Free Plan Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Consider upgrading to paid plan for production apps

---

## 📊 Monitoring & Maintenance

### Check Service Health
```bash
curl https://your-app.onrender.com/api/v1/health
```

### View Logs
- Go to Render Dashboard → Logs
- Monitor for errors and performance issues

### Auto-Deploy on Git Push
- Render automatically deploys when you push to `main` branch
- Disable in Settings → Build & Deploy if needed

---

## 🎉 Success!

Your Vaulta app should now be live at: `https://your-app.onrender.com`

### Next Steps:
- Set up custom domain (optional)
- Configure auto-scaling (paid plans)
- Set up monitoring alerts
- Configure backup strategies

---

## 📞 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)

---

**Author**: Aman Kumar Singh  
**Repository**: [github.com/amansingh4012/VAULTA---Secure-MERN-Stack-Authentication-System-](https://github.com/amansingh4012/VAULTA---Secure-MERN-Stack-Authentication-System-)
