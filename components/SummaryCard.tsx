'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineExternalLink } from 'react-icons/hi'
import type { FeedType } from '@/types/feed'

const SummaryCard = ({
  type,
  heading,
  image,
  clickableCardUrl,
  footer,
}: {
  type: FeedType
  heading: string
  image?: string
  clickableCardUrl: string
  footer?: any
}) => {
  return (
    <Link
      className='flex p-5 space-x-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 justify-between'
      href={clickableCardUrl}
      target={type === 'action' ? '_self' : '_blank'}
      prefetch={type === 'action'}
    >
      <div className='flex flex-col space-y-2'>
        <p
          className={clsx(
            'uppercase font-bold text-xs tracking-wider',
            type === 'action' && 'text-green-600 dark:text-green-500',
            type === 'event' && 'text-red-600 dark:text-red-500',
            type === 'news' && 'text-yellow-600 dark:text-yellow-500',
            type === 'charity' && 'text-pink-600 dark:text-pink-500'
          )}
        >
          {type}
        </p>
        <p className='text-md font-semibold text-gray-900 dark:text-gray-100 line-clamp-3'>
          {heading}
          {type !== 'action' && <HiOutlineExternalLink className='inline ml-1' />}
        </p>
        {footer && <div>{footer}</div>}
      </div>
      {image && (
        <Image
          src={image}
          className='w-24 h-24 object-cover object-center rounded-lg'
          width={96}
          height={96}
          alt={heading + ' image'}
        />
      )}
    </Link>
  )
}

export default SummaryCard
