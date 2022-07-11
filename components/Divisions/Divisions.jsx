import Link from 'next/link'

import styles from './Divisions.module.css'

const Divisions = ({divisions}) => {
  return (
    <ul className={styles.divisions}>
        {divisions.length > 0 ? divisions.map(division => {
            return (
                <li key={division.id}>
                    <h2>
                        <Link href={`/divisions/${division.slug}`}>
                            {division.name}
                        </Link>
                    </h2>
                    <small>{division.leader?.user.first_name ? `Leader : ${division.leader?.user.first_name} ${division.leader?.user.last_name}` : (division.leader?.user.username ? `Leader : ${division.leader?.user.username}` : null)}</small>
                </li>
            )
        }) : <li>No Divisions</li>}
    </ul>
  )
}

export default Divisions