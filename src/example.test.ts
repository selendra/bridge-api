import { createTestPairs } from '@polkadot/keyring/testingPairs';
import logger  from './utils/logger';
import backConfig from './utils/config';
import nodeProvider from './utils/nodeProvider';
import { getClient } from './utils/db';
import { toEvmBridge } from './bridge/toEvm';
import { approve, getWallet } from './bridge/toSubstrate';
import { ethers, Signer } from 'ethers';

const testPairs = createTestPairs();
const alice = testPairs.alice;

const testBridge = async () => {
  const client = await getClient();
  toEvmBridge(nodeProvider, client, alice, 1, '0xff93B45308FD417dF303D6515aB04D9e89a750Ca', 4);
};

const testBridgeFrom = () => {
  const privateKey = "000000000000000000000000000000000000000000000000000000616c696365";
  const wallet = getWallet(privateKey);
  const erc20Address = '0x21605f71845f372A9ed84253d2D024B7B10999f4';
  const recipient = '0x667459FAF38d3d7015D1e039C88bb81406EBF5a9';
  approve(erc20Address, wallet, recipient, 10);
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
  .then(testBridgeFrom)
