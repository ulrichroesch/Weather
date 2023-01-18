import { NextFunction, Request, Response } from 'express';
import { API_KEY } from '../config';
import logger from '../logger';

export function checkAuthorization(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization !== `Basic ${API_KEY}`) {
    logger.error('API_KEY is not correct');
    return res.status(500).send({
      success: false,
      errorMessage: 'You are not allowed',
    });
  }
  next();
}
