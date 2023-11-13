'use client'
import React from 'react'
import {
  PROVIDER_ID,
  WalletProvider as TxnLabWalletProvider,
  useInitializeProviders,
  ProvidersArray,
} from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { getAlgodConfigFromEnvironment } from '@/utils/network'
import algosdk from 'algosdk'

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const algodConfig = getAlgodConfigFromEnvironment()
  let providersArray: ProvidersArray

  if (algodConfig.network === '') {
    providersArray = [{ id: PROVIDER_ID.KMD }]
  } else {
    providersArray = [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    ]
  }

  const providers = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    debug: true,
    algosdkStatic: algosdk,
  })

  return <TxnLabWalletProvider value={providers}>{children}</TxnLabWalletProvider>
}

export default WalletProvider
