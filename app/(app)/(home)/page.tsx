import SummaryCard from '@/components/SummaryCard'
import SDGFollowCard from '@/components/SDGFollowCard'

const Home = () => {
  return (
    <div className='flex w-full items-start max-w-7xl mx-auto'>
      <aside className='sticky top-16 hidden w-96 md:block pt-10'>
        <p className='text-xl font-semibold text-gray-900 dark:text-gray-100 px-4 py-2'>Follow SDGs</p>
        <SDGFollowCard goalId={1} />
        <SDGFollowCard goalId={4} />
        <SDGFollowCard goalId={10} />
        <SDGFollowCard goalId={17} />
      </aside>

      <main className='flex-1 h-[200vh] pt-10 border-x border-zinc-300 dark:border-zinc-700 px-4 sm:px-6 lg:px-8'>
        <p>content</p>
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
