import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import React, { useContext } from 'react'

const AccountPage = () => {

  const { user } = useContext(AuthContext)

  return (
    <div>
      <Title text={"Account"}/>
      <h1>Username : {user.name}</h1>
      <h1>Division : {user.division}</h1>
      <h1>{user.leader_of ? `Leader of ${user.leader_of}` : null}</h1>
    </div>
  )
}

export default withProtected(AccountPage)