import * as Sentry from '@sentry/node';
import { Client, QueryResult } from 'pg';
import { backendConfig } from './config';
import logger from './logger';

Sentry.init({
  dsn: backendConfig.sentryDSN,
  tracesSampleRate: 1.0,
});

export const getClient = async (): Promise<Client> => {
  logger.debug(
    `Connecting to DB ${backendConfig.postgresConnParams.database} at ${backendConfig.postgresConnParams.host}:${backendConfig.postgresConnParams.port}`,
  );
  const client = new Client(backendConfig.postgresConnParams);
  await client.connect();
  return client;
};

export const dbQuery = async (
  client: Client,
  sql: string,
): Promise<QueryResult<any> | null> => {
  try {
    return await client.query(sql);
  } catch (error) {
    logger.error(`SQL: ${sql} ERROR: ${JSON.stringify(error)}`);
    Sentry.captureException(error);
  }
  return null;
};

export const dbParamQuery = async (
  client: Client,
  sql: string,
  data: any[],
): Promise<QueryResult<any> | null> => {
  try {
    return await client.query(sql, data);
  } catch (error) {
    logger.error(
      `SQL: ${sql} PARAM: ${JSON.stringify(data)} ERROR: ${JSON.stringify(
        error,
      )}`,
    );
    Sentry.captureException(error);
  }
  return null;
};
