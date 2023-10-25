'use client'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import clsx from 'clsx'

const TargetAccordianCard = ({ targets }: { targets: any }) => {
  if (!targets) {
    return null
  }

  return (
    <div>{targets && targets[0].targets.map((target: any) => <AccordianCard key={target.code} target={target} />)}</div>
  )
}

const AccordianCard = ({ target }: { target: any }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='rounded-sm cursor-pointer text-gray-900 dark:text-gray-100'>
      <div className='py-8 w-full' onClick={() => setIsOpen(!isOpen)}>
        <div className='px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto'>
          <div className='flex justify-between items-center'>
            <p className='text-zinc-500 dark:text-zinc-400 font-semibold'>Target</p>
            {isOpen ? <IoIosArrowUp fontSize={23} /> : <IoIosArrowDown fontSize={23} />}
          </div>
          <div className={`flex items-center mt-2 mr-10 md:mr-20`}>
            <p className='font-bold text-4xl mr-4'>{target.code}</p>
            <p className='font-semibold text-md'>{target.description}</p>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'transition-[max-height] duration-700 delay-0 overflow-hidden',
          isOpen ? 'max-h-[500px] ease-linear' : 'max-h-0 ease-out'
        )}
      >
        <div className='py-6 w-full bg-zinc-100 dark:bg-zinc-900'>
          <div className='px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto'>
            <p className='text-zinc-500 dark:text-zinc-400 font-semibold mb-4'>Indicator</p>
            {target.indicators.map((indicator: any) => (
              <div key={indicator.code} className={`flex items-center mb-2`}>
                <p className='font-semibold text-2xl mr-4'>{indicator.code}</p>
                <p className='font-semibold text-sm'>{indicator.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TargetAccordianCard
