import React, { useState } from 'react'
import styles from './Items.module.css'
import axios from 'axios'
import Link from 'next/link'

const Items = ({items, division, isLeader, setRefetching}) => {

    const changeItemCondition = async (e, item) => {
      e.preventDefault()
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${item.id}`,
      {"name": item.name, "condition": e.target.value, "function": item.function, "stock": item.stock})
      setRefetching(true)
    }

    const setConditionColor = (condition) => {
      if (condition === 'Bad') return '#910810'
      if (condition === 'Second') return '#df9a00'
      if (condition === 'Good') return '#4d9b00' 
    }
    
  return (
    <>
    <ul className={styles.items}>
    {items.map(item => {
        return (
            <li key={item.id}>
                <div className={styles.item}>
                    <div className={styles.upperDetail}>
                        <h3 className={styles.itemTitle}>
                          <Link href={`/stocks/${item.id}`}>
                            <a>
                            {item.name}
                            </a>
                          </Link>
                        </h3>
                        {isLeader ? 
                        <select required style={{backgroundColor: setConditionColor(item.condition), border: 'none'}} className={styles.condition} value={item.condition} onChange={e => changeItemCondition(e, item)}>
                          <option value="Good">Good</option>
                          <option value="Second">Second</option>
                          <option value="Bad">Bad</option>
                        </select> : 
                        <span style={{backgroundColor: setConditionColor(item.condition)}} className={styles.condition}>{item.condition}</span>
                      }
                    </div>
                    <div>
                        <p>Stock : {item.stock}</p>
                        <p>Date Updated : {(new Date(item.date_updated)).toLocaleString()}</p>
                    </div>
                </div>
            </li>
        )
    })}
    </ul>
    </>
  )
}

export default Items