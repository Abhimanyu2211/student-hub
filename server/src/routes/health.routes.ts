import { Router, Request, Response } from 'express';
import { env } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'student-hub-api',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

healthRouter.get('/health/db', (req: Request, res: Response) => {
  // In Phase 3, database persistence is scheduled for Phase 4.
  // This endpoint returns connection status safely without leaking URIs or credentials.
  res.status(200).json({
    status: 'ok',
    database: {
      connected: false,
      driver: 'mongodb',
      message: 'Database persistence scheduled for Phase 4 implementation.',
    },
    timestamp: new Date().toISOString(),
  });
});
