import { Router, Request, Response } from 'express';
import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/db.js';

export const healthRouter = Router();

// Liveness probe: Reports whether process is alive
healthRouter.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'student-hub-api',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Readiness probe: Reports actual database connectivity
healthRouter.get('/health/db', (req: Request, res: Response) => {
  const dbStatus = getDatabaseStatus();

  if (dbStatus.connected) {
    res.status(200).json({
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(503).json({
      status: 'error',
      database: dbStatus,
      message: 'Database is currently not connected or connecting.',
      timestamp: new Date().toISOString(),
    });
  }
});
