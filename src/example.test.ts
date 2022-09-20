import { createTestPairs } from '@polkadot/keyring/testingPairs';
import logger  from './utils/logger';
import nodeProvider from './utils/nodeProvider';
import { toEvmBridge } from './bridge/toEvm';

const testPairs = createTestPairs();
const alice = testPairs.alice;

const testBridge = async () => {
  const res = await toEvmBridge(nodeProvider, alice, 1000000000000, '0xff93B45308FD417dF303D6515aB04D9e89a750Ca', 4);
};

Promise.resolve()
  .then(async () => {
    await nodeProvider.initializeProviders();
  })
  .then(testBridge)
  .then(async () => {
    await nodeProvider.closeProviders();
    logger.info('Finished');
    process.exit();
  })
