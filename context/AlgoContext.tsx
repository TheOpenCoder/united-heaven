'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import algodClient from '@/lib/algodClient'
import { Txn } from '@txnlab/use-wallet'

type AssetTransferProps = {
  from?: string
  to: string
  amount: number
  assetIndex: number
}

type AssetTransferResult = Promise<{
  'confirmed-round': number
  'global-state-delta': Record<string, unknown>[]
  'pool-error': string
  txn: {
    sig: Uint8Array
    txn: Txn
  }
  txId: string
  id: string
}>

interface AlgoContextProps {
  fakeToken: number | null
  createFakeToken: () => Promise<number | null>
  assetTransfer: (_props: AssetTransferProps) => AssetTransferResult
}

const AlgoContext = createContext<AlgoContextProps | undefined>(undefined)

export const AlgoProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()
  const [fakeToken, setFakeToken] = useState<number | null>(null)

  const createToken = async () => {
    if (!activeAddress) return
    const params = await algodClient.getTransactionParams().do()
    const tokenTx = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: activeAddress,
      reserve: activeAddress,
      decimals: 6,
      defaultFrozen: false,
      total: 1_000_000_000_000,
      assetName: 'USDC',
      manager: activeAddress,
      unitName: 'USDC',
      suggestedParams: params,
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(tokenTx)
    const signedTransactions = await signTransactions([encodedTransaction])
    const token = await sendTransactions(signedTransactions, 4)
    const tokenId = Number(token['asset-index' as keyof typeof token])
    return tokenId
  }

  const createFakeToken = async () => {
    const token = (await createToken()) || null

    // store it in session storage
    sessionStorage.setItem('fakeToken', token?.toString() || 'null')

    setFakeToken(token || null)
    return token
  }

  useEffect(() => {
    // check if we have a token in session storage
    const fakeToken = sessionStorage.getItem('fakeToken')
    if (fakeToken && fakeToken !== 'null') {
      setFakeToken(Number(fakeToken))
    } else {
      setFakeToken(null)
    }
  }, [])

  const assetTransfer = async ({ from, to, amount, assetIndex }: AssetTransferProps) => {
    const params = await algodClient.getTransactionParams().do()
    const tnx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: from || activeAddress!,
      to: to,
      amount: amount,
      assetIndex: assetIndex,
      suggestedParams: { ...params },
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(tnx)
    const signedTransactions = await signTransactions([encodedTransaction])
    const result = await sendTransactions(signedTransactions, 4)
    return result
  }

  return (
    <AlgoContext.Provider
      value={{
        fakeToken,
        createFakeToken,
        assetTransfer,
      }}
    >
      {children}
    </AlgoContext.Provider>
  )
}

export const useAlgo = (): AlgoContextProps => {
  const context = useContext(AlgoContext)
  if (!context) {
    throw new Error('useAlgo must be used within a AlgoProvider')
  }
  return context
}
