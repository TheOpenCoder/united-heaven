import { HiOutlineExternalLink } from 'react-icons/hi'
import SDGTags from './SDGTags'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface FeedCardProps {
  title: string
  image: string
  date: string
  link: string
  SDGs: number[]
  id: string
  type: 'news' | 'event' | 'charity'
}

const FeedCard = ({ SDGs, date, image, id, link, type, title }: FeedCardProps) => {
  return (
    <div className='w-full overflow-hidden py-8 px-4'>
      {image && (
        <Link href={link} target={'_blank'} prefetch={false}>
          <div className='w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-lg  overflow-hidden mb-4 relative'>
            <Image src={image} alt={`image for ${title}`} fill objectFit='cover' className='object-cover' />
          </div>
        </Link>
      )}
      <div className='space-y-3'>
        <p
          className={clsx(
            'uppercase font-bold text-sm tracking-wider cursor-default mb-1',
            type === 'event' && 'text-red-600 dark:text-red-500',
            type === 'news' && 'text-yellow-600 dark:text-yellow-500',
            type === 'charity' && 'text-pink-600 dark:text-pink-500'
          )}
        >
          {type}
        </p>

        <Link href={link} target={'_blank'} prefetch={false}>
          <p className='text-xl text-zinc-900 dark:text-zinc-100 font-semibold items-center'>
            {title}
            <HiOutlineExternalLink className='inline ml-1 mb-1' />
          </p>
        </Link>
        <SDGTags goals={SDGs} />
      </div>
    </div>
  )
}

export default FeedCard
