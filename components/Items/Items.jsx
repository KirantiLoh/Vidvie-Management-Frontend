import React, { useState } from 'react'
import styles from './Items.module.css'
import RenderIf from '@components/RenderIf'
import axios from 'axios'

const Items = ({items, division, isLeader, showActionForm, setRefetching}) => {

    const [action, setAction] = useState('')
    const [updating, setUpdating] = useState('')
    const [updatedValue, setUpdatedValue] = useState('')
    const [isChecked, setIsChecked] = useState([])

    const bulkRequest = async (e) => { 
      e.preventDefault()
      if (!action || isChecked.length === 0) return
      try {
        if (action === 'Delete') {
          await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${division}`, {
            data: {'isChecked':isChecked}
          })
        } else if (action === 'Update') {
          await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${division}`, {
            'updating': updating, 'updatedValue': updatedValue, 'isChecked':isChecked
          })
        }
      } catch (err) {
        console.error(err)
      }
      setAction('')
      setIsChecked([])
      setUpdating('')
      setUpdatedValue('')
      setRefetching(true)
    }

    const handleActionChange = (e) => {
      setAction(e.target.value)
      setUpdating('')
      setUpdatedValue('')
    }

    const handleUpdatingChange = (e) => {
      setUpdating(e.target.value)
      setUpdatedValue('')
    }

    const setConditionColor = (condition) => {
      if (condition === 'Bad') return '#910810'
      if (condition === 'Second') return '#df9a00'
      if (condition === 'Good') return '#4d9b00' 
    }


  return (
    <>
    <div className={styles.upper}>
        <RenderIf isTrue={isLeader} children={
          <form style={{maxHeight: showActionForm ? '247px' : '0'}} onSubmit={bulkRequest} className={styles.leaderForm}>
            <h3>Bulk Action : </h3>
            <select required id={styles['action']} value={action} onChange={e => handleActionChange(e)}>
              <option value="" disabled hidden>Action</option>
              <option value="Delete">Bulk Delete</option>
              <option value="Update">Bulk Update</option>
            </select>
            {action === "Update" ? (
            <>
              <label htmlFor=""></label>
              <select required id={styles['action']} value={updating} onChange={e => handleUpdatingChange(e)}>
                <option value="" disabled hidden>Field</option>
                <option value="Stock">Stock</option>
                <option value="Condition">Condition</option>
              </select>
            </>
            ) : null}
            {updating === "Stock" ? (
            <input type="number" value={updatedValue} onChange={e => setUpdatedValue(e.target.value)} />
            ) : null}
            {updating === "Condition" ? (
            <select required id={styles['action']} value={updatedValue} onChange={e => setUpdatedValue(e.target.value)}>
              <option value="" disabled hidden>Choose Here</option>
              <option value="Good">Good</option>
              <option value="Second">Second</option>
              <option value="Bad">Bad</option>
            </select>
            ) : null}
            <button type="submit" className='primary-btn'>Submit</button>
          </form>
        }/>
    </div>
    <ul className={styles.items}>
    {items.map(item => {
        return (
            <li key={item.id}>
                <div className={styles.item}>
                    <div className={styles.upperDetail}>
                        <h3 className={styles.itemTitle}>{item.name}</h3>
                        <span style={{backgroundColor: setConditionColor(item.condition)}} className={styles.condition}>{item.condition}</span>
                    </div>
                    <div>
                        <p>Stock : {item.stock}</p>
                    </div>
                </div>
                {isLeader && showActionForm ? <input type="checkbox" value={item.id} checked={isChecked.includes(item.id)} onChange={() => {isChecked.includes(item.id) ? setIsChecked(isChecked.filter(e => e !== item.id)) : setIsChecked([...isChecked, item.id])}} /> : null}
            </li>
        )
    })}
    </ul>
    </>
  )
}

export default Items