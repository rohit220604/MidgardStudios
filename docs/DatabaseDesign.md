# Database Design

## Generation Table

| Field | Type |
|-------|------|
| id | String |
| genre | String |
| environment | String |
| style | String |
| prompt | String |
| imageUrl | String |
| createdAt | DateTime |

---

## Storage Strategy

Images are stored in Cloudinary.

Only metadata is stored in PostgreSQL.

---

## Benefits

- Small database size
- Faster queries
- Easy CDN delivery
- Better scalability

---

## Future Tables

Users

Favorites

Collections

Tags