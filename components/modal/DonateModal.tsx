'use client'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'
import Button from '../Button'
import Image from 'next/image'

const DonateModal = ({
  children,
  manualOpen,
  setManualOpen,
}: {
  children?: React.ReactNode
  manualOpen?: boolean
  setManualOpen?: (_open: boolean) => void
}) => {
  const totalDonation = 624
  const goal = 1000
  // Default donation amount. It will be 1% of the goal but in the nearest 5s
  const defaultDonation = Math.ceil(goal / 100 / 5) * 5
  const cancelButtonRef = useRef(null)
  const [open, setOpenState] = useState<boolean>(false)
  const [donationAmount, setDonationAmount] = useState(defaultDonation)

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
                  <HiX
                    className='hidden sm:block absolute top-6 right-6 hover:text-zinc-500 dark:hover:text-zinc-400  cursor-pointer text-2xl'
                    onClick={() => setOpen(false)}
                  />
                  <div className='pb-10 pt-3 md:py-10 px-8'>
                    <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-semibold leading-6 mt-4 sm:mt-0'>
                      Donate
                    </Dialog.Title>
                    <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
                      Donate for
                      <span className='font-bold text-emerald-600'> Clean Marina Beach on 12 dec morning</span>
                    </p>

                    <div className='mt-10 mb-6 text-sm font-bold'>
                      <p className='mr-4 max-sm:mb-10'>
                        <span className='text-3xl'>{totalDonation} </span>
                        <span className='text-xl'>USDC </span>
                        <span className='text-zinc-500 dark:text-zinc-400'>
                          <span>raised of {goal} </span>
                          <span className='text-xs'>USDC </span>
                          <span>goal</span>
                        </span>
                      </p>
                      <div className='h-3 w-full rounded-full my-3 bg-zinc-200 dark:bg-zinc-800 relative'>
                        {totalDonation + donationAmount > goal && (
                          <p className='text-emerald-600 absolute right-0 bottom-full text-2xl font-bold mb-1'>+</p>
                        )}
                        <div
                          className=' bg-emerald-600 h-3 rounded-full absolute left-0 top-0'
                          style={{
                            width: `${Math.min(((totalDonation + donationAmount) / goal) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <div className='flex items-center justify-between'>
                        <p>
                          <span>8 </span>
                          <span className='text-zinc-500 dark:text-zinc-400 text-xs'>Donations</span>
                        </p>
                        <p>
                          <span>14 </span>
                          <span className='text-xs text-zinc-500 dark:text-zinc-400'>days to go</span>
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center justify-between space-x-8'>
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
                            if (value === '' || value.length <= maxDigits) {
                              setDonationAmount(Number(value))
                            }
                          }}
                          required
                          className='input-ui !pl-10 !rounded-sm'
                          placeholder='How much do you want to raise in USDC?'
                        />
                      </div>
                      <Button className='shrink-0 py-3 w-1/3 text-xs rounded-sm'>Donate {donationAmount} USDC</Button>
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
