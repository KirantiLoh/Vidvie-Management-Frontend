import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import Link from 'next/link'
import React, { useContext } from 'react'

const AccountPage = () => {

  const { user } = useContext(AuthContext)

  return (
    <div>
      <Title text={"Account"}/>
      <p>Username : {user.name}</p>
      <p>Division : {user.division}</p>
      <p>{user.leader_of ? `Leader of ${user.leader_of}` : null}</p>
      <Link href='/account/roll-call'>
        <a className='primary-btn' style={{display: 'inline-block'}}>Roll Call</a>
      </Link>

    </div>
  )
}

export default withProtected(AccountPage)