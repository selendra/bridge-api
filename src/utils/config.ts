import 'dotenv/config';

const toNumber = (defaultValue: number, value?: string): number => {
  if (!value) {
    return defaultValue;
  }
  return parseInt(value, 10);
};

const defaultNodeUrls = ['ws://127.0.0.1:9944'];
const contractPath = "../../contracts";

export default {
  nodeUrls: process.env.NODE_PROVIDER_URLS ? JSON.parse(process.env.NODE_PROVIDER_URLS) as string[] : defaultNodeUrls,
  bridgeUrl: process.env.BRIDGE_URL || 'https://ropsten.infura.io/v3/78324f11f469479a9647bd6a75567001',
  navtiveBridgeId: process.env.NATIVE_BRIDGE_ID || 1,
  bridgeId: process.env.BRIDGE_ID || 4,
  bridgeNetework: process.env.BRIDGE_NETWORK || 'Ethereum Testnet',
  sentryDns: process.env.SENTRY_DNS || '',
  expectedBlockTime:  toNumber(6000, process.env.EXPECTED_BLOCK_TIME),
  networkDecimal:  toNumber(12, process.env.NETWORK_DECIMAL),
  resourceId: process.env.RESOURCEID || '0x000000000000000000000000000000c84da63790f906342aa09d258680fc3b01',
  postgresConnParams: {
    user: process.env.POSTGRES_USER || 'bridge',
    host: process.env.POSTGRES_HOST || 'bridge',
    database: process.env.POSTGRES_DATABASE || 'bridge',
    password: process.env.POSTGRES_PASSWORD || 'bridge',
    port: parseInt(process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT: "5432", 10),
  },
  contractABIs: {
    Bridge: require(contractPath + "/Bridge.json"),
    Erc20Mintable: require(contractPath + "/ERC20Custom.json"),
  },
  constractAddress: {
    Erc20Address : process.env.ERC20_ADDRESS || '0xa804a7a42b80E52289B9FEa7101a5ad7968bF6aF',
    Erc20HandlerAddress : process.env.ERC20_HANDLER_ADDRESS || '0x667459FAF38d3d7015D1e039C88bb81406EBF5a9',
    BridgeAddress: process.env.BRIDGE_ADDRESS || '0x7cd7005DA3ea21E5BB03A4E695c191F6E041FdA4',
  }
}
