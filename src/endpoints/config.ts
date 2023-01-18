import { Request, Response } from 'express';
import { configExampleApp } from '../exampleApp';
import logger from '../logger';

const config = (req: Request, res: Response) => {
  logger.info('Config application request');

  const applicationType = configExampleApp();
  res.send({
    success: true,
    applicationType,
  });
};

export default config;
