'use client'
import { useState } from 'react'
import SDGGoals from '@/constants/SDGGoals'
import { useRouter } from 'next/navigation'

const GoalHeader = ({ goal }: { goal: number }) => {
  const router = useRouter()
  const [following, setFollowing] = useState(false)

  return (
    <div
      className='h-[60vh] w-full bg-cover bg-center relative'
      style={{
        backgroundImage: `url('/images/SDGCovers/goalcover${goal}.webp')`,
      }}
    >
      <div
        className='flex items-start justify-start p-4 md:p-8 bg-gradient-to-r w-full h-full'
        style={{ backgroundImage: `linear-gradient(to right, ${SDGGoals[goal - 1].color}CC, transparent)` }}
      >
        <div className='max-w-screen-2xl mx-auto w-full h-full'>
          <div className='max-w-3xl flex flex-col justify-between h-full'>
            <div className='mt-10'>
              <p className='text-white/30 font-black leading-none text-5xl md:text-6xl'>{SDGGoals[goal - 1].id}</p>
              <p className='text-white font-bold leading-none text-2xl md:text-4xl text-shadow-md line-clamp-6 overflow-hidden mt-6'>
                {SDGGoals[goal - 1].description}
              </p>
            </div>

            <div className='flex space-x-4'>
              <button
                className={`rounded-full text-white px-4 py-2 bg-opacity-30 bg-white ${
                  goal === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-opacity-50'
                } focus:outline-none`}
                disabled={goal === 1}
                onClick={() => router.push(`/goals/${--goal}`)}
              >
                Previous
              </button>

              <button
                className={`rounded-full text-white px-4 py-2 bg-opacity-30 bg-white ${
                  goal === SDGGoals.length ? 'cursor-not-allowed opacity-50' : 'hover:bg-opacity-50'
                } focus:outline-none`}
                disabled={goal === SDGGoals.length}
                onClick={() => router.push(`/goals/${++goal}`)}
              >
                Next
              </button>

              <span className='self-center text-white'>-</span>

              {following ? (
                <button
                  className='rounded-full text-white px-4 py-2 bg-opacity-30 bg-white hover:bg-opacity-50 focus:outline-none'
                  onClick={() => setFollowing(false)}
                >
                  Following
                </button>
              ) : (
                <button
                  className='rounded-full text-white px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none'
                  onClick={() => setFollowing(true)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalHeader
