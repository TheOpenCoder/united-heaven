import { AlgoClientConfig, AlgoKMDConfig } from '@/types/network'

export function getAlgodConfigFromEnvironment(): AlgoClientConfig {
  if (!process.env.NEXT_PUBLIC_ALGO_SERVER) {
    throw new Error(
      'Attempt to get default algod configuration without specifying NEXT_PUBLIC_ALGO_SERVER in the environment variables'
    )
  }

  return {
    server: process.env.NEXT_PUBLIC_ALGO_SERVER,
    port: process.env.NEXT_PUBLIC_ALGO_PORT || '',
    token: process.env.NEXT_PUBLIC_ALGO_TOKEN || '',
    network: process.env.NEXT_PUBLIC_ALGO_NETWORK || '',
  }
}

export function getIndexerConfigFromEnvironment(): AlgoClientConfig {
  if (!process.env.NEXT_PUBLIC_INDEXER_SERVER) {
    throw new Error(
      'Attempt to get default algod configuration without specifying VITE_INDEXER_SERVER in the environment variables'
    )
  }

  return {
    server: process.env.NEXT_PUBLIC_INDEXER_SERVER,
    port: process.env.NEXT_PUBLIC_INDEXER_PORT || '',
    token: process.env.NEXT_PUBLIC_INDEXER_TOKEN || '',
    network: process.env.NEXT_PUBLIC_INDEXER_NETWORK || '',
  }
}

export function getKmdConfigFromEnvironment(): AlgoKMDConfig {
  if (!process.env.NEXT_PUBLIC_KMD_SERVER) {
    throw new Error(
      'Attempt to get default kmd configuration without specifying VITE_KMD_SERVER in the environment variables'
    )
  }

  return {
    server: process.env.NEXT_PUBLIC_KMD_SERVER,
    port: process.env.NEXT_PUBLIC_KMD_PORT || 4002,
    token: process.env.NEXT_PUBLIC_KMD_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    wallet: process.env.NEXT_PUBLIC_KMD_WALLET || 'unencrypted-default-wallet',
    password: process.env.NEXT_PUBLIC_KMD_PASSWORD || '',
  }
}
