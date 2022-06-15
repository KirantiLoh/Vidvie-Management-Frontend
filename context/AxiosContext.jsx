import React, { useContext, createContext } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'

export const AxiosContext = createContext()

export const AxiosProvider = ({children}) => {

    const { authToken, refreshingToken } = useContext(AuthContext)

    axios.defaults.headers.common['Accept'] = 'application/json'
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Authorization'] = `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${authToken.access}`

    
    axios.interceptors.response.use(async response => {
        return response
    }, async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            let access = await refreshingToken()
            axios.defaults.headers.common['Authorization'] = `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${access}`
            originalRequest.headers.Authorization = `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${access}`
            return await axios(originalRequest)
        } 
        return Promise.reject(error)
    })

  return (
    <AxiosContext.Provider value={{}}>
        {children}
    </AxiosContext.Provider>
  )
}

