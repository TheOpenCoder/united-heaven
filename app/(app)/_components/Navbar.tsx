'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'
import Button from '@/components/Button'
import { HiBars3 } from 'react-icons/hi2'
import clsx from 'clsx'
import Logo from '@/components/Logo'
import { useSelectedLayoutSegments } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CgDarkMode } from 'react-icons/cg'
import SDGGoals from '@/constants/SDGGoals'
import { useColorMode } from '@/context/ColorModeContext'

const navigation = [
  { name: 'Home', href: '/', activeSegment: '(home)' },
  { name: 'Prime', href: '/prime', activeSegment: 'prime' },
  { name: 'Insight', href: '/insight', activeSegment: 'insight' },
  { name: 'Donate us', href: 'https://www.buymeacoffee.com/unitedheaven', external: true },
]

export default function Navbar() {
  const segments = useSelectedLayoutSegments()
  const { toggleColorMode } = useColorMode()
  const segment = segments[0]
  const goalId = segment === 'goals' ? segments[1] : null

  const isAuthenticated = true

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
                  <Logo
                    className={clsx('h-9 w-auto', !goalId && '!fill-black dark:!fill-white')}
                    style={{
                      fill: goalId ? SDGGoals[Number(goalId) - 1].color : 'black',
                    }}
                  />
                  {/* <p
                    className={clsx(
                      'font-[Ailerons] text-2xl ml-4 hidden md:block',
                      !goalId && '!text-black dark:!text-white'
                    )}
                    style={{
                      color: goalId ? SDGGoals[Number(goalId) - 1].color : 'black'
                    }}
                  >
                    United Heaven
                  </p> */}
                </Link>
                <div className='hidden sm:ml-6 md:ml-10 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.external ? '_blank' : '_self'}
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
                {isAuthenticated ? (
                  <>
                    <button
                      type='button'
                      onClick={toggleColorMode}
                      className='relative rounded-full bg-zinc-200 dark:bg-zinc-950 p-1 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white focus-visible-ring'
                    >
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>View notifications</span>
                      <CgDarkMode className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3'>
                      <div>
                        <Menu.Button className='relative flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus-ring'>
                          <span className='absolute -inset-1.5' />
                          <span className='sr-only'>Open user menu</span>
                          <Image
                            className='h-8 w-8 rounded-full'
                            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                            alt=''
                            width={32}
                            height={32}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-black py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href='/profile'
                                className={clsx(
                                  active ? 'bg-zinc-100 dark:bg-zinc-900' : '',
                                  'block px-4 py-2 text-sm text-gray-700 dark:text-zinc-200'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href='/settings'
                                className={clsx(
                                  active ? 'bg-zinc-100 dark:bg-zinc-900' : '',
                                  'block px-4 py-2 text-sm text-gray-700 dark:text-zinc-200'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href='#'
                                className={clsx(
                                  active ? 'bg-zinc-100 dark:bg-zinc-900' : '',
                                  'block px-4 py-2 text-sm text-gray-700 dark:text-zinc-200'
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <Button type='button' variant='green' className='px-5'>
                    Sign in
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2 border-b border-zinc-300 dark:border-zinc-700'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  target={item.external ? '_blank' : '_self'}
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
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
