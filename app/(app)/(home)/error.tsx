'use client'
import React from 'react'
import Button from '@/components/Button'

const error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  console.log(error)

  return (
    <div className='text-center'>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl'>
        Error loading page
      </h1>
      <p className='my-4 text-base leading-7 text-zinc-600'>
        An unexpected error has occurred. Please try again later.
      </p>
      <Button className='px-6' onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}

export default error
