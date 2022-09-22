import type { KeyringPair } from '@polkadot/keyring/types';
import * as Sentry from '@sentry/node';
import BN from 'bn.js';
import { Client } from 'pg';
import backendConfig from '../utils/config';
import logger from '../utils/logger';
import { dbParamQuery, dbQuery } from '../utils/db';
import { NodeProviderType } from '../types';

Sentry.init({
  dsn: backendConfig.sentryDns,
  tracesSampleRate: 1.0,
});

const saveToDB = async (
  nodeProvider: NodeProviderType,
  client: Client,
  blockHash: string,
  sender: string,
  recipient: string,
  amount: BN,
  chainId: number,
) => {
  const provider = nodeProvider.getProvider();
  const derivedBlock = await provider.api.derive.chain.getBlock(blockHash);

  const blockNumber = derivedBlock?.block.header.number.toNumber()? derivedBlock?.block.header.number.toNumber() : 0 ;
  const timestamp = new Date((await provider.api.query.timestamp.now.at(blockHash)).toJSON()).toUTCString();

  const data = [
    blockNumber,
    blockHash,
    amount.toString(),
    sender,
    recipient,
    chainId,
    timestamp
  ];

  const sql = `INSERT INTO toEvmBridge (
    blockNumber,
    blockHash,
    amount,
    sender,
    recipient,
    chainId,
    timestamp
  )VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
  );`;
  try {
    await dbParamQuery(client, sql, data);
  } catch (error){
    logger.error(error);
    Sentry.captureException(error); 
  }
}

export const toEvmBridge = (
    nodeProvider: NodeProviderType,
    client: Client,
    pairs: KeyringPair,
    amount: number,
    recipient: string,
    chainId: number,
  ) => {
  try {
    const provider = nodeProvider.getProvider();
    const transferAmount = new BN(amount * Math.pow(10, backendConfig.networkDecimal));

    Promise.resolve()
      .then(async () => {
        await provider.api.tx.bridgeTransfer
          .transferNative(transferAmount, recipient, chainId)
          .signAndSend(pairs, async ({ status }) => {
            if (status.isInBlock || status.isFinalized) {
              logger.info('Transaction in block')
              const blockHash = JSON.parse(status.toString())['inBlock'];

              logger.info('Save bridge event to db');
              await saveToDB(nodeProvider, client, blockHash, pairs.address, recipient, transferAmount, chainId);
            }
    });
      })
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);   
  }
}


