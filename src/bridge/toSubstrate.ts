import { Client } from 'pg';
import * as Sentry from '@sentry/node';
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

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
  wallet: any,
  amount: number,
) => {
  const erc20Instance = new ethers.Contract(backendConfig.constractAddress.Erc20Address, backendConfig.contractABIs.Erc20Mintable.abi, wallet);
  logger.info(`Approving ${backendConfig.constractAddress.Erc20HandlerAddress} to spend ${amount} tokens from ${wallet.address}!`);
  Promise.resolve()
  .then(async () => {
    const tx = await erc20Instance.approve(backendConfig.constractAddress.Erc20HandlerAddress, expandDecimals(amount));
    await waitForTx(provider, tx.hash);
    return tx.hash;
  })
}

export const fromEvmBridge = (
  wallet: any,
  recipient: string,
  amount: number,
) => {
  const bridgeInstance = new ethers.Contract(backendConfig.constractAddress.BridgeAddress, backendConfig.contractABIs.Bridge.abi, wallet);
  const data = '0x' +
    ethers.utils.hexZeroPad(BigNumber.from(expandDecimals(amount)).toHexString(), 32).substr(2) +    // Deposit Amount        (32 bytes)
    ethers.utils.hexZeroPad(ethers.utils.hexlify((recipient.length - 2)/2), 32).substr(2) +    // len(recipientAddress) (32 bytes)
    recipient.substr(2);
  Promise.resolve()
  .then(async () => {
    logger.info(`Transfer to ${recipient} with amount ${amount} from ${wallet.address}!`);
    const tx = await bridgeInstance.deposit(backendConfig.navtiveBridgeId, backendConfig.resourceId, data);
    await waitForTx(provider, tx.hash);
    return tx.hash;
  })
}