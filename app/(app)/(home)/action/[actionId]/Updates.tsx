import Image from 'next/image'
import clsx from 'clsx'
import ScrollToUpdates from './ScrollToUpdates'
import UpdateInput from './UpdateInput'
import type { withdrawals, progress, creator } from '@/types/action'
import { formatDateToRelativeTime } from '@/utils/date'

type combined =
  | {
      amount: number
      message: string
      date: string
      type: 'withdrawal'
    }
  | {
      message: string
      date: string
      type: 'progress'
    }

const Updates = ({
  withdrawals,
  progress,
  creator,
  currentAmount,
  isCreator,
  id,
  contractId,
}: {
  withdrawals: withdrawals[]
  progress: progress[]
  creator: creator
  currentAmount: number
  isCreator: boolean
  id: string
  contractId: string
}) => {
  const withdraw = withdrawals.map((withdrawal: any) => ({ ...withdrawal, type: 'withdrawal' }))
  const prog = progress.map((prog: any) => ({ ...prog, type: 'progress' }))
  const combined: combined[] = [...withdraw, ...prog]
  combined.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  return (
    <div>
      {isCreator && <UpdateInput currentAmount={currentAmount} actionId={id} contractId={contractId} />}
      <h3 className='text-lg sm:text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100 px-4'>Updates</h3>
      <ScrollToUpdates />
      {combined.length === 0 && (
        <div className='flex items-center justify-center h-64'>
          <p className='text-zinc-500 dark:text-zinc-400'>No updates yet</p>
        </div>
      )}
      <ul role='list' className='space-y-10 px-4'>
        {combined.reverse().map((activityItem, activityItemIdx) => (
          <li key={activityItemIdx} className='relative flex gap-x-4'>
            <div
              className={clsx(
                activityItemIdx === combined.length - 1 ? 'h-6' : '-bottom-10',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className='w-px bg-zinc-300 dark:bg-zinc-700' />
            </div>
            <>
              <Image
                src={'/images/defaultDP.jpeg'}
                alt=''
                className='relative h-6 w-6 flex-none rounded-full bg-zinc-50 dark:bg-zinc-950'
                width={24}
                height={24}
              />
              <div className='flex-auto'>
                <div className='flex justify-between gap-x-4'>
                  <div className='py-0.5 text-sm leading-5 text-zinc-500'>
                    <span className='font-medium text-zinc-900 dark:text-zinc-100'>{creator.username}</span>{' '}
                    {activityItem.type === 'withdrawal' && `withdrew ${activityItem.amount} USDT`}
                  </div>
                  <time dateTime={activityItem.date} className='flex-none py-0.5 text-sm leading-5 text-zinc-500'>
                    {formatDateToRelativeTime(activityItem.date)}
                  </time>
                </div>
                <p className='text-sm leading-6 text-zinc-500'>{activityItem.message}</p>
              </div>
            </>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Updates
