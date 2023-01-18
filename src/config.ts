import { ApplicationMode, IApplication } from './types';

export const API_KEY = process.env.API_KEY || 'YWRtaW46YWRtaW4=';
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '3da1336049dac5d90ac46441281398cc';
export const APPLICATION_CONFIG: IApplication = {
  name: 'Weather',
  type: 'Forecast',
  version: '0.0.7',
  description: 'Get min/max/current temperature, humidity, pressure and wind for a location.',
  mode: ApplicationMode.FETCH,
  backgroundColor: '#0099ff',
  allowEditVariables: true,
  isCustomerAllowed: true,
  minSelectVariables: 0,
  maxSelectVariables: 0,
  customUserFields: [
    {
      type: 'text',
      key: 'unit',
      displayName: 'Unit (F, C or K)',
      required: true,
    },
    {
      type: 'text',
      key: 'city',
      displayName: 'City',
      required: true,
    },
    {
      type: 'text',
      key: 'countryCode',
      displayName: 'Country code (FR, DE, ...)',
      required: true,
    },
  ],
};
