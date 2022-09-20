import { Provider } from '@selendra/selendra_evm';

export type { AccountId, Balance, BlockNumber } from '@selendra/types/interfaces/runtime';

export interface NodeProviderType {
    getProvider(): Provider;
    initializeProviders(): Promise<void>;
    closeProviders(): Promise<void>;
    restartNodeProviders(): Promise<void>;
}