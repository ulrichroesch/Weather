import { Request, Response } from 'express';
import { fetchExampleApp } from '../exampleApp';
import logger from '../logger';
import { IFetchInput, IFetchResponse } from '../types';

const fetch = async (req: Request, res: Response) => {
  const assetId = req.params.assetId;
  const body = req.body as IFetchInput;

  logger.info(`Fetch application request: ${assetId}`);

  // YOUR CODE HERE
  const variablesTimeSeries = await fetchExampleApp(assetId, body);

  res.send({
    success: true,
    variablesTimeSeries,
  } as IFetchResponse);
};

export default fetch;
