# Deployment Guide - Zuri Oasis Elite

## Cloudflare Pages Deployment

### Prerequisites
- GitHub repository (already set up)
- Cloudflare account (free tier works)
- Domain `zurioasiselite.icu` (optional, can use Cloudflare's subdomain initially)

### Step 1: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click "Pages" in the sidebar
3. Click "Create a project"
4. Choose "Connect to Git"
5. Select your GitHub account and the `bespoke-matchmaking-platform` repository

### Step 2: Configure Build Settings

- **Framework preset**: Create React App
- **Build command**: `cd frontend && npm run build`
- **Build output directory**: `frontend/build`
- **Root directory**: `/` (leave blank for root)

### Step 3: Environment Variables (if needed)
Currently, no environment variables are needed for the MVP since we're using WhatsApp direct links.

### Step 4: Custom Domain (Optional)
If you have `zurioasiselite.icu`:
1. Add the domain in Cloudflare Pages
2. Update DNS settings to point to Cloudflare

### Step 5: Deploy
- Click "Save and Deploy"
- Cloudflare will automatically build and deploy your site
- You'll get a URL like `https://zuri-oasis-elite.pages.dev`

## Backend (Currently Not Needed)
The MVP uses WhatsApp direct links, so no backend deployment is needed initially.
When you're ready to add backend features, consider:
- Cloudflare Workers for serverless functions
- Cloudflare D1 for database
- Or traditional hosting for the Node.js backend

## Automatic Deployments
Once connected, every push to the `main` branch will automatically trigger a new deployment.

## Custom Domain Setup
1. In Cloudflare Pages project settings
2. Go to "Custom domains"
3. Add `zurioasiselite.icu`
4. Follow DNS configuration instructions
