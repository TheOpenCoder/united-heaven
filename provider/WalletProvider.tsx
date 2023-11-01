'use client'
import React from 'react'
import { PROVIDER_ID, WalletProvider as TxnLabWalletProvider, useInitializeProviders } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { NODE_URL, NODE_NETWORK, NODE_PORT, NODE_TOKEN } from '@/constants/env'

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    ],
    nodeConfig: {
      network: NODE_NETWORK,
      nodeServer: NODE_URL,
      nodePort: NODE_PORT,
      nodeToken: NODE_TOKEN,
    },
    debug: true,
  })

  return <TxnLabWalletProvider value={providers}>{children}</TxnLabWalletProvider>
}

export default WalletProvider
