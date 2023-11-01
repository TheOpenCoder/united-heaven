'use client'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useWallet, Provider, PROVIDER_ID } from '@txnlab/use-wallet'
import { HiX } from 'react-icons/hi'
import Image from 'next/image'

const subText: Partial<Record<PROVIDER_ID, string>> = {
  pera: 'Popular',
}

const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { providers } = useWallet()

  const isKmd = (provider: Provider) => provider.metadata.name.toLowerCase() === 'kmd'

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
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
                  <div className='pt-14'>
                    <div className='text-center px-8'>
                      <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-semibold leading-6 mt-4 sm:mt-0'>
                        Connect your wallet
                      </Dialog.Title>
                      <div className='mt-3'>
                        <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                          If you don&apos;t have a wallet, you can select a provider and create one now.
                        </p>
                      </div>
                    </div>

                    <div className='mt-10'>
                      {providers?.map((provider) => (
                        <button
                          className='flex justify-between hover:bg-zinc-200 dark:hover:bg-zinc-800 w-full items-center py-4 px-8 focus-visible-ring'
                          key={`provider-${provider.metadata.id}`}
                          onClick={() => {
                            return provider.connect()
                          }}
                        >
                          <div className='flex items-center'>
                            {!isKmd(provider) && (
                              <Image
                                alt={`wallet_icon_${provider.metadata.id}`}
                                src={provider.metadata.icon}
                                className='object-cover'
                                width={40}
                                height={40}
                              />
                            )}
                            <p className='ml-4'>{isKmd(provider) ? 'LocalNet Wallet' : provider.metadata.name}</p>
                          </div>

                          {subText[provider.metadata.id] && (
                            <p className='text-sm text-zinc-500 dark:text-zinc-400'>{subText[provider.metadata.id]}</p>
                          )}
                        </button>
                      ))}
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

export default AuthModal
