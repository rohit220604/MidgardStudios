# 🎮 Midgard Studios

> AI-powered tools for game creators.

Midgard Studios is a niche AI-powered concept art generation platform designed for game developers, artists, and indie studios. It transforms structured creative inputs into high-quality game concept art and provides a persistent personal gallery for managing generated assets.

---

## ✨ Features

- 🎨 AI-powered game concept art generation
- 🔒 Google Authentication
- 🖼️ Personal gallery for every user
- 🔄 Re-generate existing concepts without starting over
- ☁️ Cloudinary image storage
- 🗄️ Persistent storage using Neon PostgreSQL
- 🌐 English & Japanese localization
- 📥 Download generated artwork
- 📋 Copy prompt functionality
- 📱 Responsive UI
- ⚠️ Graceful error handling for API failures and timeouts

---

## 📸 Screenshots

> Add screenshots after deployment.

| Home | Gallery |
|------|----------|
| Screenshot | Screenshot |

---

# 🏗️ Architecture

```text
                Next.js Frontend
                        │
                        ▼
                Express Backend API
                        │
                        ▼
              Prompt Construction
                        │
                        ▼
             Pollinations AI API
                        │
                        ▼
              Generated Image URL
                        │
                        ▼
            Download Image Buffer
                        │
                        ▼
               Cloudinary Storage
                        │
                        ▼
          Neon PostgreSQL (Prisma)
                        │
                        ▼
                User Gallery
```

---

# 🚀 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- next-intl
- Auth.js

## Backend

- Node.js
- Express
- TypeScript
- Prisma ORM

## Database

- Neon PostgreSQL

## Storage

- Cloudinary

## AI

- Pollinations.ai

## Authentication

- Google OAuth (Auth.js)

---

# 📂 Project Structure

```
midgard-studios/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── messages/
│   └── i18n/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── config/
│   │
│   └── prisma/
│
└── docs/
```

---

# 🔄 Request Flow

```
User

↓

Frontend

↓

Express Backend

↓

Prompt Builder

↓

Pollinations AI

↓

Generated Image

↓

Cloudinary Upload

↓

Prisma

↓

Neon Database

↓

Frontend

↓

Gallery
```

---

# 🎯 How It Works

The user provides:

- Game Genre
- Environment
- Art Style
- Inspiration
- Additional Prompt

The backend combines these inputs into an optimized prompt and sends it to Pollinations AI.

The generated image is then:

1. Downloaded by the backend
2. Uploaded to Cloudinary
3. Stored in Neon PostgreSQL
4. Returned to the frontend
5. Added to the user's personal gallery

---

# 🌍 Localization

Midgard Studios supports:

- 🇺🇸 English
- 🇯🇵 Japanese

The interface can be switched at runtime without affecting application state.

---

# 🔒 Authentication

Authentication is implemented using Google OAuth with Auth.js.

Each authenticated user has:

- Personal gallery
- Isolated generations
- Persistent history

---

# ⚠️ Error Handling

The application gracefully handles:

- AI generation timeout
- Network failures
- Invalid AI responses
- Cloudinary upload failures
- Database errors
- Missing authentication

Meaningful loading and error states are displayed to the user.

---

# 🛠️ Environment Variables

## Backend

```env
PORT=

DATABASE_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

GOOGLE_API_KEY=
```

## Frontend

```env
AUTH_SECRET=

AUTH_GOOGLE_ID=

AUTH_GOOGLE_SECRET=

NEXT_PUBLIC_API_URL=
```

---

# 💻 Running Locally

## Clone

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate deploy

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

Visit

```
http://localhost:3000
```

---

# 🎮 Design Decisions

Instead of building a generic AI image generator, Midgard Studios focuses specifically on **game concept art**.

Structured inputs such as genre, environment, and artistic style help users create consistent concepts while reducing prompt engineering complexity.

Authentication ensures every user has a dedicated gallery.

Cloudinary was chosen to offload image storage from the backend, while Neon PostgreSQL provides persistent metadata storage.

---

# ⚠️ Known Limitations

- Pollinations AI generation time may vary depending on server load.
- Image quality depends on prompt specificity.
- AI-generated outputs are non-deterministic and may differ for identical prompts.

---

# 🚀 Future Improvements

- Prompt version history
- AI prompt enhancement
- Team workspaces
- Favorite artworks
- Collections
- Public sharing links
- Additional image generation providers

---

# 👨‍💻 Author

**Rohit Jaliminchi**

- GitHub: https://github.com/rohit220604
- LinkedIn: https://www.linkedin.com/in/rohit-jaliminchi-98555224b/
- Email: rjrohit2264@gmail.com

---
