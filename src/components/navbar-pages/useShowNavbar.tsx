'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

// Create the context
const ShowNavBarContext = createContext<
  | {
      showNavBar: boolean
      setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

// Create a custom hook to access the context values
export const useShowNavBarContext = () => {
  const context = useContext(ShowNavBarContext)
  if (!context) {
    throw new Error(
      'useShowNavBarContext must be used within a ShowNavBarProvider',
    )
  }
  return context
}

// Create the provider component
export const ShowNavBarProvider = ({ children }: { children: ReactNode }) => {
  const [showNavBar, setShowNavBar] = useState(true)

  return (
    <ShowNavBarContext.Provider value={{ showNavBar, setShowNavBar }}>
      {children}
    </ShowNavBarContext.Provider>
  )
}

// Usage example
export const useShowNavBar = () => {
  const { showNavBar, setShowNavBar } = useShowNavBarContext()
  // console.log('showNavBar', showNavBar)
  return {
    showNavBar,
    setShowNavBar,
  }
}
