import SDGGoals from '@/constants/SDGGoals'
import clsx from 'clsx'
import Link from 'next/link'

interface SDGTagsProps {
  goals?: number[]
  className?: string
}

const SDGTags: React.FC<SDGTagsProps> = ({ goals, className }) => {
  return (
    <div className={clsx('flex flex-wrap', className)}>
      {goals?.map((goal) => (
        <div key={goal} className='m-1'>
          <Link
            className='inline-flex items-center rounded-md py-0.5 text-xs font-medium text-white w-7 justify-center'
            style={{
              backgroundColor: `${SDGGoals[goal - 1].color}`,
              textShadow: `0 0 1px #000000AA`,
            }}
            href={`/goals/${goal}`}
          >
            {goal}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default SDGTags
