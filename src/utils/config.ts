import 'dotenv/config';

const toNumber = (defaultValue: number, value?: string): number => {
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

const defaultNodeUrls = ['ws://127.0.0.1:9944'];

export default {
  nodeUrls: process.env.NODE_PROVIDER_URLS ? JSON.parse(process.env.NODE_PROVIDER_URLS) as string[] : defaultNodeUrls,
  sentryDns: process.env.SENTRY_DNS || '',
  expectedBlockTime:  toNumber(6000, process.env.EXPECTED_BLOCK_TIME),
  networkDecimal:  toNumber(12, process.env.NETWORK_DECIMAL),
  postgresConnParams: {
    user: process.env.POSTGRES_USER || 'bridge',
    host: process.env.POSTGRES_HOST || 'bridge',
    database: process.env.POSTGRES_DATABASE || 'bridge',
    password: process.env.POSTGRES_PASSWORD || 'bridge',
    port: parseInt(process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT: "5432", 10),
  },
}
