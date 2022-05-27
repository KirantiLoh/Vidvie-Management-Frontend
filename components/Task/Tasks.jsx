import RenderIf from '@components/RenderIf'
import React, { useState } from 'react'
import styles from './Tasks.module.css'
import Link from 'next/link'
import axios from 'axios'

const Tasks = ({tasks, division, isLeader, inTaskbyDivisionPage, showActionForm, setShowActionForm, setRefetching}) => {

  const [action, setAction] = useState('')
  const [updating, setUpdating] = useState('')
  const [updatedValue, setUpdatedValue] = useState('')
  const [isChecked, setIsChecked] = useState([])

  const bulkRequest = async (e) => { 
    e.preventDefault()
    console.log(action, updating, updatedValue, isChecked)
    if (!action || isChecked.length === 0) return
    try {
      if (action === 'Update') {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/division/${division}`, {
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
    setShowActionForm(false)
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

  const setPriorityColor = (priority) => {
    if (priority === 'High') return '#910810'
    if (priority === 'Medium') return '#df3600' 
    else return '#497e14'
  }

  const setStatusColor = (status) => {
    if (status === 'Not Started') return '#910810'
    if (status === 'In Progress') return '#df9a00'
    if (status === 'Shipping') return '#df3600' 
    if (status === 'Finished') return '#497e14'
  }

  return (
    <>
      <RenderIf isTrue={isLeader && inTaskbyDivisionPage} children={
        <form style={{maxHeight: showActionForm ? '247px' : '0'}} onSubmit={bulkRequest} className={styles.leaderForm}>
          <h3>Bulk Action : </h3>
          <select required id={styles['action']} value={action} onChange={e => handleActionChange(e)}>
            <option value="" disabled hidden>Action</option>
            <option value="Update">Bulk Update</option>
          </select>
          {action === "Update" ? (
          <>
            <label htmlFor=""></label>
            <select required id={styles['action']} value={updating} onChange={e => handleUpdatingChange(e)}>
              <option value="" disabled hidden>Field</option>
              <option value="Status">Status</option>
            </select>
          </>
          ) : null}
          {updating === "Status" ? (
          <select required id={styles['action']} value={updatedValue} onChange={e => setUpdatedValue(e.target.value)}>
            <option value="" disabled hidden>Choose Here</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipping">Shipping</option>
            <option value="Finished">Finished</option>
          </select>
          ) : null}
          <button type="submit" className='primary-btn'>Submit</button>
        </form>
      }/>
      <ul className={styles.tasks}>
        {tasks.length > 0 ? tasks.map((task) => {
          return (
            <li key={task.id} className={styles.task}>
              <div className={styles.taskContainer}>
              <div className={styles.upperDetail}>
              <h3 className={styles.taskTitle}>
                  <Link href={`/tasks/${task.id}`}>
                    <a>
                      {task.title}
                    </a>
                  </Link>
                </h3>
                <div className={styles.priorityAndStatus}>
                  <p className={styles.priority} style={{backgroundColor: setPriorityColor(task.priority)}}>{task.priority}</p>
                  <p className={styles.status} style={{backgroundColor: setStatusColor(task.status)}}>{task.status}</p>
                </div>
              </div>
              <div className={styles.details}>
                <p>Requested by : {task.requestor_division.name}</p>
                {!inTaskbyDivisionPage ? <p>Requested to : {task.requestee_division.name}</p> : null}
                <p>Date Added : {(new Date(task.date_added)).toLocaleString()}</p>
                <p>Deadline : {(new Date(task.deadline)).toLocaleString()}</p>
              </div>
              </div>
              {isLeader && inTaskbyDivisionPage && showActionForm ? <input type="checkbox" value={task.id} onChange={() => isChecked.includes(task.id) ? setIsChecked(isChecked.filter(e => e !== task.id)) : setIsChecked([...isChecked, task.id])} checked={isChecked.includes(task.id)}/> : null}
            </li>
          )
        }) : 
        <li>
          <h3>No tasks</h3>
        </li>}
      </ul>
    </>
  )
}

export default Tasks