import React from 'react'
import FeedCard from './_components/FeedCard'
import { API_URL } from '@/constants/env'
import ActionCard from './_components/ActionCard'

async function getData() {
  const res = await fetch(`${API_URL}/home/feed`, {
    next: {
      tags: ['feed'],
      revalidate: 60,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const page = async () => {
  const data = await getData()

  return (
    <React.Fragment>
      {data.actions.map((action: any) => (
        <ActionCard key={action.id} {...action} />
      ))}
      {data.news.map((news: any) => (
        <FeedCard key={news.id} type='news' {...news} />
      ))}

      {data.events.map((event: any) => (
        <FeedCard key={event.id} type='event' {...event} />
      ))}
    </React.Fragment>
  )
}

export default page
