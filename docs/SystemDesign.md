# System Design

---

# High Level Architecture

User

↓

Next.js Frontend

↓

Auth.js (Google OAuth)

↓

Express Backend

↓

Prompt Builder

↓

Pollinations AI

↓

Cloudinary

↓

Neon PostgreSQL

↓

Frontend Response

---

# Request Journey

1. User signs in with Google.
2. User fills the generation form.
3. Frontend validates input.
4. Backend builds the optimized prompt.
5. Backend requests image generation from Pollinations.
6. Backend waits until the image becomes available.
7. Image is downloaded.
8. Image is uploaded to Cloudinary.
9. Metadata is stored in PostgreSQL.
10. Response is returned.
11. Personal gallery updates.

---

# Backend Responsibilities

- Authentication verification
- Prompt optimization
- AI communication
- Cloudinary upload
- Database storage
- Error handling

---

# Image Storage

Images are uploaded to Cloudinary.

Database stores

- Prompt
- Metadata
- Cloudinary URL
- User ID

---

# Gallery Flow

Login

↓

Generate

↓

Cloudinary

↓

Database

↓

My Gallery

↓

Regenerate

---

# Failure Handling

- Invalid prompt
- AI timeout
- Empty image
- Cloudinary upload failure
- Database failure