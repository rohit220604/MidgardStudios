import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const startServer = (): void => {
  const host = env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  const server = app.listen(env.PORT, host, () => {
    logger.info(`Server running on ${host}:${env.PORT}`);
  });

  // Graceful shutdown — required for Render / Docker
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal} — shutting down gracefully`);
    server.close(() => {
      logger.info("Server closed");
      process.exit(0);
    });

    // Force shutdown after 10 s
    setTimeout(() => {
      logger.error("Forced shutdown after timeout");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer();
