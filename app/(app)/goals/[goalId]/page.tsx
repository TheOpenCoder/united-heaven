import StatisticsSection from './_components/StatisticsSection'
import TargetAccordianCard from './_components/TargetAccordianCard'
import GoalHeader from './_components/GoalHeader'
import SummaryCard from '@/components/SummaryCard'
import NextLink from './_components/NextLink'
import Footer from '../../../../components/Footer'
import { API_URL } from '@/constants/env'
import { Suspense } from 'react'
import { StatisticsSectionLoader } from './_components/StatisticsSectionLoader'

async function getTargetData(goalId: number) {
  const res = await fetch(`https://unstats.un.org/sdgapi/v1/sdg/Goal/${goalId}/Target/List?includechildren=true`, {
    cache: 'force-cache',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getGoalData(goalId: number) {
  const res = await fetch(`${API_URL}/sdgs/${goalId}`, {
    cache: 'force-cache',
    next: {
      tags: ['goalFollow'],
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getGoalRelatedData(goalId: number) {
  const res = await fetch(`${API_URL}/sdgs/${goalId}/related-topics`, {
    next: {
      revalidate: 60,
    },
  })

  console.log(res)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const SdgGoal = async ({
  params: { goalId },
}: {
  params: {
    goalId: string
  }
}) => {
  let goal = Number(goalId)

  const targetAsync = getTargetData(goal)
  const goalAsync = getGoalData(goal)
  const goalRelatedAsync = getGoalRelatedData(goal)

  const [targetData, goalData, goalRelatedData] = await Promise.all([targetAsync, goalAsync, goalRelatedAsync])
  const news = goalRelatedData.news.slice(0, 2).map((news: any) => ({ ...news, type: 'news' }))
  const events = goalRelatedData.events.slice(0, 2).map((event: any) => ({ ...event, type: 'event' }))
  const actions = goalRelatedData.actions.slice(0, 2).map((action: any) => ({ ...action, type: 'action' }))
  const charities = goalRelatedData.charities.slice(0, 2).map((charity: any) => ({ ...charity, type: 'charity' }))
  const combinedData = [...news, ...events, ...actions, ...charities]
  combinedData.sort(() => Math.random() - 0.5)

  return (
    <div>
      <GoalHeader goal={goal} isFollowing={goalData.isFollowing} />

      <div className='py-20 lg:py-40'>
        <Suspense fallback={<StatisticsSectionLoader />}>
          <StatisticsSection goalId={goal} facts={goalData.facts} />
        </Suspense>
      </div>

      <div className='pt-20 lg:pt-24 bg-gray-200 dark:bg-zinc-800'>
        <p className='text-2xl md:text-3xl font-bold pb-8 text-gray-900 dark:text-gray-100 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto'>
          TARGETS AND INDICATORS
        </p>
        <TargetAccordianCard targets={targetData} />
      </div>

      <div className='px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto py-20 lg:py-24'>
        <p className='text-2xl md:text-3xl font-bold pb-8  text-gray-900 dark:text-gray-100'>RELATED TOPICS</p>

        <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6`}>
          {combinedData.map((feed: any) => (
            <SummaryCard
              type={feed.type}
              key={feed.id}
              heading={feed.type === 'charity' ? feed.name : feed.title}
              image={feed.image}
              clickableCardUrl={feed.type === 'action' ? `/action/${feed.id}` : feed.link}
            />
          ))}
        </div>
      </div>

      <div className='bg-gray-200 dark:bg-zinc-800 py-36 lg:py-44'>
        <NextLink goal={goal} />
      </div>

      <Footer />
    </div>
  )
}

export default SdgGoal
