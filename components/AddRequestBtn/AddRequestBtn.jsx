import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from './AddRequestBtn.module.css'

const AddRequestBtn = () => {
  return (
    <Link href={'/tasks/add'}>
        <a className={styles.addRequestBtn}><FontAwesomeIcon icon={faPlus}/></a>
    </Link>
  )
}

export default AddRequestBtn