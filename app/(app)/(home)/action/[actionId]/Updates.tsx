import Image from 'next/image'
import clsx from 'clsx'
import ScrollToUpdates from './ScrollToUpdates'
import UpdateInput from './UpdateInput'
import type { withdrawals, progress, creator } from '@/types/action'
import { calculateDaysToGo } from '@/utils/date'

const activity = [
  { id: 1, type: 'withdraw', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'withdraw', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'withdraw', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'update',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    update: 'We cleaned right side of the beach. Will start the other half after a small break. 😁😁',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'withdraw', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'withdraw', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]

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
}: {
  withdrawals: withdrawals[]
  progress: progress[]
  creator: creator
  currentAmount: number
  isCreator: boolean
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
      {isCreator && <UpdateInput currentAmount={currentAmount} />}
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
                activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-10',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className='w-px bg-zinc-300 dark:bg-zinc-700' />
            </div>
            {activityItem.type === 'progress' ? (
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
                      <span className='font-medium text-zinc-900 dark:text-zinc-100'>{creator.username}</span>
                    </div>
                    <time dateTime={activityItem.date} className='flex-none py-0.5 text-sm leading-5 text-zinc-500'>
                      {calculateDaysToGo(activityItem.date)} days ago
                    </time>
                  </div>
                  <p className='text-sm leading-6 text-zinc-500'>{activityItem.message}</p>
                </div>
              </>
            ) : (
              <>
                <div className='relative flex h-6 w-6 flex-none items-center justify-center bg-zinc-100 dark:bg-zinc-900'>
                  <div className='h-1.5 w-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-300 dark:ring-zinc-700' />
                </div>
                <p className='flex-auto py-0.5 text-sm leading-5 text-zinc-500'>
                  <span className='font-medium text-zinc-900 dark:text-zinc-100'>{creator.username}</span> withdrew 200
                  USDT
                </p>
                <time dateTime={activityItem.date} className='flex-none py-0.5 text-sm leading-5 text-zinc-500'>
                  {calculateDaysToGo(activityItem.date)} days ago
                </time>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Updates
