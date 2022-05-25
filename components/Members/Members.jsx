import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './Members.module.css'

const Members = ({members, leader}) => {

  return (
    <ul className={styles.members}>
        <h2>Members</h2>
      {members.length > 0 ? members.map((member) => {
        return (
          <li key={member.id} className={styles.member}>
              <h3>{member.user.first_name ? `${member.user.first_name} ${member.user.last_name}` : member.user.username} {`${leader?.user.first_name} ${leader?.user.last_name}` === `${member.user.first_name} ${member.user.last_name}` ? <FontAwesomeIcon icon={faCrown}/> : null}</h3>
          </li>
        )
      }) : null}
    </ul>
  )
}

export default Members