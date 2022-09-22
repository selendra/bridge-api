import { ethers } from 'ethers';
import logger from './logger';
import backendConfig from './config';
import { decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';

export const toHex = (address: string) => {
  const publicKey = decodeAddress(address);
  return u8aToHex(publicKey);
}

export const wait = async (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export const max = (...args: number[]): number => {
  if (args.length === 0) {
    throw new Error('Given array is empty!');
  }
  return args.reduce(
    (prev, current) => (prev > current ? prev : current),
    args[0],
  );
}

export const promiseWithTimeout = <T>(
  promise: Promise<T>,
  ms: number,
  timeoutError = new Error('Promise timed out'),
): Promise<T> => {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(timeoutError);
    }, ms);
  });

  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const waitForTx = async (provider: any, hash: string) => {
  logger.info(`Waiting for tx: ${hash}...`)
  while (!await provider.getTransactionReceipt(hash)) {
      sleep(5000)
  }
}

export const expandDecimals = (amount: number, decimals = backendConfig.networkDecimal) => {
  return ethers.utils.parseUnits(String(amount), decimals);
}