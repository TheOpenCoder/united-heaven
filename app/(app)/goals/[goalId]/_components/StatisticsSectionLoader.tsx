export const StatisticsSectionLoader = () => {
  return (
    <div className='max-w-screen-xl mx-auto px-5 animate-pulse'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4'>
        <div className='col-span-1 sm:col-span-2 w-full'>
          <div className='h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4'></div>
          <div className='mt-2 h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-2/4'></div>
        </div>

        <div className='w-full'>
          <div className='flex flex-col space-y-2'>
            <div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-full'></div>
            <div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-2/4'></div>
          </div>
        </div>

        <div className='w-full'>
          <div className='flex flex-col space-y-2'>
            <div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-full'></div>
            <div className='h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
