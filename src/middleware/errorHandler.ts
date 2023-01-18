import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { IStatusResponse } from '../types';

export const exceptionHandler = (fn: any) => {
  return (...args: any[]) => {
    const fnRes = fn(...args);
    if (fnRes && fnRes.catch) {
      return fnRes.catch(args[2]);
    }
    return fnRes;
  };
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(`Uncaught exception: ${err.message}`);
  res.status(500).send({
    success: false,
    errorMessage: err.message,
  } as IStatusResponse);
}
