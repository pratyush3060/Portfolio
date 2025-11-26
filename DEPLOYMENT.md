# Deployment Guide for Render (Separate Services)

This guide explains how to deploy the Pratyush Tripathi Portfolio using **separate Render services**:
- **Static Site** for the React frontend
- **Web Service** for the Express API backend

## Architecture Overview

```
Portfolio Architecture:
├── Client (React)          → Render Static Site
│   └── Build output: client/build/
│
└── Server (Express API)    → Render Web Service
    └── API routes: /api/*
```

**Benefits:**
- Independent scaling for frontend and backend
- Faster deployments (only rebuild what changed)
- Better separation of concerns
- Optimized static asset delivery

## Prerequisites

- GitHub repository with the code
- Render account ([sign up for free](https://render.com))
- MongoDB Atlas database with IP whitelist set to `0.0.0.0/0` (allow all)

## Deployment Steps

### Step 1: Deploy Backend API (Web Service)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `portfolio-backend` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Set Environment Variables**:

   | Key | Value | Required |
   |-----|-------|----------|
   | `NODE_ENV` | `production` | Yes |
   | `MONGODB_URL` | `mongodb+srv://...` | Yes |
   | `ADMIN_PASSKEY` | `your_admin_passkey` | Yes |
   | `JWT_SECRET` | `your_jwt_secret` | Yes |

6. Click **"Create Web Service"**
7. **Note the backend URL** (e.g., `https://portfolio-backend-abc123.onrender.com`)

### Step 2: Deploy Frontend (Static Site)

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same GitHub repository
3. Configure the static site:
   - **Name**: `pratyush-portfolio`
   - **Branch**: `main`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`

4. **Add Rewrite Rule** (for client-side routing):
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

5. **Optional - Custom Domain**:
   - Add your custom domain if you have one
   - Otherwise, use the Render subdomain

6. Click **"Create Static Site"**

### Step 3: Update Backend URL in Code (If Different)

If your backend URL is different from `https://portfoliobackend-w2l0.onrender.com`:

1. Update `client/src/config.js`:
   ```javascript
   const BACKEND_URL = 'https://your-backend-url.onrender.com';
   ```

2. Rebuild and redeploy:
   ```bash
   cd client
   npm run build
   git add .
   git commit -m "Update backend URL"
   git push origin main
   ```

### Step 4: Verify CORS Configuration

Ensure your backend allows requests from the frontend:
- Frontend URL: `https://pratyushtripathi.onrender.com`
- Backend CORS is already configured in `server/server.js`

## Automated Deployment (Optional)

### Using Render Blueprint

The `render.yaml` file defines both services. To use it:

1. Delete any existing services on Render (optional)
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will create both services automatically

**Note**: You'll still need to add environment variables manually.

### GitHub Actions CI/CD

Update `.github/workflows/deploy-render.yml` if you want automated deployments on push.

## Verification

### Testing the Backend API

```bash
# Health check
curl https://your-backend.onrender.com/health

# Should return:
{"status":"ok","service":"Portfolio API","timestamp":"..."}
```

### Testing the Frontend

1. Visit your static site URL (e.g., `https://pratyushtripathi.onrender.com`)
2. Verify the portfolio loads
3. Test the contact form - it should submit without CORS errors
4. Navigate to `/admin` - it should show the login page
5. Login with your admin passkey
6. Verify you can see submitted contacts

## Common Issues

### CORS Errors

**Symptom**: Contact form fails with CORS error in browser console

**Solution**:
1. Check that your frontend URL is in the CORS origin list in `server/server.js`
2. Verify there's no trailing slash mismatch
3. Redeploy the backend after updating CORS

### Admin Page Shows 404

**Symptom**: Navigating to `/admin` shows "Page Not Found"

**Solution**:
1. Ensure the static site has a rewrite rule: `/*` → `/index.html`
2. Check Render Static Site settings → Redirects/Rewrites

### Backend Not Connecting to MongoDB

**Symptom**: Backend logs show "MongoDB connection error"

**Solution**:
1. Verify `MONGODB_URL` environment variable is set correctly
2. Check MongoDB Atlas Network Access allows `0.0.0.0/0`
3. Test connection string locally first

### Slow First Load

**Issue**: Free tier services spin down after inactivity

**Solutions**:
- Upgrade to paid tier for always-on services
- Use a keep-alive service (e.g., UptimeRobot) to ping your backend every 5 minutes
- Accept the 30-second cold start on free tier

## Environment Variables Reference

### Backend (Web Service)

```env
NODE_ENV=production
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio
ADMIN_PASSKEY=your_secure_passkey
JWT_SECRET=your_secure_random_string
PORT=5000
```

### Frontend (Static Site)

No environment variables needed - configuration is in `client/src/config.js`

## Updating Your Application

### Update Frontend Only

```bash
cd client
# Make your changes
npm run build
git add .
git commit -m "Update frontend"
git push origin main
```

Render will automatically rebuild and deploy the static site.

### Update Backend Only

```bash
cd server
# Make your changes
git add .
git commit -m "Update API"
git push origin main
```

Render will automatically rebuild and deploy the web service.

### Update Both

```bash
# Make changes to both client/ and server/
git add .
git commit -m "Update both frontend and backend"
git push origin main
```

Both services will rebuild independently.

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Static Sites**: https://render.com/docs/static-sites
- **Web Services**: https://render.com/docs/web-services
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

---

**Need help?** Check deployment logs in Render dashboard for both services.
