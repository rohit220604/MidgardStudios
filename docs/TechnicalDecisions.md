# Technical Decisions

This document explains the major technical decisions made while building Midgard Studios and the reasoning behind each choice.

---

# Why Next.js?

Next.js was selected because it provides a modern React framework with built-in routing, excellent performance, server-side rendering capabilities, and a clean development experience.

It also integrates seamlessly with Auth.js for authentication and supports scalable frontend architecture.

---

# Why Express.js?

Express.js was chosen as the backend framework because it is lightweight, flexible, and easy to extend.

All AI communication happens through the backend, ensuring API keys remain secure and never reach the browser.

The backend is responsible for:

- Prompt optimization
- AI communication
- Image processing
- Cloudinary uploads
- Database operations

---

# Why TypeScript?

TypeScript improves maintainability by providing static type checking and better IDE support.

It helps reduce runtime errors while making the codebase easier to understand and refactor.

---

# Why Prisma ORM?

Prisma provides a type-safe interface for interacting with PostgreSQL.

Benefits include:

- Auto-generated types
- Easy schema management
- Simple migrations
- Improved developer productivity

---

# Why Neon PostgreSQL?

Neon was selected because it provides a free, serverless PostgreSQL database with excellent performance and straightforward deployment.

Only application metadata is stored in the database.

Generated images are stored separately in Cloudinary.

---

# Why Cloudinary?

AI-generated images can become large over time.

Instead of storing image files inside PostgreSQL, Cloudinary is used to provide:

- Cloud storage
- Automatic CDN delivery
- Fast image loading
- Reduced database size
- Better scalability

The database stores only the Cloudinary URL and metadata.

---

# Why Pollinations AI?

Pollinations AI was selected because it provides a free image generation API suitable for rapid prototyping.

Although generation time may vary depending on server load, it allows the application to demonstrate a complete AI image generation workflow without requiring a paid API.

---

# Why Google OAuth?

Google OAuth was selected instead of traditional email/password authentication because it offers:

- Faster sign-in
- Better security
- No password management
- No password reset implementation
- Reduced backend complexity

Each authenticated user receives an isolated personal gallery.

---

# Why Server-side AI Requests?

The assignment explicitly requires all AI API calls to go through the backend.

This architecture also provides additional benefits:

- Protects API integrations
- Allows centralized error handling
- Enables prompt optimization
- Supports future AI providers
- Prevents exposing sensitive configuration

---

# Why Structured Prompt Inputs?

Instead of asking users to write long prompts manually, the application collects structured information such as:

- Game Genre
- Environment
- Art Style
- Inspiration
- Additional Details

The backend combines these inputs into an optimized AI prompt.

This approach improves prompt consistency while reducing prompt engineering effort for the user.

---

# Why User-specific Galleries?

Every authenticated user has an isolated gallery.

This ensures:

- Privacy
- Multi-user support
- Persistent history
- Future scalability for collections and favorites

---

# Why Localization?

English and Japanese localization was implemented to make the application accessible to a broader audience and demonstrate support for internationalization.

The localization system was built using translation files so that additional languages can be added with minimal code changes.

---

# Why This Architecture?

The application follows a clear separation of responsibilities.

Frontend

↓

User Interface

↓

Express Backend

↓

Prompt Processing

↓

Pollinations AI

↓

Cloudinary

↓

Neon PostgreSQL

↓

Frontend Response

This separation improves maintainability, scalability, and security.

---

# Future Improvements

If the project were to evolve further, the following improvements would be considered:

- Multiple AI Providers
- Team Workspaces
- Public Gallery
- Favorite Images
- AI Prompt Suggestions
- Download History
- Collections
- Sharing Generated Artwork
- More authentication options

These enhancements were intentionally left out to keep the current implementation focused while satisfying the assignment requirements.