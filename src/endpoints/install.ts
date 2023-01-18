import { Request, Response } from 'express';
import { installExampleApp } from '../exampleApp';
import logger from '../logger';
import { IInstallInput, IInstallResponse } from '../types';

const install = (req: Request, res: Response) => {
  const body = req.body as IInstallInput;

  logger.info(`Install installation request: ${body.name}`);

  // YOUR CODE HERE
  // Return a uniq asset ID that will identify this application.
  const assetId = installExampleApp(body);

  res.send({
    success: true,
    assetId,
  } as IInstallResponse);
};

export default install;
