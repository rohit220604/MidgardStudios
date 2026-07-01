# Error Handling

---

# Invalid Prompt

Condition

- Empty prompt
- Too short

Action

- Show validation message

---

# AI Timeout

Condition

- Pollinations takes too long

Action

- Retry automatically
- Show timeout notification

---

# Empty AI Response

Condition

- Image download returns empty bytes

Action

- Retry polling

---

# Cloudinary Failure

Condition

- Upload fails

Action

- Stop database write
- Notify user

---

# Database Failure

Condition

- Save operation fails

Action

- Show error
- Log failure

---

# Authentication Failure

Condition

- User not logged in

Action

- Redirect to Login

---

# Frontend

- Toast notifications
- Retry button
- Loading skeleton
- Friendly error messages