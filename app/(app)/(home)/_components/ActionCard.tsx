'use client'
import React, { FC, useState } from 'react'
import { IconType } from 'react-icons'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { IoIosShareAlt } from 'react-icons/io'
import SDGTags from './SDGTags'
import clsx from 'clsx'
import Image from 'next/image'
import { AiOutlineHeart, AiFillHeart, AiOutlineLink } from 'react-icons/ai'
import { TbLocationFilled } from 'react-icons/tb'
import { HiOutlineMegaphone } from 'react-icons/hi2'
import { BiDonateHeart, BiSolidDonateHeart } from 'react-icons/bi'
import { useAuth } from '@/context/AuthContext'
import DonateModal from '@/components/modal/DonateModal'
import ParticipateModal from '@/components/modal/ParticipateModal'
import { convertToReadableDate } from '@/utils/date'
import { FaGlobeAmericas } from 'react-icons/fa'
import { MdHandshake, MdOutlineHandshake } from 'react-icons/md'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { actionData } from '@/types/action'
import axios from 'axios'
import { API_URL } from '@/constants/env'

interface ListProps {
  text?: string
  onClick?: () => void
  icon: IconType
}

const ActionCard = ({
  SDGs,
  createdAt,
  creator,
  currentContractValue,
  description,
  donations,
  endDate,
  id,
  image,
  followers,
  isDonatable,
  isDonated,
  isFollowing,
  isParticipating,
  isParticipatory,
  location,
  participants,
  progress,
  startDate,
  title,
  totalDonationAmount,
  totalFollowerCount,
  totalParticipantCount,
  updatedAt,
  withdrawals,
  onlineUrl,
  contractId,
}: actionData) => {
  const [liked, setLiked] = useState(isFollowing)
  const [donated, setDonated] = useState(isDonated)
  const [participate, setParticipate] = useState(isParticipating)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false)

  // count
  const [participantsCount, setParticipantsCount] = useState(totalParticipantCount)
  const [donationsCount, setDonationsCount] = useState(totalDonationAmount)
  const [followersCount, setFollowersCount] = useState(totalFollowerCount)

  const { authRun } = useAuth()

  const handleShare = async () => {
    const shareData = {
      text: title,
      url: window.location.href,
    }
    try {
      await navigator.share(shareData)
    } catch (err: any) {
      const shareToast = 'shareToast'
      if (err.name !== 'AbortError') {
        navigator.clipboard.writeText(shareData.url)
        toast.success('Copied to clipboard', {
          id: shareToast,
        })
      }
    }
  }

  const clickableCardUrl = `/action/${id}`

  const handleFollow = async () => {
    if (liked) {
      try {
        setLiked(false)
        setFollowersCount(followersCount - 1)
        await axios.post(`${API_URL}/actions/${id}/unfollow`)
      } catch (err: any) {
        toast.error(err.response.data.error)
        setLiked(true)
        setFollowersCount(followersCount + 1)
      }
    } else {
      try {
        setLiked(true)
        setFollowersCount(followersCount + 1)
        await axios.post(`${API_URL}/actions/${id}/follow`)
      } catch (err: any) {
        toast.error(err.response.data.error)
        setLiked(false)
        setFollowersCount(followersCount - 1)
      }
    }
  }

  return (
    <div className='w-full overflow-hidden py-8 px-4'>
      <div className='mb-4'>
        <Link href={`/profile/${creator.id}`} className='flex items-center space-x-4 w-fit'>
          <Image
            src='/images/defaultDP.jpeg'
            alt={`user ${creator.username} profile picture`}
            className='w-10 h-10 rounded-full'
            width={40}
            height={40}
          />
          <div className='flex flex-col space-y-0 text-sm'>
            <span className='font-semibold text-zinc-900 dark:text-zinc-100'>{creator.username}</span>
            <span className='text-zinc-500 dark:text-zinc-400 text-xs'>{convertToReadableDate(createdAt)}</span>
          </div>
        </Link>
      </div>
      <Link href={clickableCardUrl}>
        <img src={image} className='mb-4 w-full rounded-lg object-cover' alt='image' />
      </Link>
      <div className='space-y-3'>
        <p className='uppercase font-bold text-sm tracking-wider cursor-default mb-1 text-green-600 dark:text-green-500'>
          Action
        </p>

        <Link href={clickableCardUrl}>
          <p className='text-xl text-zinc-900 dark:text-zinc-100 font-semibold items-center'>{title}</p>
          <p className='pt-2 text-zinc-500 dark:text-zinc-400 text-sm'>{description}</p>
        </Link>

        <SDGTags goals={SDGs} />

        <div className='space-y-4 ml-1'>
          {onlineUrl && <List icon={FaGlobeAmericas} text='Online' />}

          {startDate && (
            <List
              icon={BsFillCalendarWeekFill}
              text={`${convertToReadableDate(startDate)} - ${endDate && convertToReadableDate(endDate)}`}
            />
          )}

          {location && (
            <List
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank')}
              icon={TbLocationFilled}
              text={location}
            />
          )}

          {onlineUrl && <List onClick={() => window.open(onlineUrl, '_blank')} icon={AiOutlineLink} text={onlineUrl} />}
        </div>
      </div>

      <div className='flex items-center justify-around flex-wrap pt-6'>
        {/* donation */}
        {isDonatable && (
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
              {donationsCount && `${donationsCount} $`}
            </p>
          </button>
        )}

        {isDonatable && (
          <DonateModal
            manualOpen={isDonationModalOpen}
            setManualOpen={setIsDonationModalOpen}
            setDonated={setDonated}
            id={id}
            contractId={contractId}
            endDate={endDate}
            totalDonationAmount={donationsCount}
            setDonationsCount={setDonationsCount}
          />
        )}

        {isParticipatory && (
          <ParticipateModal
            id={id}
            manualOpen={isParticipateModalOpen}
            setManualOpen={setIsParticipateModalOpen}
            participate={participate}
            setParticipate={setParticipate}
            participantsCount={participantsCount}
            setParticipantsCount={setParticipantsCount}
          />
        )}

        {/* participate */}
        {isParticipatory && (
          <button className='group flex items-center' onClick={() => authRun(() => setIsParticipateModalOpen(true))}>
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
              {participantsCount}
            </p>
          </button>
        )}

        {/* like */}
        <button className='group flex items-center' onClick={() => authRun(() => handleFollow())}>
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
            {followersCount}
          </p>
        </button>

        {/* Updates */}
        <Link className='group flex items-center' href={`/action/${id}#updates`} scroll={true}>
          <div className='group-hover:bg-indigo-600/10 dark:group-hover:bg-indigo-500/10 rounded-full '>
            <HiOutlineMegaphone className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-500' />
          </div>
          <p className='text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-500'>
            12
          </p>
        </Link>

        {/* share */}
        <button
          className='hover:bg-teal-600/10 dark:hover:bg-teal-500/10 rounded-full group cursor-pointer'
          onClick={handleShare}
        >
          <IoIosShareAlt className='w-5 h-5 m-1.5 text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-500' />
        </button>
      </div>
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

export default ActionCard
