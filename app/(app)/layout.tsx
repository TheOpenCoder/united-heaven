import React from 'react'
import Navbar from './_components/Navbar'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className='pt-16 px-4 sm:px-6 lg:px-8 '>{children}</div>
    </div>
  )
}

export default layout
