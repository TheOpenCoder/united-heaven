import React from 'react'

const loading = () => {
  return (
    <div className='w-full overflow-hidden py-8 px-4'>
      <div className='animate-pulse'>
        <div className='mb-4 flex items-center space-x-4'>
          <div className='w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full' />
          <div className='flex flex-col space-y-2'>
            <div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-40' />
            <div className='h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-20' />
          </div>
        </div>

        <div className='mb-4 w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-lg' />

        <div className='space-y-3'>
          <div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20 mb-1' />
          <div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4' />
          <div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full' />
          <div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6' />
          <div className='h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3' />
        </div>
      </div>
    </div>
  )
}

export default loading
