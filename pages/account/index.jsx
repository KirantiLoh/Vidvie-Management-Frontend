import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import React, { useContext } from 'react'

const AccountPage = () => {

  const { user } = useContext(AuthContext)

  return (
    <div>
      <Title text={"Account"}/>
      <p>Username : {user.name}</p>
      <p>Division : {user.division}</p>
      <p>{user.leader_of ? `Leader of ${user.leader_of}` : null}</p>
    </div>
  )
}

export default withProtected(AccountPage)