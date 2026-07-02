# Deployment

## Frontend

Platform

- Vercel

---

## Backend

Platform

- Render

---

## Database

Platform

- Neon PostgreSQL

---

## Image Storage

Platform

- Cloudinary


---

## Production Environment Variables

### Frontend (Vercel)

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | NextAuth secret key |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `NEXTAUTH_URL` | Production frontend URL (e.g. `https://midgardstudios.vercel.app`) |
| `NEXT_PUBLIC_API_URL` | Production backend URL (e.g. `https://midgard-studios-api.onrender.com`) |

### Backend (Render)

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to `production` |
| `PORT` | Render provides this automatically |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GEMINI_API_KEY` | Pollinations / Gemini API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Production frontend URL for CORS (e.g. `https://midgardstudios.vercel.app`) |

### Important Notes

- **CORS**: Backend restricts requests to `FRONTEND_URL` in production.
- **Graceful Shutdown**: Backend handles `SIGTERM` for zero-downtime deploys on Render.
- **Host Binding**: Backend binds to `0.0.0.0` in production so Render can route traffic.
- **Build Command (Backend)**: `npm run build` (runs `prisma generate && tsc`)
- **Start Command (Backend)**: `npm start` (runs `node dist/server.js`)

