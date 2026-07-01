# API Design

---

# Authentication

Authentication is handled on the frontend using Auth.js with Google OAuth.

Authenticated users receive a session which is used for accessing protected features.

---

# POST /generate

Generates a new AI image.

### Request

```json
{
    "genre": "",
    "environment": "",
    "style": "",
    "inspiredBy": "",
    "prompt": ""
}
```

### Response

```json
{
    "success": true,
    "imageUrl": "",
    "prompt": "",
    "generationId": ""
}
```

---

# GET /gallery

Returns only the authenticated user's generated images.

### Response

```json
[
    {
        "id": "",
        "imageUrl": "",
        "prompt": "",
        "createdAt": ""
    }
]
```

---

# POST /regenerate

Creates another image using an existing prompt.

### Request

```json
{
    "generationId": "",
    "updatedPrompt": ""
}
```

---

# Error Responses

400

Invalid Prompt

401

Unauthorized

403

Forbidden

500

Image Generation Failed

503

AI Service Unavailable

504

Generation Timeout