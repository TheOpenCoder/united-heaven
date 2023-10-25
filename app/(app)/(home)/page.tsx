import SummaryCard from '@/components/SummaryCard'
import SDGFollowCard from '@/components/SDGFollowCard'
import FeedCard from './_components/FeedCard'

const Home = () => {
  return (
    <div className='flex w-full items-start max-w-screen-2xl mx-auto'>
      <aside className='sticky top-16 hidden w-80 lg:w-96 md:block pt-10'>
        <p className='text-xl font-semibold text-gray-900 dark:text-gray-100 px-4 py-2'>Follow SDGs</p>
        <SDGFollowCard goalId={1} />
        <SDGFollowCard goalId={4} />
        <SDGFollowCard goalId={10} />
        <SDGFollowCard goalId={17} />
      </aside>

      <main className='flex-1 min-h-screen pt-6 border-x border-zinc-300 dark:border-zinc-700 divide-y divide-zinc-300 dark:divide-zinc-700'>
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
        <FeedCard
          type='event'
          heading='ECOSOC Humanitarian Affairs Segment 2022'
          image='https://hub.iisd.org/wp-content/uploads/2021/09/cg-951.jpg'
          sdgGoals={[1, 4]}
          clickableCardUrl='https://sdg.iisd.org/events/ecosoc-humanitarian-affairs-segment-2022/'
        />
        <FeedCard
          type='news'
          heading='Five Countries Yet to Conduct Voluntary National Review'
          image='https://sdg.iisd.org/wp-content/uploads/2019/09/cg-405.jpg'
          clickableCardUrl='https://sdg.iisd.org/news/five-countries-yet-to-conduct-voluntary-national-review/'
        />
        <FeedCard
          type='event'
          heading='World Maritime Day 2022'
          image='https://hub.iisd.org/wp-content/uploads/2016/11/cg-104.jpg'
          sdgGoals={[1, 4]}
          clickableCardUrl='https://sdg.iisd.org/events/world-maritime-day-2022/'
        />
      </main>

      <aside className='sticky top-16 hidden w-96 xl:block pt-10'>
        <p className='text-xl font-semibold text-gray-900 dark:text-gray-100 px-4 py-2'>Trending</p>
        <SummaryCard
          type='action'
          heading='Clean Marina Beach on 12 dec morning'
          image='https://picsum.photos/200/200'
          clickableCardUrl='/actions/1'
        />
        <SummaryCard
          type='charity'
          heading='Clean Marina Beach on 12 dec morning'
          image='https://picsum.photos/200/200'
          clickableCardUrl='/actions/1'
        />
      </aside>
    </div>
  )
}

export default Home
