# Error Handling

## Invalid Prompt

Condition

- Empty prompt
- Too short

Action

- Show validation message

---

## API Timeout

Condition

- AI takes too long

Action

- Display timeout message
- Allow retry

---

## Invalid API Response

Condition

- No image returned

Action

- Show failure notification

---

## Cloudinary Failure

Condition

- Upload fails

Action

- Stop database write
- Notify user

---

## Database Failure

Condition

- Save operation fails

Action

- Inform user
- Log error

---

## Frontend

- Toast notifications
- Retry button
- Loading skeleton