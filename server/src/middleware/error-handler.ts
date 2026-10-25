import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl}`,
    suggestion: 'Verify the route path and HTTP method.',
  });
}

export function errorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const isProduction = env.NODE_ENV === 'production';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
