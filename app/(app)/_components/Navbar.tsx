'use client'
import { Disclosure } from '@headlessui/react'
import { HiX, HiPlus } from 'react-icons/hi'
import Button from '@/components/Button'
import { HiBars3 } from 'react-icons/hi2'
import clsx from 'clsx'
// import Logo from '@/components/Logo'
import { useSelectedLayoutSegments } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SDGGoals from '@/constants/SDGGoals'
import AuthModal from '@/components/modal/AuthModal'
import { useWallet } from '@txnlab/use-wallet'
import ProfileFlyout from './ProfileFlyout'

const navigation = [
  { name: 'Home', href: '/', activeSegment: '(home)' },
  { name: 'Prime', href: '/prime', activeSegment: 'prime' },
  { name: 'Insight', href: '/insight', activeSegment: 'insight' },
]

export default function Navbar() {
  const segments = useSelectedLayoutSegments()
  const { activeAddress } = useWallet()
  const segment = segments[0]
  const goalId = segment === 'goals' ? segments[1] : null

  return (
    <Disclosure as='nav'>
      {({ open }) => (
        <>
          <div
            className={clsx(
              'px-2 sm:px-6 lg:px-8 fixed w-full z-50 bg-zinc-100 dark:bg-zinc-900',
              !open && 'border-b border-zinc-300 dark:border-zinc-700'
            )}
          >
            <div className='relative flex h-16 items-center justify-between max-w-screen-2xl mx-auto'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white focus-ring'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <HiX className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <HiBars3 className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <Link href='/' className='flex flex-shrink-0 items-center'>
                  {/* <Logo
                    className={clsx('h-9 w-auto', !goalId && '!fill-black dark:!fill-white')}
                    style={{
                      fill: goalId ? SDGGoals[Number(goalId) - 1].color : 'black',
                    }}
                  /> */}
                  <p
                    className={clsx('font-[Ailerons] text-xl md:text-2xl', !goalId && '!text-black dark:!text-white')}
                    style={{
                      color: goalId ? SDGGoals[Number(goalId) - 1].color : 'black',
                    }}
                  >
                    United Heaven
                  </p>
                </Link>
                <div className='hidden sm:ml-6 md:ml-10 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.activeSegment === segment
                            ? 'bg-zinc-300 dark:bg-zinc-950 text-black dark:text-white'
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.activeSegment === segment ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {activeAddress ? (
                  <>
                    <Button href='/action/create' variant='green' className='mr-4 hidden sm:block' size='sm'>
                      <div className='flex items-center '>
                        <HiPlus className='mr-2 text-lg' />
                        <p>New action</p>
                      </div>
                    </Button>

                    {/* Profile dropdown */}
                    <ProfileFlyout>
                      <div className='relative flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus-ring mt-1'>
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          className='h-8 w-8 rounded-full'
                          src='/images/defaultDP.jpeg'
                          alt=''
                          width={32}
                          height={32}
                        />
                      </div>
                    </ProfileFlyout>
                  </>
                ) : (
                  <AuthModal>
                    <Button type='button' variant='green' className='px-5'>
                      Sign in
                    </Button>
                  </AuthModal>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden pt-16'>
            <div className='space-y-1 px-2 pb-3 pt-2 border-b border-zinc-300 dark:border-zinc-700'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    item.activeSegment === segment
                      ? 'bg-zinc-300 dark:bg-zinc-950 text-black dark:text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.activeSegment === segment ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as={Button}
                variant='green'
                href='/action/create'
                className='flex items-center justify-center'
                size='sm'
              >
                <HiPlus className='mr-2 text-lg' />
                <p>New action</p>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
