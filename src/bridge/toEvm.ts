import type { KeyringPair } from '@polkadot/keyring/types';
import * as Sentry from '@sentry/node';
import backendConfig from '../utils/config';
import logger from '../utils/logger';
import { NodeProviderType } from '../types';

Sentry.init({
  dsn: backendConfig.sentryDns,
  tracesSampleRate: 1.0,
});

export const toEvmBridge = async (
    nodeProvider: NodeProviderType,
    pairs: KeyringPair,
    amount: number,
    recipient: string,
    destinationId: number,
  ) => {
  try {
    const provider = nodeProvider.getProvider();
    const txHash = await provider.api.tx.bridgeTransfer
        .transferNative(amount, recipient, destinationId)
        .signAndSend(pairs);
    console.log(`Bridge to evm with hash ${txHash.toHex()}`);
    return txHash
    
  } catch (error) {
    logger.error(error);
    Sentry.captureException(error);   
  }
}
