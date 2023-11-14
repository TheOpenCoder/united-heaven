'use client'
import React, { FC, useState } from 'react'
import { IconType } from 'react-icons'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { FaGlobeAmericas } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { HiOutlineExternalLink } from 'react-icons/hi'
import SDGTags from './SDGTags'
import { FeedType } from '@/types/feed'
import clsx from 'clsx'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineLink } from 'react-icons/ai'
import { TbLocationFilled } from 'react-icons/tb'
import { BiDonateHeart, BiSolidDonateHeart } from 'react-icons/bi'
import { useAuth } from '@/context/AuthContext'
import DonateModal from '@/components/modal/DonateModal'
import ParticipateModal from '@/components/modal/ParticipateModal'

import { MdHandshake, MdOutlineHandshake } from 'react-icons/md'
import Link from 'next/link'

interface FeedCardProps {
  actionId?: number
  profile?: {
    userId: number
    name: string
    subText?: string
    imageUrl: string
  }
  type: FeedType
  isOnline?: boolean
  location?: string
  url?: string
  startDate?: string
  endDate?: string
  heading?: string
  image?: string
  para?: string
  sdgGoals?: number[]
  clickableCardUrl: string
}

interface ListProps {
  text?: string
  onClick?: () => void
  icon: IconType
}

const FeedCard: FC<FeedCardProps> = ({
  actionId,
  profile,
  type,
  heading,
  image,
  isOnline,
  para,
  location,
  url,
  startDate,
  endDate,
  sdgGoals,
  clickableCardUrl,
}) => {
  const [liked, setLiked] = useState(false)
  const [donated, setDonated] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false)
  const [participate, setParticipate] = useState(false)
  const { authRun } = useAuth()

  return (
    <div className='w-full overflow-hidden py-8 px-4'>
      {profile && (
        <div className='mb-4'>
          <Link href={`/profile/${profile.userId}`} className='flex items-center space-x-4 w-fit'>
            <Image
              src={profile.imageUrl}
              alt={`user ${profile.name} profile picture`}
              className='w-10 h-10 rounded-full'
              width={40}
              height={40}
            />
            <div className='flex flex-col space-y-0 text-sm'>
              <span className='font-semibold text-zinc-900 dark:text-zinc-100'>{profile.name}</span>
              {profile.subText && <span className='text-zinc-500 dark:text-zinc-400 text-xs'>{profile.subText}</span>}
            </div>
          </Link>
        </div>
      )}
      {image && (
        <Link href={clickableCardUrl} target={type === 'action' ? '_self' : '_blank'} prefetch={type === 'action'}>
          <img src={image} className='mb-4 w-full rounded-lg object-cover' alt='image' />
        </Link>
      )}
      <div className='space-y-3'>
        <p
          className={clsx(
            'uppercase font-bold text-sm tracking-wider cursor-default mb-1',
            type === 'action' && 'text-green-600 dark:text-green-500',
            type === 'event' && 'text-red-600 dark:text-red-500',
            type === 'news' && 'text-yellow-600 dark:text-yellow-500',
            type === 'charity' && 'text-pink-600 dark:text-pink-500'
          )}
        >
          {type}
        </p>

        <Link href={clickableCardUrl} target={type === 'action' ? '_self' : '_blank'} prefetch={type === 'action'}>
          {heading && (
            <p className='text-xl text-zinc-900 dark:text-zinc-100 font-semibold items-center'>
              {heading}
              {type !== 'action' && <HiOutlineExternalLink className='inline ml-1 mb-1' />}
            </p>
          )}
          {para && <p className='pt-2 text-zinc-500 dark:text-zinc-400 text-sm'>{para}</p>}
        </Link>
        {sdgGoals && (
          <div>
            <SDGTags goals={sdgGoals} />
          </div>
        )}
        <div className='space-y-4 ml-1'>
          {isOnline && <List icon={FaGlobeAmericas} text='Online' />}

          {startDate && <List icon={BsFillCalendarWeekFill} text={`${startDate} - ${endDate}`} />}

          {location && (
            <List
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank')}
              icon={TbLocationFilled}
              text={location}
            />
          )}

          {url && <List onClick={() => window.open(url, '_blank')} icon={AiOutlineLink} text={url} />}
        </div>
      </div>

      {type === 'action' && (
        <div className='flex items-center space-x-4 pt-6 '>
          {/* donation */}
          <button
            className='group flex items-center'
            onClick={() => authRun(() => setIsDonationModalOpen(!isDonationModalOpen))}
          >
            <div className='group-hover:bg-emerald-600/10 dark:group-hover:bg-emerald-500/10 rounded-full '>
              {donated ? (
                <BiSolidDonateHeart className='w-5 h-5 m-1.5 text-emerald-600 dark:text-emerald-500' />
              ) : (
                <BiDonateHeart className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500' />
              )}
            </div>
            <p
              className={clsx(
                'text-sm',
                donated
                  ? 'text-emerald-600 dark:text-emerald-500'
                  : 'text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-500'
              )}
            >
              200 $
            </p>
          </button>
          <DonateModal manualOpen={isDonationModalOpen} setManualOpen={setIsDonationModalOpen} />

          <ParticipateModal manualOpen={isParticipateModalOpen} setManualOpen={setIsParticipateModalOpen} />

          {/* participate */}
          <button
            className='group flex items-center'
            onClick={() => authRun(() => setIsParticipateModalOpen(!isParticipateModalOpen))}
          >
            <div className='group-hover:bg-blue-600/10 dark:group-hover:bg-blue-500/10 rounded-full '>
              {participate ? (
                <MdHandshake className='w-5 h-5 m-1.5 text-blue-600 dark:text-blue-500' />
              ) : (
                <MdOutlineHandshake className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
              )}
            </div>
            <p
              className={clsx(
                'text-sm',
                participate
                  ? 'text-blue-600 dark:text-blue-500'
                  : 'text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'
              )}
            >
              200
            </p>
          </button>

          {/* like */}
          <button className='group flex items-center' onClick={() => authRun(() => setLiked(!liked))}>
            <div className='group-hover:bg-rose-600/10 dark:group-hover:bg-rose-500/10 rounded-full '>
              {liked ? (
                <AiFillHeart className='w-5 h-5 m-1.5 text-rose-600 dark:text-rose-500' />
              ) : (
                <AiOutlineHeart className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-500' />
              )}
            </div>
            <p
              className={clsx(
                'text-sm',
                liked
                  ? 'text-rose-600 dark:text-rose-500'
                  : 'text-zinc-500 dark:text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-500'
              )}
            >
              213K
            </p>
          </button>

          {/* share */}
          <button className='hover:bg-teal-600/10 dark:hover:bg-teal-500/10 rounded-full group cursor-pointer'>
            <IoIosShareAlt className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-500' />
          </button>
        </div>
      )}
    </div>
  )
}

const List: FC<ListProps> = ({ text, onClick, icon: IconComponent }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex w-auto items-center text-zinc-500 dark:text-zinc-400',
        onClick && 'cursor-pointer hover:text-black dark:hover:text-white'
      )}
    >
      <IconComponent className='w-4 h-4' />
      <p className='ml-2 font-semibold text-sm'>{text}</p>
    </div>
  )
}

export default FeedCard
