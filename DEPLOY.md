# 🚀 Deploying DriveWise — Step by Step

DriveWise is **two separate apps**:

| Part | Tech | Host |
|------|------|------|
| **Frontend** | React + Vite | **Vercel** |
| **Backend** | FastAPI + FAISS + Gemini | **Render** or **Railway** (Vercel can't run the heavy ML backend) |

**Order matters:** deploy the **backend first**, copy its public URL, then deploy the frontend and point it at that URL. Finally, connect them back together for CORS.

```
GitHub  ──►  Render (backend)  ──►  copy URL  ──►  Vercel (frontend)  ──►  connect CORS
```

---

## Step 0 — Prerequisites (one-time)

Before you start, make sure you have:

1. A **GitHub account** with this repo pushed (see Step 1).
2. A **Google Gemini API key** — get one free at <https://aistudio.google.com/apikey>.
3. A **Render account** — sign up at <https://render.com> (free with GitHub login).
4. A **Vercel account** — sign up at <https://vercel.com> (free with GitHub login).

---

## Step 1 — Push the code to GitHub

Render and Vercel both deploy *from* GitHub, so the repo must be on GitHub first.

1. Create an empty repo on GitHub (e.g. `DriveWise`). **Do not** add a README/gitignore — the repo already has them.
2. From the project root, run:
   ```bash
   git add -A
   git commit -m "Deploy-ready DriveWise"
   git branch -M main
   git remote add origin https://github.com/<your-username>/DriveWise.git
   git push -u origin main
   ```
   > If `origin` already exists, use `git remote set-url origin <url>` instead of `git remote add`.
3. Refresh the repo page on GitHub — you should see all your files.

✅ **Done when:** your code is visible on GitHub.

---

## Step 2 — Deploy the Backend to Render

The repo is already deployment-ready — no code changes needed:
- [`backend/requirements.txt`](backend/requirements.txt) — dependencies
- [`backend/Procfile`](backend/Procfile) — start command
- [`backend/runtime.txt`](backend/runtime.txt) — pins Python 3.11
- The FAISS index, brochures, and `cars.json` under `backend/data/` are committed, so data is present on boot.

### Steps

1. Go to <https://dashboard.render.com> → click **New +** → **Web Service**.
2. Click **Connect** next to your GitHub repo (authorize Render if asked).
3. Fill in the settings:
   | Field | Value |
   |-------|-------|
   | **Name** | `drivewise-backend` (or anything) |
   | **Root Directory** | `backend` |
   | **Runtime** | Python 3 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` *(auto-filled from the Procfile)* |
   | **Instance Type** | **512 MB–1 GB paid** (see memory note below) |
4. Scroll to **Environment Variables** → **Add Environment Variable** and add:
   | Key | Value |
   |-----|-------|
   | `GEMINI_API_KEY` | your key from <https://aistudio.google.com/apikey> |
   | `ALLOWED_ORIGINS` | leave as `http://localhost:5173` **for now** — you'll update it in Step 4 once you have the Vercel URL |
5. Click **Create Web Service**. Wait for the build to finish (first build takes a few minutes).
6. Copy the public URL at the top, e.g. `https://drivewise-backend.onrender.com`.
7. **Verify it's alive:** open `https://<your-backend>/health` in your browser → you should see `{"status":"OK"}`.

> ⚠️ **Memory matters.** The ML stack (torch + sentence-transformers + faiss) needs real RAM. Render's **free 512 MB tier often crashes on startup** — if the service keeps restarting, upgrade to a paid instance with ≥512 MB–1 GB.

> 💡 **Railway alternative:** the process is the same — New Project → Deploy from GitHub → set **Root Directory** to `backend`, add the same two env vars.

✅ **Done when:** `/health` returns `{"status":"OK"}`. **Keep the backend URL handy for Step 3.**

---

## Step 3 — Deploy the Frontend to Vercel

Config is already in place:
- [`frontend/vercel.json`](frontend/vercel.json) — SPA rewrites so deep links (`/assistant`, `/compare`, …) don't 404
- All API calls go through [`frontend/src/api.js`](frontend/src/api.js), which reads `VITE_API_BASE_URL`

### Steps

1. Go to <https://vercel.com/new> → **Import** your GitHub repo.
2. In the configuration screen:
   | Field | Value |
   |-------|-------|
   | **Root Directory** | `frontend` (click **Edit** → select `frontend`) |
   | **Framework Preset** | **Vite** (auto-detected) |
   | **Build Command** | `npm run build` (default) |
   | **Output Directory** | `dist` (default) |
3. Expand **Environment Variables** and add:
   | Key | Value |
   |-----|-------|
   | `VITE_API_BASE_URL` | your backend URL from Step 2, e.g. `https://drivewise-backend.onrender.com` — **no trailing slash** |
4. Click **Deploy** and wait for the build.
5. Copy your live frontend URL, e.g. `https://drivewise.vercel.app`.

> ⚠️ Vite reads env vars **at build time only**. If you change `VITE_API_BASE_URL` later, you must **redeploy** (Vercel → Deployments → ⋯ → Redeploy) for it to take effect.

✅ **Done when:** the Vercel URL opens the DriveWise UI. **Copy this URL for Step 4.**

---

## Step 4 — Connect the two (fix CORS)

Right now the backend still rejects the frontend because it doesn't know the Vercel URL. Fix it:

1. Go back to **Render** → your backend service → **Environment**.
2. Edit `ALLOWED_ORIGINS` and set it to your **exact** Vercel URL:
   ```
   https://drivewise.vercel.app,http://localhost:5173
   ```
   - Scheme + host, **no trailing slash**.
   - The `,http://localhost:5173` part is optional — it keeps local dev working too.
3. **Save** — Render redeploys automatically.
4. Open your Vercel URL, try the **AI Assistant** or **Compare** page, and confirm data loads.

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Browser console shows a **CORS error** | The Vercel URL isn't in `ALLOWED_ORIGINS`, or has a trailing slash / wrong scheme. Fix it in Render and let it redeploy. |
| Frontend loads but **all requests fail** | `VITE_API_BASE_URL` is wrong or was changed without redeploying Vercel. |
| Backend **crashes on startup** | Out of memory — upgrade the Render instance (see Step 2 note). |
| `/health` works but AI answers fail | `GEMINI_API_KEY` is missing or invalid on Render. |

✅ **Done when:** the deployed frontend can talk to the deployed backend with no CORS errors. 🎉

---

## Local development

**Backend:**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # then add your GEMINI_API_KEY
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env      # already points at http://127.0.0.1:8000
npm run dev
```

Then open <http://localhost:5173>.
