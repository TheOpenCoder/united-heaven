'use client'
import React from 'react'
import Button from '@/components/Button'

const error = ({ error }: { error: Error & { digest?: string }; reset: () => void }) => {
  console.log(error)

  return (
    <div className='text-center'>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl'>
        Action Not Found
      </h1>
      <p className='mt-4 text-base leading-7 text-zinc-600'>The action you are looking for does not exist.</p>
      <Button className='mt-4 px-6' href={'/'}>
        Go back to home
      </Button>
    </div>
  )
}

export default error
