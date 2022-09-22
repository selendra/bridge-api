import { createTestPairs } from '@polkadot/keyring/testingPairs';
import logger  from './utils/logger';
import backConfig from './utils/config';
import nodeProvider from './utils/nodeProvider';
import { getClient } from './utils/db';
import { toEvmBridge } from './bridge/toEvm';
import { approve, getWallet, fromEvmBridge } from './bridge/toSubstrate';

const testPairs = createTestPairs();
const alice = testPairs.alice;

const testBridge = async () => {
  const client = await getClient();
  toEvmBridge(nodeProvider, client, alice, 1, '0xff93B45308FD417dF303D6515aB04D9e89a750Ca', 4);
};

const testBridgeFrom = async () => {
  const client = await getClient();

  const privateKey = "000000000000000000000000000000000000000000000000000000616c696365";
  const wallet = getWallet(privateKey);
  const recipient = '0x667459FAF38d3d7015D1e039C88bb81406EBF5a9';

  // approve(wallet, 100);
  fromEvmBridge(client, wallet, recipient, 1);
};

Promise.resolve()
  // .then(async () => {
  //   await nodeProvider.initializeProviders();
  // })
  // .then(testBridge)
  // .then(async () => {
  //   await nodeProvider.closeProviders();
  //   logger.info('Finished');
  //   process.exit();
  // })
  .then(async () => {
    await testBridgeFrom();
  })
