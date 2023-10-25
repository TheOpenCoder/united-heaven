import SDGGoals from '@/constants/SDGGoals'

const StatisticsSection = ({ goalId }: { goalId: number }) => {
  return (
    <div className='max-w-screen-xl mx-auto px-5 text-gray-900 dark:text-gray-100'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4'>
        <div className='col-span-1 sm:col-span-2 w-full'>
          <h2 className='text-4xl font-bold'>
            Overview on <br />
            <span
              style={{
                color: SDGGoals[goalId - 1].color,
              }}
            >
              {SDGGoals[goalId - 1].name}
            </span>
          </h2>
        </div>

        <div className='w-full'>
          <div className='flex flex-col'>
            <p className='text-4xl font-bold'>30%</p>
            <div className='text-sm font-medium mt-1'>
              of the citizens of India don&apos;t have access to fresh water.
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='flex flex-col'>
            <p className='text-4xl font-bold'>142,000</p>
            <div className='text-sm font-medium mt-1'>people are suffering from hunger.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatisticsSection
