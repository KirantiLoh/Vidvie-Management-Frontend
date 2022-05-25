import DownloadPage from '@components/DownloadPage/DownloadPage'
import React, { createContext, useEffect, useState } from 'react'

export const PWAChecker = createContext()

export const PWACheckerProvider = ({children}) => {

    const [isPWAMode, setIsPWAMode] = useState(false)

    useEffect(() => {
        if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)')) {
            setIsPWAMode(true)
        }
    }, [])

  return (
    <PWAChecker.Provider value={{}}>
        {isPWAMode ? children : <DownloadPage/>}
    </PWAChecker.Provider>
  )
}
