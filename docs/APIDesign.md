# API Design

## POST /generate

Generates a new AI image.

### Request

{
    genre,
    environment,
    style,
    prompt
}

### Response

{
    success,
    imageUrl,
    prompt,
    generationId
}

---

## GET /gallery

Returns all generated images.

### Response

[
    {
        id,
        imageUrl,
        prompt,
        createdAt
    }
]

---

## POST /regenerate

Uses a previous prompt to create another image.

### Request

{
    generationId,
    updatedPrompt
}

---

## Error Responses

400

Invalid Prompt

---

500

Image Generation Failed

---

504

Generation Timeout

---

503

Service Unavailable