import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { notFoundHandler } from "./middleware/notFound.middleware.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: env.NODE_ENV === "production" ? env.FRONTEND_URL : true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-user-email"],
  }),
);
app.use(express.json());

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
