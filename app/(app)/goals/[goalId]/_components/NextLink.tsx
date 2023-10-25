'use client'
import React from 'react'
import SDGGoals from '@/constants/SDGGoals'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

const NextLink = ({ goal }: { goal: number }) => {
  const router = useRouter()

  const handleNext = () => {
    if (goal === 17) {
      window.open('https://sdgs.un.org/goals', '_blank')
    } else {
      router.push(`/goals/${++goal}`)
    }
  }

  return (
    <div className='px-6 lg:px-8 max-w-screen-xl mx-auto'>
      <style jsx>{`
        .nextTextHoverColor:hover {
          color: ${goal === 17 ? '#059669' : SDGGoals[goal].color};
        }
      `}</style>
      <p className={`text-zinc-500 dark:text-zinc-400 text-xl lg:text-2xl xl:text-3xl font-bold mb-3`}>Next</p>
      <p
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-gray-100 nextTextHoverColor cursor-pointer w-fit'
        )}
        onClick={handleNext}
      >
        {goal === 17 ? 'Learn More About the SDG' : SDGGoals[goal].name}
      </p>
    </div>
  )
}

export default NextLink
