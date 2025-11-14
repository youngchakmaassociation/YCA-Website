# 🚀 YCA Website Deployment Guide

## Prerequisites
- GitHub account
- Railway account (free tier available)
- Netlify account (free tier available)
- MongoDB Atlas account (free tier available)

---

## Step 1: Prepare Your Repository

### 1.1 Clone and Setup
```bash
# Clone your repository
git clone https://github.com/yourusername/yca-website.git
cd yca-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 1.2 Environment Configuration
Edit `.env` file with your local development settings:
```env
NODE_ENV=development
JWT_SECRET=your-development-jwt-secret
JWT_EXPIRE=30d
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:3000
PORT=3000
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Project
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init yca-backend

# Link to existing project or create new
railway link
```

### 2.2 Set Environment Variables
In Railway dashboard or via CLI:
```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
railway variables set JWT_EXPIRE=30d
railway variables set MONGODB_URI=your-mongodb-atlas-connection-string
railway variables set FRONTEND_URL=https://your-netlify-site.netlify.app
railway variables set PORT=3000
```

### 2.3 Deploy Backend
```bash
# Deploy to Railway
railway up

# Get your backend URL
railway domain
```
**Save this URL** - you'll need it for the frontend! (e.g., `https://yca-backend-production.up.railway.app`)

---

## Step 3: Update Frontend API Configuration

### 3.1 Update login.html API URL
Open `frontend/login.html` and change:
```javascript
const API_BASE = 'http://localhost:3000'; // Change this to your Railway URL
```
To:
```javascript
const API_BASE = 'https://your-railway-project.railway.app';
```

### 3.2 Update Other API Calls (if any)
Check other frontend files that might make API calls and update the base URL accordingly.

---

## Step 4: Deploy Frontend to Netlify

### 4.1 Create Netlify Site
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** (leave empty - static site)
   - **Publish directory:** `frontend`
5. Click "Deploy site"

### 4.2 Get Your Netlify URL
After deployment, copy the URL (e.g., `https://yca-website.netlify.app`)

---

## Step 5: Update Backend CORS

### 5.1 Update FRONTEND_URL in Railway
```bash
railway variables set FRONTEND_URL=https://your-netlify-site.netlify.app
```

Or update in Railway dashboard under Variables tab.

---

## Step 6: Setup MongoDB Atlas

### 6.1 Create Database
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses: `0.0.0.0/0` (allow all)
5. Get your connection string

### 6.2 Update Railway Environment
```bash
railway variables set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yca_database?retryWrites=true&w=majority
```

---

## Step 7: Test Login Functionality

1. Visit your Netlify site
2. Go to `/login.html`
3. Try registering a new account
4. Try logging in with the new account
5. Check browser developer tools for any CORS or API errors

---

## API Documentation

📖 **Complete API documentation is available in `API_DOCUMENTATION.md`**

Key endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/zones` - Get all zones
- `GET /api/branches` - Get all branches
- `GET /api/news` - Get news and events

---

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in Railway matches your Netlify URL exactly
- Check that Railway deployment restarted after variable changes

### API Connection Issues
- Verify the API_BASE URL in login.html is correct
- Check Railway logs: `railway logs`
- Ensure MongoDB connection string is valid

### Database Issues
- Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
- Verify database user credentials
- Check MongoDB Atlas network access settings

### Build Issues
- Ensure all dependencies are in `package.json`
- Check that Railway can access your GitHub repository
- Verify build logs in Railway dashboard

---

## File Structure After Deployment

```
Your Repository
├── backend/
│   ├── server.js (Express server)
│   ├── routes/ (API routes)
│   ├── models/ (MongoDB models)
│   ├── middleware/ (Auth, error handling)
│   └── config/ (Database config)
├── frontend/
│   ├── index.html (home page)
│   ├── login.html (login/signup)
│   ├── about.html
│   ├── zones.html
│   ├── branches.html
│   └── ...other pages
├── API_DOCUMENTATION.md
├── DEPLOYMENT_GUIDE.md
├── package.json
└── .env

Production Setup:
├── Netlify (Frontend)
│   └── https://yca-website.netlify.app
├── Railway (Backend API)
│   └── https://yca-backend.railway.app/api
└── MongoDB Atlas (Database)
    └── yca_database
```

---

## Cost Breakdown (Free Tiers)

- **Railway:** 512MB RAM, 1GB storage, 100 hours/month free
- **Netlify:** 100GB bandwidth, custom domain free
- **MongoDB Atlas:** 512MB storage free

---

## Security Notes

- Change the `JWT_SECRET` to a strong, random string (at least 32 characters)
- Use HTTPS in production (Railway and Netlify provide this automatically)
- Regularly update dependencies
- Monitor Railway logs for errors
- Consider adding additional security middleware for production

---

## Environment Variables Reference

```env
# Development
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRE=30d
MONGODB_URI=mongodb://localhost:27017/yca_dev
FRONTEND_URL=http://localhost:3000
PORT=3000

# Production
NODE_ENV=production
JWT_SECRET=your-super-long-random-production-secret-key
JWT_EXPIRE=30d
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/yca_prod
FRONTEND_URL=https://your-netlify-site.netlify.app
PORT=3000
```

---

## Need Help?

If you encounter issues:
1. Check Railway deployment logs: `railway logs`
2. Verify all environment variables are set correctly
3. Test API endpoints directly in browser
4. Check browser console for JavaScript errors
5. Refer to `API_DOCUMENTATION.md` for endpoint details
6. Check MongoDB Atlas connection and network access

---

## Post-Deployment Checklist

- [ ] Backend deployed successfully on Railway
- [ ] Frontend deployed successfully on Netlify
- [ ] MongoDB Atlas database connected
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] API endpoints tested
- [ ] User registration/login working
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified
