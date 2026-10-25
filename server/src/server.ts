import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`[Student Hub API] Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  console.log(`[Student Hub API] Health check available at http://localhost:${env.PORT}/api/health`);
});

// Handle graceful shutdown
function gracefulShutdown(signal: string) {
  console.log(`[Student Hub API] Received ${signal}. Closing server gracefully...`);
  server.close(() => {
    console.log('[Student Hub API] Server closed cleanly.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
