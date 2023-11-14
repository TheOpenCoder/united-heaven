import React from 'react'
import FeedCard from '../../_components/FeedCard'
import Updates from './Updates'

const Action = ({
  params: { actionId },
}: {
  params: {
    actionId: string
  }
}) => {
  return (
    <div>
      <div className='border-b border-zinc-300 dark:border-zinc-700'>
        <FeedCard
          actionId={1}
          profile={{
            userId: 2,
            imageUrl: 'https://avatars0.githubusercontent.com/u/1164541?v=4',
            name: 'Achim Rolle',
            subText: 'Feb 08, 2021 · 6min read',
          }}
          type='action'
          heading='Clean Marina Beach on 12 dec morning'
          image='https://www.signupgenius.com/cms/socialMediaImages/beach-clean-up-tips-ideas-facebook-1200x630.png'
          para="Marina beach is the second largest beach in the world and it is not maintained properly. The beach is full of litters and it's affecting everyone. So me and my friends are planning to clean the beach this sunday. Any one interested can join!!"
          sdgGoals={[1, 4, 6, 15, 17]}
          location='Marina Beach, chennai, IN'
          startDate='Feb 08, 2021'
          endDate='Feb 10, 2021'
          clickableCardUrl='/actions/1'
        />
      </div>
      <div className='pb-8 pt-6'>
        <Updates />
      </div>
    </div>
  )
}

export default Action
