import StatisticsSection from './_components/StatisticsSection'
import TargetAccordianCard from './_components/TargetAccordianCard'
import GoalHeader from './_components/GoalHeader'
import SummaryCard from '@/components/SummaryCard'
import NextLink from './_components/NextLink'

async function getTargetData(goalId: number) {
  const res = await fetch(`https://unstats.un.org/sdgapi/v1/sdg/Goal/${goalId}/Target/List?includechildren=true`, {
    cache: 'force-cache',
  })

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

  const targetData = await getTargetData(goal)

  return (
    <div>
      <GoalHeader goal={goal} />

      <div className='py-20 lg:py-40'>
        <StatisticsSection goalId={goal} />
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
          <SummaryCard
            type='action'
            heading='Distributing free foods to people in need'
            image='https://pbs.twimg.com/media/EB_L4EGXUAAq3sU.jpg'
            clickableCardUrl='/feed/actions/1'
          />
          <SummaryCard
            type='news'
            heading='Modelling Points to Income Redistribution as Strategy for SDG 1'
            image='https://hub.iisd.org/wp-content/uploads/2020/04/cg-548.jpg'
            clickableCardUrl='https://sdg.iisd.org/news/modelling-points-to-income-redistribution-as-strategy-for-sdg-1/'
          />
          <SummaryCard
            type='action'
            heading='Secretly providing blankets to homeless people'
            image='https://i2.wp.com/www.udayfoundation.org/wp-content/uploads/2017/11/blanket-donation-drive-2017.jpg?w=1224&ssl=1'
            clickableCardUrl='/feed/actions/1'
          />
          <SummaryCard
            type='event'
            heading='Forests, Trees and Poverty Alleviation in Africa'
            image='https://hub.iisd.org/wp-content/uploads/2020/04/cg634.jpg'
            clickableCardUrl='https://sdg.iisd.org/events/forests-trees-and-poverty-alleviation-in-africa/'
          />
          <SummaryCard
            type='event'
            heading='Pre-Summit of the UN Food Systems Summit 2021'
            image='https://hub.iisd.org/wp-content/uploads/2020/12/cg-917.jpg'
            clickableCardUrl='https://sdg.iisd.org/events/pre-summit-of-the-un-food-systems-summit-2021/'
          />
        </div>
      </div>

      <div className='bg-gray-200 dark:bg-zinc-800 py-32 lg:py-36'>
        <NextLink goal={goal} />
      </div>
    </div>
  )
}

export default SdgGoal
