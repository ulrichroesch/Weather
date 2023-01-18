import { Request, Response } from 'express';
import { sendExampleApp } from '../exampleApp';
import logger from '../logger';
import { ISendInput, ISendResponse } from '../types';

const send = (req: Request, res: Response) => {
  const assetId = req.params.assetId;
  const body = req.body as ISendInput;

  logger.info(`Send application request: ${assetId}`);

  // YOUR CODE HERE
  const variablesTimeSeries = sendExampleApp(assetId, body);

  res.send({
    success: true,
    variablesTimeSeries,
  } as ISendResponse);
};

export default send;
