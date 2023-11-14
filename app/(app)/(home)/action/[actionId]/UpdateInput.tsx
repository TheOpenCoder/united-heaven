'use client'
import { useState } from 'react'
import ResizableTextarea from '@/components/ResizableTextarea'
import Image from 'next/image'
import Button from '@/components/Button'

const UpdateInput = () => {
  const [update, setUpdate] = useState('')

  return (
    <div className='border-b border-zinc-300 dark:border-zinc-700 mb-6 px-4'>
      <div className='flex'>
        <Image
          src={'/images/defaultDP.jpeg'}
          alt=''
          className='relative h-10 w-10 flex-none rounded-full bg-zinc-50 dark:bg-zinc-950 mt-1 mr-1'
          width={24}
          height={24}
        />
        <ResizableTextarea
          name='updates'
          value={update}
          onChange={(e) => setUpdate(e.target.value)}
          className='resize-none w-full text-xl bg-zinc-100 dark:bg-zinc-900 border-none focus:outline-none focus:ring-0 text-zinc-900 dark:text-zinc-100'
          placeholder='Post your update here'
        />
      </div>
      <div className='flex justify-end'>
        <Button className='mb-4 px-4 !rounded-full'>Post Update</Button>
      </div>
    </div>
  )
}

export default UpdateInput
