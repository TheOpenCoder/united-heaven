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
  const news = data.news.map((news: any) => ({ ...news, type: 'news' }))
  const events = data.events.map((event: any) => ({ ...event, type: 'event' }))
  const combinedFeed = [...news, ...events]
  combinedFeed.sort(() => Math.random() - 0.5)

  return (
    <React.Fragment>
      {data.actions.map((action: any) => (
        <ActionCard key={action.id} {...action} />
      ))}
      {combinedFeed.map((feed: any) => (
        <FeedCard key={feed.id} {...feed} />
      ))}
    </React.Fragment>
  )
}

export default page
