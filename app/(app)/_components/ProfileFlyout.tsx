'use client'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useWallet } from '@txnlab/use-wallet'
import { ellipseAddress } from '@/utils/common'
import Link from 'next/link'
import Image from 'next/image'
import useWalletBalance from '@/hooks/useWalletBalance'

const ProfileFlyout = ({ children }: { children: React.ReactNode }) => {
  const { activeAddress, providers } = useWallet()

  const { data } = useWalletBalance()

  return (
    <Popover className='relative'>
      <Popover.Button>{children}</Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute right-0 z-10 mt-2 -mr-1 flex w-screen max-w-max'>
          <div className='w-screen max-w-xs md:max-w-sm flex-auto overflow-hidden rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm leading-6 shadow-xl ring-1 ring-gray-900/5'>
            <div>
              <Link href={'/profile'} className='group block flex-shrink-0 hover:bg-zinc-50 dark:hover:bg-zinc-700 p-6'>
                <div className='flex items-center'>
                  <div>
                    <Image
                      className='inline-block h-12 w-12 rounded-full'
                      src='/images/defaultDP.jpeg'
                      alt=''
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium'>{ellipseAddress(activeAddress)}</p>
                    <p className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>View profile</p>
                  </div>
                </div>
              </Link>
              <div className='border-t mx-4 border-gray-200 dark:border-zinc-900' />
              <div className='p-6 space-y-4'>
                <div className='flex items-center'>
                  <div className='h-10 w-10 flex items-center justify-center bg-white rounded-full'>
                    <Image
                      className='inline-block h-6 w-6 rounded-full '
                      src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026'
                      alt=''
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className='ml-3'>
                    <p className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>USD Coin</p>
                    <p className='text-sm font-medium '>{data?.USDCBalance} USDC</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='h-10 w-10 flex items-center justify-center bg-white rounded-full'>
                    <Image
                      className='inline-block h-6 w-6 rounded-full '
                      src='https://cryptologos.cc/logos/algorand-algo-logo.png?v=026'
                      alt=''
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className='ml-3'>
                    <p className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>Algorand</p>
                    <p className='text-sm font-medium '>{data?.ALGOBalance} ALGO</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-4'>
              <ul role='list'>
                <Link
                  href='/profile'
                  className='hover:bg-zinc-200 dark:hover:bg-zinc-900 block font-semibold px-6 py-2 text-sm text-gray-700 dark:text-zinc-200'
                >
                  Edit Profile
                </Link>
                <Link
                  href='/profile'
                  className='hover:bg-zinc-200 dark:hover:bg-zinc-900 block font-semibold px-6 py-2 text-sm text-gray-700 dark:text-zinc-200'
                >
                  Settings
                </Link>
                <button
                  className='hover:bg-red-100 dark:hover:bg-red-950/50 block font-semibold px-6 py-2 text-sm text-red-700 dark:text-red-500 w-full text-left'
                  onClick={() => {
                    if (providers) {
                      const activeProvider = providers.find((p) => p.isActive)
                      if (activeProvider) {
                        activeProvider.disconnect()
                      } else {
                        // Required for logout/cleanup of inactive providers
                        // For instance, when you login to localnet wallet and switch network
                        // to testnet/mainnet or vice verse.
                        localStorage.removeItem('txnlab-use-wallet')
                        window.location.reload()
                      }
                    }
                  }}
                >
                  Sign out
                </button>
              </ul>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default ProfileFlyout
