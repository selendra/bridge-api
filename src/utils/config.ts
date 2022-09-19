// @ts-check
require('dotenv').config();

export const backendConfig = {
  wsProviderUrl: process.env.WS_PROVIDER_URL || 'ws://substrate-node:9944',
  postgresConnParams: {
    user: process.env.POSTGRES_USER || 'bridge',
    host: process.env.POSTGRES_HOST || 'bridge',
    database: process.env.POSTGRES_DATABASE || 'bridge',
    password: process.env.POSTGRES_PASSWORD || 'bridge',
    port: parseInt(process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT: "5432", 10),
  },
  logLevel: process.env.LOG_LEVEL || 'info',
  sentryDSN: process.env.SENTRY_DSN || '',
};
