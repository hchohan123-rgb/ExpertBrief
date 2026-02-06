<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1gWx2BaVkpcyAy7-p9pe1XiU7qBMZg09h

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set up your Supabase credentials in [.env.local](.env.local):
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key

   Get these from your Supabase project dashboard: Settings → API
3. Run the app:
   `npm run dev`

## Deploy on Railway

Vite bakes `VITE_*` env vars **at build time**. If they're missing when Railway runs `npm run build`, the app can't reach Supabase.

1. In your **Railway project** → **Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL (e.g. `https://xxxx.supabase.co`)
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon/public key  
   Get both from Supabase: **Settings → API**.

2. **Redeploy** so the build runs with these variables (e.g. **Deploy** from the Railway dashboard or push a new commit). Do not rely on a previous build that ran without them.
