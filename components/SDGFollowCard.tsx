'use client'
import SDGGoals from '@/constants/SDGGoals'
import Link from 'next/link'
import Image from 'next/image'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants/env'
import toast from 'react-hot-toast'
import { revalidateGoalFollow } from '@/app/actions'

const SDGFollowCard = ({ goalId, following }: { goalId: number; following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following)
  const { authRun } = useAuth()

  const handleFollow = async () => {
    if (isFollowing) {
      try {
        setIsFollowing(false)
        await axios.post(`${API_URL}/sdgs/${goalId}/unfollow`)
        revalidateGoalFollow()
      } catch (err: any) {
        setIsFollowing(true)
        toast.error('Failed to unfollow goal')
      }
    } else {
      try {
        setIsFollowing(true)
        await axios.post(`${API_URL}/sdgs/${goalId}/follow`)
        revalidateGoalFollow()
      } catch (err: any) {
        setIsFollowing(false)
        toast.error('Failed to follow goal')
      }
    }
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
        <Button className='py-1 px-2 w-fit h-fit' variant='outline' onClick={() => authRun(() => handleFollow())}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </div>
    </div>
  )
}

export default SDGFollowCard
