export const logger = {
  info(message: string): void {
    process.stdout.write(`${message}\n`);
  },

  error(message: string, error?: unknown): void {
    const details = error instanceof Error ? error.message : String(error ?? "");
    process.stderr.write(details ? `${message}: ${details}\n` : `${message}\n`);
  },
};
