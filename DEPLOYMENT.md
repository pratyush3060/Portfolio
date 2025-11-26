# Deployment Guide for Render

This guide explains how to deploy the Pratyush Tripathi Portfolio to Render using the automated CI/CD pipeline.

## Prerequisites

- GitHub repository with the code
- Render account ([sign up for free](https://render.com))
- MongoDB Atlas database (or other MongoDB instance)

## One-Time Setup on Render

### Step 1: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `pratyush-portfolio` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or upgrade as needed)

### Step 2: Configure Environment Variables

In the Render dashboard for your service, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Sets Node environment |
| `MONGODB_URL` | `mongodb+srv://...` | Your MongoDB connection string |
| `PORT` | Auto-set by Render | Don't manually set this |
| `CLIENT_URL` | `https://your-client.onrender.com` | URL of your deployed client (for CORS) |
| `ADMIN_PASSKEY` | `admin123` | Passkey for Admin Login |
| `JWT_SECRET` | `your_secret_key` | Secret for session tokens |

### Step 3: Get Deploy Hook URL

1. In your Render service settings, scroll to **"Deploy Hook"**
2. Copy the deploy hook URL (looks like `https://api.render.com/deploy/srv-...`)

### Step 4: Add Deploy Hook to GitHub Secrets

1. Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `RENDER_DEPLOY_HOOK`
4. Value: Paste the deploy hook URL from Step 3
5. Click **"Add secret"**

## How It Works

### Automatic Deployment

Every time you push to the `main` branch:

1. **GitHub Actions workflow triggers** (`.github/workflows/deploy-render.yml`)
2. **Dependencies install** for root, client, and server
3. **React frontend builds** to `server/public` directory
4. **Deployment triggers** via Render deploy hook
5. **Render rebuilds and redeploys** your application

### Manual Deployment

You can also trigger deployment manually:

1. Go to GitHub repository → **Actions** tab
2. Select **"Deploy to Render"** workflow
3. Click **"Run workflow"** → Choose branch → **"Run workflow"**

## Architecture

```
Portfolio Structure:
├── client/              # React frontend (Vite)
│   ├── src/
│   └── vite.config.js   # Builds to ../server/public
├── server/              # Express backend
│   ├── server.js        # Serves API + React build
│   ├── public/          # Built React app (gitignored)
│   └── .env             # Environment variables (gitignored)
└── .github/
    └── workflows/
        └── deploy-render.yml  # CI/CD pipeline
```

**Unified Deployment**: The Express server serves both the API routes (`/api/*`) and the built React frontend (all other routes).

## Verifying Deployment

### Check Build Logs

1. Go to Render Dashboard → Your service
2. Click on the latest deploy in **"Events"**
3. Review build and deploy logs

### Test the Application

1. Visit your Render URL (e.g., `https://pratyush-portfolio.onrender.com`)
2. Verify the portfolio loads correctly
3. Test the contact form submission
4. Check MongoDB to confirm data is being saved

### Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found" errors | Ensure all dependencies are in `package.json` files |
| Contact form fails | Verify `MONGODB_URL` is set correctly in Render |
| 404 on refresh | Catch-all route in `server.js` should handle this |
| Slow first load | Free tier spins down after inactivity; upgrade or use keep-alive service |

## Environment Variables Reference

### Production (.env in server/)
```env
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
PORT=5000
```

⚠️ **Never commit `.env` files to Git!** They're in `.gitignore`.

## Updating the Application

1. Make changes to your code locally
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. GitHub Actions automatically triggers deployment
4. Monitor progress in GitHub Actions tab
5. Verify changes on Render after deployment completes

## Optional: Render Blueprint

The `render.yaml` file in the root allows you to use Render's Infrastructure as Code:

1. Go to Render Dashboard
2. Click **"New +"** → **"Blueprint"**
3. Connect your repository
4. Render will read `render.yaml` and create the service automatically

This is useful for replicating the setup or managing multiple environments.

## Support

- **Render Docs**: https://render.com/docs
- **GitHub Actions Docs**: https://docs.github.com/actions
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/

---

**Need help?** Check the deployment logs in Render and GitHub Actions for error messages.
