import BN from 'bn.js';
import { Client } from 'pg';
import type { KeyringPair } from '@polkadot/keyring/types';
import * as Sentry from '@sentry/node';
import { ethers } from 'ethers';

import backendConfig from '../utils/config';
import logger from '../utils/logger';
import { expandDecimals, waitForTx } from '../utils';
import { dbParamQuery, dbQuery } from '../utils/db';

Sentry.init({
  dsn: backendConfig.sentryDns,
  tracesSampleRate: 1.0,
});

const provider = new ethers.providers.JsonRpcProvider(backendConfig.bridgeUrl);

const saveToDB = async (client: Client) => { }

export const getWallet = (privateKey: string) => {
  return new ethers.Wallet(privateKey, provider);
}

export const approve = (
  erc20Address: string,
  signer: any,
  recipient: string,
  amount: number,
) => {
  const erc20Instance = new ethers.Contract(erc20Address, backendConfig.contractABIs.Erc20Mintable.abi, signer);
  logger.info(`Approving ${recipient} to spend ${amount} tokens from ${signer.address}!`);
  Promise.resolve()
  .then(async () => {
    const tx = await erc20Instance.approve(recipient, expandDecimals(amount));
    await waitForTx(provider, tx.hash)
  })
}