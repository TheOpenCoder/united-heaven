'use client'
import SDGGoals from '@/constants/SDGGoals'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

const SDGFollowCard = ({ goalId }: { goalId: number }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const { authRun } = useAuth()

  const handleFollow = () => {
    authRun(() => {
      setIsFollowing(!isFollowing)
    })
  }

  return (
    <div className='flex p-4'>
      <Link href={`/goals/${goalId}`}>
        <Image
          className='w-20 h-20'
          src={`/images/SDGIcons/Goal${goalId}.png`}
          alt={`Goal ${goalId} Image`}
          width={80}
          height={80}
        />
      </Link>
      <div className='ml-4 flex space-x-3 flex-1 justify-between items-center'>
        <Link href={`/goals/${goalId}`}>
          <p className='font-semibold text-gray-900 dark:text-gray-100 line-clamp-2'>{SDGGoals[goalId - 1].name}</p>
        </Link>
        <Button className='py-1 px-2 w-fit h-fit' variant='outline' onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </div>
  )
}

export default SDGFollowCard
