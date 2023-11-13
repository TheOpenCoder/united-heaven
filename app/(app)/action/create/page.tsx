import React from 'react'
import ActionForm from './ActionForm'

const CreateAction = () => {
  return (
    <div className='pt-10 pb-52 text-black dark:text-white px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto'>
      <div className='text-center py-10 md:pt-20'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold leading-tight'>
          Improve the world with <br />
          <span className='text-green-500 dark:text-green-400'>your actions</span>
        </h1>
        <p className='text-gray-500 text-xs sm:text-sm md:text-base mt-6 md:mt-12'>
          Create an action to solve a SDG goal and get help to achieve the goal through donations and volunteering from
          people around the world.
        </p>
      </div>
      <ActionForm />
    </div>
  )
}

export default CreateAction
