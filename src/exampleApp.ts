import _ from 'lodash';
import FileSync from 'lowdb/adapters/FileSync';
import { v4 } from 'uuid';
import { APPLICATION_CONFIG, WEATHER_API_KEY } from './config';
import logger from './logger';
import { ICustomFieldInput, IErrorInput, IFetchInput, IInstallInput, ISendInput, IUpdateInput, IVariableTimeSeries } from './types';
// tslint:disable-next-line: no-var-requires
const lowdb = require('lowdb');
import * as request from 'request-promise-native';

const adapter = new FileSync(process.env.LOCAL_DATABASE_PATH || 'db.json');
const db = lowdb(adapter);
db.defaults({ apps: [] }).write();

const ensureAppExists = (assetId: string) => {
  const app = db
    .get('apps')
    .find({ id: assetId })
    .value();
  if (!app) {
    throw new Error(`App ${assetId} doesn't exists`);
  }
  return app;
};

const validateRequiredParameters = (customFields: ICustomFieldInput[]) => {
  const requiredParams = ['unit', 'city', 'countryCode'];
  const hasAllRequiredParams = requiredParams.every(param =>
    customFields.some(customField => customField.key === param && customField.value !== ''),
  );
  if (!hasAllRequiredParams) {
    throw new Error('Missing required parameters');
  }
};

export const configExampleApp = () => {
  return APPLICATION_CONFIG;
};

export const installExampleApp = (body: IInstallInput): string => {
  validateRequiredParameters(body.customUserFields);
  const assetId = v4();
  db.get('apps')
    .push({
      id: assetId,
      name: body.name,
      customFields: body.customUserFields,
    })
    .write();
  return assetId;
};

export const updateExampleApp = (assetId: string, body: IUpdateInput): void => {
  ensureAppExists(assetId);
  validateRequiredParameters(body.customUserFields);
  db.get('apps')
    .find({ id: assetId })
    .assign({
      name: body.name,
      customFields: body.customUserFields,
    })
    .write();
};

export const uninstallExampleApp = (assetId: string): void => {
  ensureAppExists(assetId);
  db.get('apps')
    .remove({ id: assetId })
    .write();
};

export const sendExampleApp = (assetId: string, body: ISendInput): IVariableTimeSeries[] => {
  throw new Error('Not implemented');
};

export const fetchExampleApp = async (assetId: string, body: IFetchInput): Promise<IVariableTimeSeries[]> => {
  ensureAppExists(assetId);
  const app = db
    .get('apps')
    .find({ id: assetId })
    .value();
  const unit = app.customFields.find((field: ICustomFieldInput) => field.key === 'unit');
  const city = app.customFields.find((field: ICustomFieldInput) => field.key === 'city');
  const countryCode = app.customFields.find((field: ICustomFieldInput) => field.key === 'countryCode');
  if (unit && city && countryCode) {
    let apiUnit = ''; // default is Kelvin
    if (unit.value === 'C') {
      apiUnit = '&units=metric';
    } else if (unit.value === 'F') {
      apiUnit = '&units=imperial';
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value},${countryCode.value}${apiUnit}&APPID=${WEATHER_API_KEY}`;
    const weather = JSON.parse(await request.get(url));
    const now = +new Date();
    return [
      {
        variable: 'temp',
        timeSeries: [
          {
            timestamp: now,
            value: weather.main.temp,
          },
        ],
      },
      {
        variable: 'temp_min',
        timeSeries: [
          {
            timestamp: now,
            value: weather.main.temp_min,
          },
        ],
      },
      {
        variable: 'temp_max',
        timeSeries: [
          {
            timestamp: now,
            value: weather.main.temp_max,
          },
        ],
      },
      {
        variable: 'humidity',
        timeSeries: [
          {
            timestamp: now,
            value: weather.main.humidity,
          },
        ],
      },
      {
        variable: 'pressure',
        timeSeries: [
          {
            timestamp: now,
            value: weather.main.pressure,
          },
        ],
      },
      {
        variable: 'wind_speed',
        timeSeries: [
          {
            timestamp: now,
            value: weather.wind.speed,
          },
        ],
      },
      {
        variable: 'wind_way',
        timeSeries: [
          {
            timestamp: now,
            value: weather.wind.deg,
          },
        ],
      },
    ];
  }
  return [];
};

export const errorExampleApp = (body: IErrorInput): void => {
  logger.info(`Error : ${body.errorMessage} - ${body.assetId} - ${body.endpoint}`);
};
