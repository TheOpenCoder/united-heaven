'use client'
import { Fragment, useRef, useState, useEffect, useLayoutEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button'
import Image from 'next/image'
import axios from 'axios'
import { API_URL } from '@/constants/env'
import toast from 'react-hot-toast'
import { getActionClient } from '@/lib/actionClient'
import { useWallet } from '@txnlab/use-wallet'
import { convertAlgosToMicroalgos, convertMicroalgosToAlgos } from '@/utils/convert'
import algodClient from '@/lib/algodClient'
import algosdk, { decodeAddress } from 'algosdk'
import { TESTNET_USDC, ALGO_ENV } from '@/constants/env'
import { useAlgo } from '@/context/AlgoContext'
import { calculateDaysToGo } from '@/utils/date'

const DonateModal = ({
  children,
  manualOpen,
  setManualOpen,
  setDonated,
  id,
  contractId,
  endDate,
  totalDonationAmount,
  setDonationsCount,
}: {
  children?: React.ReactNode
  manualOpen?: boolean
  setManualOpen?: (_open: boolean) => void
  setDonated: (_donated: boolean) => void
  id: string
  contractId: string
  endDate: string
  totalDonationAmount: number
  setDonationsCount: (_donationsCount: number) => void
}) => {
  const goal = 1000
  // Default donation amount. It will be 1% of the goal but in the nearest 5s
  const defaultDonation = Math.ceil(goal / 100 / 5) * 5
  const cancelButtonRef = useRef(null)
  const [open, setOpenState] = useState<boolean>(false)
  const [donationAmount, setDonationAmount] = useState(defaultDonation)
  const [loading, setLoading] = useState(false)
  const { activeAddress, signer, getAssets } = useWallet()
  const { fakeToken, assetTransfer } = useAlgo()
  const [userToken, setUserToken] = useState<number | null>(null)
  const sender = { signer, addr: activeAddress! }
  const assetToken = ALGO_ENV === 'local' ? fakeToken : TESTNET_USDC
  const daysToGo = calculateDaysToGo(endDate)

  const setOpen = (state: boolean) => {
    setOpenState(state)
    if (setManualOpen) {
      setManualOpen(state)
    }
  }

  useEffect(() => {
    if (typeof manualOpen !== 'undefined') {
      setOpenState(manualOpen)
    }
  }, [manualOpen])

  useLayoutEffect(() => {
    if (!activeAddress) return

    const checkUserAsa = async () => {
      const assets = await getAssets()
      const userAsset = assets.find((asset) => asset['asset-id'] === Number(assetToken))
      if (userAsset) {
        setUserToken(convertMicroalgosToAlgos(userAsset.amount))
      } else {
        setUserToken(null)
      }

      console.log('assets', assets)
      console.log('userAsset', userAsset)
    }
    checkUserAsa()
  }, [activeAddress, getAssets, assetToken])

  const handleDonate = async () => {
    setLoading(true)
    try {
      const actionClient = getActionClient({
        sender,
        appId: Number(contractId),
      })

      const params = await algodClient.getTransactionParams().do()
      const contractAddress = await algosdk.getApplicationAddress(Number(contractId))

      if (!assetToken || !activeAddress) throw new Error('No active address')
      if (userToken! < donationAmount) throw new Error('Not enough USDC')

      const donationTnx = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: contractAddress,
        amount: convertAlgosToMicroalgos(donationAmount),
        assetIndex: Number(assetToken),
        suggestedParams: params,
      })

      const boxRef: algosdk.BoxReference[] = [
        {
          appIndex: Number(contractId),
          name: decodeAddress(activeAddress).publicKey,
        },
      ]

      await actionClient.donate(
        {
          donation: donationTnx,
        },
        {
          boxes: boxRef,
        }
      )

      await axios.post(`${API_URL}/actions/${id}/donate`, {
        amount: donationAmount,
      })

      setDonated(true)
      setDonationsCount(totalDonationAmount + donationAmount)
    } catch (err: any) {
      toast.error(err.response.data.error || err.message || 'Failed to donate')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const optInToASA = async () => {
    setLoading(true)
    try {
      await assetTransfer({
        to: activeAddress!,
        amount: 0,
        assetIndex: Number(assetToken),
      })
    } catch (err: any) {
      console.log(err)
      toast.error('Failed to opt in to USDC')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {children && <div onClick={() => setOpen(true)}>{children}</div>}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-zinc-300/90 dark:bg-zinc-950/90 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl'>
                  {userToken && (
                    <div className='flex items-center space-x-2 p-1.5 px-3 rounded-md bg-zinc-200 dark:bg-zinc-800 w-fit absolute top-4 right-4'>
                      <Image
                        className='h-5 w-5'
                        src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026'
                        alt=''
                        width={24}
                        height={24}
                      />
                      <p>
                        <span className='font-semibold'>{userToken}</span>
                        <span className='text-sm'> USDC</span>
                      </p>
                    </div>
                  )}
                  <div className='pb-10 pt-3 md:py-10 px-8'>
                    <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-semibold leading-6 mt-8 md:mt-0'>
                      Donate
                    </Dialog.Title>

                    <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
                      Donate for
                      <span className='font-bold text-emerald-600'> Clean Marina Beach on 12 dec morning</span>
                    </p>

                    <div className='mt-10 mb-6 text-sm font-bold'>
                      <p className='mr-4 max-sm:mb-10'>
                        <span className='text-3xl'>{totalDonationAmount} </span>
                        <span className='text-xl'>USDC </span>
                        <span className='text-zinc-500 dark:text-zinc-400'>
                          <span>raised of {goal} </span>
                          <span className='text-xs'>USDC </span>
                          <span>goal</span>
                        </span>
                      </p>
                      <div className='h-3 w-full rounded-full my-3 bg-zinc-200 dark:bg-zinc-800 relative'>
                        {totalDonationAmount + donationAmount > goal && (
                          <p className='text-emerald-600 absolute right-0 bottom-full text-2xl font-bold mb-1'>+</p>
                        )}

                        <div
                          className=' bg-emerald-600 h-3 rounded-full absolute left-0 top-0 z-20'
                          style={{
                            width: `${Math.min((totalDonationAmount / goal) * 100, 100)}%`,
                          }}
                        />
                        <div
                          className=' bg-emerald-700 h-3 rounded-full absolute left-0 top-0 z-10'
                          style={{
                            width: `${Math.min(((totalDonationAmount + donationAmount) / goal) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <div className='flex items-center justify-end'>
                        {/* <p>
                          <span>{totalDonations} </span>
                          <span className='text-zinc-500 dark:text-zinc-400 text-xs'>Donations</span>
                        </p> */}
                        {daysToGo > 0 ? (
                          <p>
                            <span>{daysToGo} </span>
                            <span className='text-xs text-zinc-500 dark:text-zinc-400'>days to go</span>
                          </p>
                        ) : (
                          <p className='text-emerald-600'>Completed</p>
                        )}
                      </div>
                    </div>
                    <div className='flex max-sm:flex-col items-center justify-between max-sm:space-y-6 sm:space-x-8'>
                      <div className='relative w-full'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <Image
                            className='h-5 w-5'
                            src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026'
                            alt=''
                            width={24}
                            height={24}
                          />
                        </div>

                        <input
                          type='text'
                          name='amountToRaise'
                          id='amountToRaise'
                          disabled={loading || !userToken || daysToGo <= 0}
                          onKeyDown={(e) => {
                            // accept only numbers and not - or + or e or E or . or , or special characters
                            const re = /^[0-9\b]+$/

                            if (!re.test(e.key) && e.key !== 'Backspace') {
                              e.preventDefault()
                            }
                          }}
                          value={donationAmount}
                          onChange={(e) => {
                            const maxDigits = 15
                            const value = e.target.value

                            if (userToken && Number(value) > userToken) {
                              setDonationAmount(userToken)
                              return
                            }

                            if (value === '' || value.length <= maxDigits) {
                              setDonationAmount(Number(value))
                            }
                          }}
                          required
                          className='input-ui !pl-10 !rounded-sm'
                          placeholder='How much do you want to raise in USDC?'
                        />
                      </div>
                      {userToken ? (
                        <Button
                          className='shrink-0 py-3 w-full sm:w-1/3 text-xs rounded-sm'
                          onClick={handleDonate}
                          disabled={loading || daysToGo <= 0}
                        >
                          {loading ? (
                            <div className='flex items-center justify-center'>
                              <div className='w-4 h-4 mr-2 border-2 border-t-2 rounded-full animate-spin' />
                              <p>Donating...</p>
                            </div>
                          ) : (
                            `Donate ${donationAmount} USDC`
                          )}
                        </Button>
                      ) : (
                        <Button
                          className='shrink-0 py-3 w-full sm:w-1/3 text-xs rounded-sm'
                          onClick={optInToASA}
                          disabled={loading}
                        >
                          {loading ? (
                            <div className='flex items-center justify-center'>
                              <div className='w-4 h-4 mr-2 border-2 border-t-2 rounded-full animate-spin' />
                              <p>Opting in to USDC...</p>
                            </div>
                          ) : (
                            'Opt in to USDC'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default DonateModal
