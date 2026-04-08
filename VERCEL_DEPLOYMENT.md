# Vercel Deployment Guide

## Quick Start

### Option 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Configuration will auto-detect (Vite preset)
6. Click "Deploy"

### Option 2: CLI Deployment
```bash
npm install -g vercel
vercel
```

## Project Structure
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Install Command**: `npm install` (automatic)
- **Dev Command**: `npm run dev`
- **Framework**: Vite

## Environment Variables
If using email or APIs, add to Vercel:
1. Go to Project Settings → Environment Variables
2. Add keys like:
   - `VITE_API_URL`
   - `VITE_EMAILJS_SERVICE_ID`
   - etc.

Access in code as `import.meta.env.VITE_*`

## Performance Features Deployed
✅ Vite optimized build with code splitting
✅ Three.js, motion, carousel, icons split into separate chunks
✅ ES2020 target for smaller bundles
✅ Minified with terser
✅ Console stripped in production
✅ Sourcemaps disabled for production (faster loads)

## Build Output
- Main bundle optimized for modern browsers
- Expected bundle size: ~300-400KB (gzipped)
- Automatic caching via Vercel CDN
- Edge functions ready for API routes

## Domain Configuration
After first deploy:
1. Go to Project Settings → Domains
2. Add custom domain or use generated `*.vercel.app` URL
3. Add CNAME record if using custom domain

## Monitoring
- Vercel Analytics: Automatic performance tracking
- Check buildlog in Deployment history for issues
- Environment: Check Edge Network, Serverless Functions status

## Troubleshooting
**Build fails**: Check `npm run build` locally first
**Function timeouts**: Reduce image optimization or move complex logic to client
**Memory issues**: Reviewed in Vercel logs, split components further
**301 redirects**: Configure in `vercel.json` redirects array if needed

## Next Steps
```bash
# Test locally first
npm run build
npm run preview

# Then deploy
vercel --prod
```
