'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from '@txnlab/use-wallet'
import AuthModal from '@/components/modal/AuthModal'

interface AuthContextProps {
  authRun: (_toRun: Function) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeAddress } = useWallet()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const authRun = (toRun: Function) => {
    if (activeAddress) {
      toRun()
    } else {
      setIsAuthModalOpen(true)
    }
  }

  useEffect(() => {
    if (activeAddress) {
      setIsAuthModalOpen(false)
    }
  }, [activeAddress])

  return (
    <AuthContext.Provider
      value={{
        authRun,
      }}
    >
      <AuthModal manualOpen={isAuthModalOpen} setManualOpen={setIsAuthModalOpen} />
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
