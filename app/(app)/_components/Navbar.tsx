'use client'
import { HiPlus } from 'react-icons/hi'
import Button from '@/components/Button'
import clsx from 'clsx'
import { useSelectedLayoutSegments } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SDGGoals from '@/constants/SDGGoals'
import AuthModal from '@/components/modal/AuthModal'
import { useWallet } from '@txnlab/use-wallet'
import ProfileFlyout from './ProfileFlyout'

export default function Navbar() {
  const segments = useSelectedLayoutSegments()
  const { activeAddress } = useWallet()
  const segment = segments[0]
  const goalId = segment === 'goals' ? segments[1] : null

  return (
    <div className='px-4 sm:px-6 lg:px-8 fixed w-full z-50 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700'>
      <div className='relative flex h-16 items-center justify-between max-w-screen-2xl mx-auto'>
        <Link href='/' className='flex flex-shrink-0 items-center'>
          <p
            className={clsx('font-ailerons text-xl md:text-2xl', !goalId && '!text-black dark:!text-white')}
            style={{
              color: goalId ? SDGGoals[Number(goalId) - 1].color : 'black',
            }}
          >
            United Heaven
          </p>
        </Link>

        <div className='flex items-center'>
          {activeAddress ? (
            <>
              <Button href='/action/create' variant='green' className='mr-5 md:mr-6' size='sm'>
                <div className='flex items-center '>
                  <HiPlus className='text-md md:text-lg' />
                  <p className='ml-2 text-xs md:text-sm'>New action</p>
                </div>
              </Button>

              {/* Profile dropdown */}
              <ProfileFlyout>
                <div className='relative flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus-ring mt-1'>
                  <span className='sr-only'>Open user menu</span>
                  <Image className='h-8 w-8 rounded-full' src='/images/defaultDP.jpeg' alt='' width={32} height={32} />
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
  )
}
