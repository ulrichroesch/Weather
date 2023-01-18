import { Request, Response } from 'express';
import { updateExampleApp } from '../exampleApp';
import logger from '../logger';
import { IStatusResponse, IUpdateInput } from '../types';

const update = (req: Request, res: Response) => {
  const assetId = req.params.assetId;
  const body = req.body as IUpdateInput;

  logger.info(`Update installation request: ${assetId}`);

  // YOUR CODE HERE
  updateExampleApp(assetId, body);

  res.send({
    success: true,
  } as IStatusResponse);
};

export default update;
