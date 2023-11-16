import React from 'react'
import Updates from './Updates'
import { API_URL } from '@/constants/env'
import ActionCard from '../../_components/ActionCard'

async function getData(actionId: string) {
  const res = await fetch(`${API_URL}/actions/${actionId}`, {
    cache: 'no-cache',
  })

  console.log('calling actionid api')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Action = async ({
  params: { actionId },
}: {
  params: {
    actionId: string
  }
}) => {
  const action = await getData(actionId)

  return (
    <div>
      <div className='border-b border-zinc-300 dark:border-zinc-700'>
        <ActionCard {...action} />
      </div>
      <div className='pb-8 pt-6'>
        <Updates
          withdrawals={action.withdrawals}
          progress={action.progress}
          creator={action.creator}
          currentAmount={action.currentContractValue}
          isCreator={action.isCreator}
        />
      </div>
    </div>
  )
}

export default Action
