import Link from 'next/link'
import React from 'react'
import styles from './StockByDivisions.module.css'

const StockByDivisions = ({divisions}) => {
  return (
    <ul className={styles.divisions}>
        {divisions.map(division => {
            return (
                <li key={division.id}>
                    <h2>
                        <Link href={`/stocks/division/${division.slug}`}>
                            {division.name}
                        </Link>
                    </h2>
                </li>
            )
        })}
    </ul>
  )
}

export default StockByDivisions