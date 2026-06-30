# System Design

## High Level Architecture

User

↓

Frontend (Next.js)

↓

Backend API (Express)

↓

Gemini Image API

↓

Cloudinary

↓

Neon PostgreSQL

↓

Frontend Response

---

## Request Journey

1. User enters game details.
2. Frontend validates input.
3. Request is sent to backend.
4. Backend builds the final AI prompt.
5. Backend calls Gemini Image API.
6. AI returns generated image.
7. Backend uploads image to Cloudinary.
8. Image URL and metadata are stored in PostgreSQL.
9. Backend returns response.
10. Frontend updates the gallery.

---

## Why Backend?

The AI API key should never be exposed to the browser.

The backend acts as:

- Security layer
- Validation layer
- Storage manager
- Error handling layer

---

## Image Storage

Images are uploaded to Cloudinary.

The database stores only:

- Prompt
- Metadata
- Cloudinary URL

This keeps the database lightweight.

---

## Gallery Flow

Database

↓

Backend

↓

Frontend Gallery

↓

User selects image

↓

Prompt pre-filled

↓

Generate Again

---

## Concurrent Users

Each request is processed independently.

Images are uploaded separately.

Database records are created independently using unique IDs.

---

## Failure Handling

- Invalid prompt
- AI timeout
- Broken API response
- Cloudinary upload failure
- Database write failure