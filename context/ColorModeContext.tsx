'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

type ColorMode = 'light' | 'dark'

interface ColorModeContextProps {
  colorMode: ColorMode
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextProps | undefined>(undefined)

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ColorMode
    if (storedTheme) {
      setColorMode(storedTheme)
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggleColorMode = () => {
    const newTheme = colorMode === 'dark' ? 'light' : 'dark'
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setColorMode(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>{children}</ColorModeContext.Provider>
}

export const useColorMode = (): ColorModeContextProps => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider')
  }
  return context
}
