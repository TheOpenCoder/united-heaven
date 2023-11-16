'use client'
import { useState } from 'react'
import ResizableTextarea from '@/components/ResizableTextarea'
import Image from 'next/image'
import Button from '@/components/Button'
import WithdrawModal from '@/components/modal/WithdrawModal'
import axios from 'axios'
import { API_URL } from '@/constants/env'
import toast from 'react-hot-toast'
import { revalidateActionById } from '@/app/actions'

const UpdateInput = ({
  currentAmount,
  actionId,
  contractId,
}: {
  currentAmount: number
  actionId: string
  contractId: string
}) => {
  const [update, setUpdate] = useState('')
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const postUpdate = async () => {
    if (update.length === 0) {
      toast.error('Update cannot be empty')
      return
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/actions/${actionId}/progress`, {
        message: update,
      })
      await revalidateActionById(actionId)
      toast.success('Update posted')
      setUpdate('')
    } catch (err: any) {
      console.log(err)

      toast.error(err.response.data.error || 'Failed to post update')
    } finally {
      setLoading(false)
    }
  }

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
      <div className='flex justify-end space-x-2'>
        <Button className='mb-4 px-4 !rounded-full' variant='outline' onClick={() => setIsWithdrawModalOpen(true)}>
          Withdraw
        </Button>
        <Button className='mb-4 px-4 !rounded-full' disabled={loading} onClick={postUpdate}>
          {loading ? 'Posting...' : 'Post Update'}
        </Button>
      </div>
      <WithdrawModal
        manualOpen={isWithdrawModalOpen}
        setManualOpen={setIsWithdrawModalOpen}
        currentAmount={currentAmount}
        actionId={actionId}
        contractId={contractId}
      />
    </div>
  )
}

export default UpdateInput
