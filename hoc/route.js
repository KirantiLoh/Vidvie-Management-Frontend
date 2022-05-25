import { AuthContext } from '@context/AuthContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@components/LoadingScreen/LoadingScreen'

export const withProtected = (Component) => {
  return function WithProtected(props) {

    const router = useRouter()

    const { isAuthenticated, loading } = useContext(AuthContext)

    useEffect(() => {
      if (!loading && !isAuthenticated) {
         router.replace('/account/login')
      }
    }, [loading, isAuthenticated]) 
    if (loading || !isAuthenticated) {
      return <LoadingScreen/>
    }
    return <Component {...props}/>
  }
}

export const withPublic = (Component) => {
  return function WithPublic(props) {

    const router = useRouter()

    const { isAuthenticated, loading } = useContext(AuthContext)

    useEffect(() => {
      if (!loading && isAuthenticated) {
         router.replace('/')
      }
    }, [loading, isAuthenticated]) 
    if (loading || isAuthenticated) {
      return <LoadingScreen/>
    }
    return <Component {...props}/>
  }
}