'use client'
import { useEffect } from 'react'

const ScrollToUpdates = () => {
  // check if #updates is in the url and scroll to it
  useEffect(() => {
    if (window.location.hash === '#updates') {
      const updates = document.getElementById('updates')
      if (updates) {
        updates.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return <div id='updates' />
}

export default ScrollToUpdates
