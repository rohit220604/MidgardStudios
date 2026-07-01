# Database Design

---

# User Table

| Field | Type |
|------|------|
| id | String |
| name | String |
| email | String |
| image | String |
| provider | String |
| createdAt | DateTime |

---

# Generation Table

| Field | Type |
|------|------|
| id | String |
| userId | String |
| genre | String |
| environment | String |
| style | String |
| inspiredBy | String |
| prompt | String |
| imageUrl | String |
| createdAt | DateTime |

---

# Relationships

User

1

↓

∞

Generation

---

# Storage Strategy

Images are stored in Cloudinary.

Only metadata is stored in PostgreSQL.

---

# Benefits

- Small database size
- Faster queries
- CDN image delivery
- Better scalability
- User-specific galleries

---

# Future Tables

Favorites

Collections

Prompt Templates