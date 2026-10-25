import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: env.NODE_ENV === 'test' ? 1000 : 25, // 25 attempts per 15 minutes in dev/prod
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: {
    status: 'error',
    statusCode: 429,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});
