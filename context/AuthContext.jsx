import React, {createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'
import LoadingScreen from '@components/LoadingScreen/LoadingScreen'
import SideNav from '@components/SideNav/SideNav'
import AddRequestBtn from '@components/AddRequestBtn/AddRequestBtn'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authToken, setAuthToken] = useState({})
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    const loginUser = async (username, password) => {
        if (!username || !password) return
        try {
            let response = await fetch('/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username':username, 'password':password})
            })
            let data = await response.json()
            if (response.status === 200) {
                setAuthToken(data)
                const userData = jwtDecode(data.access)
                setUser({"username":userData.username, "name":userData.name, "division":userData.division, "leader_of": userData.leader_of})
                setIsAuthenticated(true)
                router.replace('/')
                return ["Login successful", response.status]
            } else {
                return [data, response.status]
            }
        } catch (err) {
            console.error(err)
            logoutUser()
        }
    }

    const logoutUser = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST'
        })
        setUser('')
        setAuthToken('')
        setIsAuthenticated(false)
        router.replace('/account/login')
    }

    const refreshingToken = async () => {
        try {
            let response = await fetch('/api/auth/refresh',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json()
            if (response.status === 200) {
                setAuthToken(data)
                const userData = jwtDecode(data.access)
                setUser({"username":userData.username, "name":userData.name, "division":userData.division, "leader_of": userData.leader_of})
                setIsAuthenticated(true)
                setLoading(false)
                return data.access
            } else {
                
            }
        } catch (err) {
            console.error(err)
            logoutUser()
        }
        setLoading(false)
    }

    const contextData = {
        user: user,
        authToken: authToken,
        isAuthenticated: isAuthenticated,
        loginUser: loginUser,
        logoutUser: logoutUser,
        refreshingToken: refreshingToken,
        loading: loading,
        setLoading: setLoading,
    }
    
    useEffect(() => {
        refreshingToken()
    }, [])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <LoadingScreen/> : 
            <main className="main-content">
                {isAuthenticated ? <><SideNav/><AddRequestBtn/></> : null}
                <div className="children" style={{padding: isAuthenticated ? '10px' : '0'}}>
                    {children}
                </div>
            </main>}
        </AuthContext.Provider>
    )
}

