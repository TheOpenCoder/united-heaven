'use client'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from '../Button'
import Image from 'next/image'
import axios from 'axios'
import { useWallet } from '@txnlab/use-wallet'
import { API_URL } from '@/constants/env'
import toast from 'react-hot-toast'
import algosdk from 'algosdk'
import { getActionClient } from '@/lib/actionClient'
import { convertAlgosToMicroalgos } from '@/utils/convert'
import { ALGO_ENV, TESTNET_USDC } from '@/constants/env'
import { useAlgo } from '@/context/AlgoContext'
import { microAlgos } from '@algorandfoundation/algokit-utils'
import ResizableTextarea from '../ResizableTextarea'
import { revalidateActionById } from '@/app/actions'

const WithdrawModal = ({
  children,
  manualOpen,
  setManualOpen,
  currentAmount,
  actionId,
  contractId,
}: {
  children?: React.ReactNode
  manualOpen?: boolean
  setManualOpen?: (_open: boolean) => void
  currentAmount: number
  actionId: string
  contractId: string
}) => {
  // Default withdraw amount. It will be 1% of the currentAmount but in the nearest 5s
  const defaultWithdraw = Math.ceil(currentAmount / 100 / 5) * 5
  const cancelButtonRef = useRef(null)
  const [open, setOpenState] = useState<boolean>(false)
  const [withdrawAmount, setWithdrawAmount] = useState(defaultWithdraw)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }
  const { fakeToken } = useAlgo()
  const assetToken = ALGO_ENV === 'local' ? fakeToken : TESTNET_USDC

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

  const handleWithdraw = async () => {
    if (!withdrawAmount) {
      toast.error('Withdraw amount cannot be empty')
      return
    }

    if (!message) {
      toast.error('Message cannot be empty')
      return
    }

    setLoading(true)

    try {
      const currentUnixTimestamp = Math.floor(new Date().getTime() / 1000)
      const encodedTimestamp = algosdk.encodeUint64(currentUnixTimestamp)

      const prefix = Buffer.from('dr') // Prefix for the box
      const name = new Uint8Array(Buffer.concat([prefix, Buffer.from(encodedTimestamp)]))

      const boxRef: algosdk.BoxReference[] = [
        {
          appIndex: Number(contractId),
          name: name,
        },
      ]

      const actionClient = await getActionClient({
        appId: Number(contractId),
        sender,
      })

      await actionClient.dispense(
        {
          amount: convertAlgosToMicroalgos(withdrawAmount),
          description: 'test dispense',
          id: currentUnixTimestamp,
          transferToken: Number(assetToken),
        },
        {
          sendParams: {
            fee: microAlgos(2_000),
          },
          boxes: boxRef,
        }
      )

      await axios.post(`${API_URL}/actions/${actionId}/withdraw`, {
        amount: withdrawAmount,
        message,
      })

      await revalidateActionById(actionId)

      toast.success('Withdrawn successfully')
    } catch (err: any) {
      console.log(err)

      toast.error(err.response.data.error || err.message || 'Failed to withdraw')
    } finally {
      setLoading(false)
      setOpen(false)
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
                  <div className='pb-10 pt-3 md:py-10 px-8'>
                    <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-semibold leading-6 mt-8 md:mt-0'>
                      Withdraw
                    </Dialog.Title>

                    <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
                      Withdraw from donations of{' '}
                      <span className='font-bold text-emerald-600'> Clean Marina Beach on 12 dec morning</span>
                    </p>

                    <div className='mt-10 mb-6 text-sm font-bold'>
                      <p className='mr-4 max-sm:mb-10'>
                        <span className='text-3xl'>{currentAmount} </span>
                        <span className='text-xl'>USDC </span>
                        <span className='text-zinc-500 dark:text-zinc-400'>
                          <span>available to withdraw</span>
                        </span>
                      </p>
                    </div>
                    <div className='space-y-8'>
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
                          disabled={loading}
                          onKeyDown={(e) => {
                            // accept only numbers and not - or + or e or E or . or , or special characters
                            const re = /^[0-9\b]+$/

                            if (!re.test(e.key) && e.key !== 'Backspace') {
                              e.preventDefault()
                            }
                          }}
                          value={withdrawAmount}
                          onChange={(e) => {
                            const maxDigits = 15
                            const value = e.target.value

                            if (Number(value) > currentAmount) {
                              setWithdrawAmount(currentAmount)
                              return
                            }

                            if (value === '' || value.length <= maxDigits) {
                              setWithdrawAmount(Number(value))
                            }
                          }}
                          required
                          className='input-ui !pl-10 !rounded-sm'
                          placeholder='How much do you want to raise in USDC?'
                        />
                      </div>
                      <div>
                        <ResizableTextarea
                          name='message'
                          id='message'
                          value={message}
                          onChange={(e) => {
                            // max 200 characters
                            const maxChars = 200
                            const value = e.target.value

                            if (value.length > maxChars) {
                              return
                            }

                            setMessage(value)
                          }}
                          className='min-h-[128px] resize-none input-ui'
                          placeholder='Write a message to the donors'
                        />
                        <p className='mt-2 text-xs text-gray-500'>
                          {`Provide short message for your withdrawal within ${200 - message.length} characters.`}
                        </p>
                      </div>
                      <div className='flex justify-end'>
                        <Button
                          className='shrink-0 py-3 w-full sm:w-1/3 text-xs rounded-sm'
                          onClick={handleWithdraw}
                          disabled={loading}
                        >
                          {loading ? (
                            <div className='flex items-center justify-center'>
                              <div className='w-4 h-4 mr-2 border-2 border-t-2 rounded-full animate-spin' />
                              <p>Withdrawing...</p>
                            </div>
                          ) : (
                            `Withdraw ${withdrawAmount} USDC`
                          )}
                        </Button>
                      </div>
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

export default WithdrawModal
