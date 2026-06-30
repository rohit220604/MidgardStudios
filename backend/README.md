# Midgard Studios Backend

API backend for **Midgard Studios** — AI-powered tools for game creators.

This service provides the foundation for the Midgard Studios platform. Future stages will add database models, AI generation, media uploads, and business logic on top of this architecture.

## Folder Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Prisma schema (models added in later stages)
├── src/
│   ├── config/             # Environment and app configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Express middleware (errors, 404)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic (future stages)
│   ├── lib/                # Shared libraries (Prisma client)
│   ├── utils/              # Utility helpers
│   ├── types/              # TypeScript interfaces and types
│   ├── app.ts              # Express application setup
│   └── server.ts           # Server entry point
├── .env.example            # Environment variable template
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the environment template and fill in your values:

   ```bash
   cp .env.example .env
   ```

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Server port (defaults to `3000`) |
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `GEMINI_API_KEY` | Google Gemini API key (future stages) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (future stages) |
| `CLOUDINARY_API_KEY` | Cloudinary API key (future stages) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (future stages) |

## Development Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Generate Prisma client and compile TypeScript |
| `npm start` | Run the compiled production build |

## API Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | API welcome message |
| `GET` | `/health` | Health check with timestamp |

### Example Responses

**GET /**

```json
{
  "success": true,
  "message": "Midgard Studios API"
}
```

**GET /health**

```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-06-30T12:00:00.000Z"
}
```
