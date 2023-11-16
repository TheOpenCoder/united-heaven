import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@txnlab/use-wallet'
import { useEffect, useState } from 'react'
import algodClient from '@/lib/algodClient'
import { formatPrice } from '@/utils/common'
import { ALGO_ENV, TESTNET_USDC } from '@/constants/env'
import { useAlgo } from '@/context/AlgoContext'

export default function useWalletBalance() {
  const [walletBalance, setWalletBalance] = useState<string | null>(null)
  const [walletAvailableBalance, setWalletAvailableBalance] = useState<string | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null)

  const { activeAddress } = useWallet()
  const { fakeToken } = useAlgo()

  const getAccountInfo = async () => {
    if (!activeAddress) throw new Error('No selected account.')
    const accountInfo = await algodClient.accountInformation(activeAddress).do()

    return accountInfo
  }

  const {
    data: accountInfo,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ['balance', activeAddress],
    queryFn: getAccountInfo,
    enabled: !!activeAddress,
    refetchInterval: 30000,
  })

  useEffect(() => {
    if (accountInfo && accountInfo.amount !== undefined && accountInfo['min-balance'] !== undefined) {
      const balance = formatPrice(accountInfo.amount, false, { minimumFractionDigits: 2 })
      const availableBalance = formatPrice(accountInfo.amount - accountInfo['min-balance'], false, {
        minimumFractionDigits: 2,
      })

      if (balance !== walletBalance) {
        setWalletBalance(balance)
        return
      }

      if (parseFloat(availableBalance) < 0) {
        setWalletAvailableBalance('0.00')
        return
      }

      if (availableBalance !== walletAvailableBalance) {
        setWalletAvailableBalance(availableBalance)
        return
      }
    } else {
      setWalletBalance('0.00')
      setWalletAvailableBalance('0.00')
    }
  }, [accountInfo, walletBalance, walletAvailableBalance])

  useEffect(() => {
    if (accountInfo && accountInfo.assets !== undefined && accountInfo.assets.length > 0) {
      // loop through assets and find USDC (asset id 10458941)
      let usdc = '0.00'
      for (let i = 0; i < accountInfo.assets.length; i++) {
        if (
          ALGO_ENV === 'local'
            ? accountInfo.assets[i]['asset-id'] === fakeToken
            : accountInfo.assets[i]['asset-id'] === TESTNET_USDC
        ) {
          usdc = formatPrice(accountInfo.assets[i].amount, false, { minimumFractionDigits: 2 })
          break
        }
      }

      if (usdc !== usdcBalance) {
        setUsdcBalance(usdc)
        return
      }
    } else {
      setUsdcBalance('0.00')
    }
  }, [accountInfo, usdcBalance, fakeToken])

  return {
    data: {
      ALGOBalance: walletBalance,
      availableALGOBalance: walletAvailableBalance,
      USDCBalance: usdcBalance,
    },
    status,
    error,
    refetch,
  }
}
