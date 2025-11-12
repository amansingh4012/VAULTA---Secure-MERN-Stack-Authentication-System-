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
   Build Command: npm run build
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
   | `FRONTEND_URL` | Your Render URL (e.g., `https://vaulta.onrender.com`) |
   | `JWT_SECRET` | Generate a long random string (min 32 chars) |
   | `REFRESH_SECRET` | Generate another long random string (min 32 chars) |
   | `SMTP_USER` | Your Gmail address |
   | `SMTP_PASSWORD` | Your Gmail App Password |
   | `APP_NAME` | `Vaulta` |

   **Important**: For `FRONTEND_URL`, use your Render service URL. After deployment, update this value.

6. **Deploy**
   - Click **"Create Web Service"**
   - Render will automatically build and deploy your app
   - Wait 5-10 minutes for the first deployment

7. **Update FRONTEND_URL**
   - After deployment, copy your service URL (e.g., `https://vaulta.onrender.com`)
   - Go to **Environment** tab
   - Update `FRONTEND_URL` with your actual URL
   - Render will automatically redeploy

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
If you have CORS issues, verify `FRONTEND_URL` in environment variables matches your Render URL.

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
