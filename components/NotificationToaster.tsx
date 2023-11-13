'use client'
import React from 'react'

import { Toaster } from 'react-hot-toast'
import { useColorMode } from '@/context/ColorModeContext'

const NotificationToaster = () => {
  const { colorMode } = useColorMode()

  return (
    <div>
      <Toaster
        reverseOrder={true}
        toastOptions={{
          style: {
            background: colorMode === 'light' ? '#fff' : '#000',
            color: colorMode === 'light' ? '#000' : '#fff',
          },
        }}
      />
    </div>
  )
}

export default NotificationToaster
