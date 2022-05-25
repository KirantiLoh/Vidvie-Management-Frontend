import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import { useRouter } from 'next/router'
import React, { useEffect, useContext } from 'react'

const Logout = () => {

    const { logoutUser } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        logoutUser()
        router.replace('/account/login')
    }, [])
}

export default withProtected(Logout)