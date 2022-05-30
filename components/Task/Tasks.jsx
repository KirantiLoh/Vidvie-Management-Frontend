import React, { useState } from 'react'
import styles from './Tasks.module.css'
import Link from 'next/link'
import axios from 'axios'

const Tasks = ({tasks, division, isLeader, inTaskbyDivisionPage, setRefetching}) => {

  const changeTaskStatus = async (e, task) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${task.id}`, 
      {"title": task.title, "description": task.description, "priority": task.priority, "status": e.target.value, "deadline": task.deadline, "requestor_division": (typeof task.requestor_division === 'object' ? task.requestor_division.name : task.requestor), "requestee_division": (typeof task.requestee_division === 'object' ? task.requestee_division.name : task.requestee)})
    } catch (err) {
      console.error(err)
    }
    setRefetching(true)
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
                  {isLeader ? 
                    <select className={styles.status} style={{backgroundColor: setStatusColor(task.status), border: 'none'}} value={task.status} onChange={e => changeTaskStatus(e, task)}>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Finished">Finished</option>
                    </select> :
                    <p className={styles.status} style={{backgroundColor: setStatusColor(task.status)}}>{task.status}</p>}
                </div>
              </div>
              <div className={styles.details}>
                <p>Requested by : {task.requestor_division.name}</p>
                {!inTaskbyDivisionPage ? <p>Requested to : {task.requestee_division.name}</p> : null}
                <p>Date Added : {(new Date(task.date_added)).toLocaleString()}</p>
                <p>Deadline : {(new Date(task.deadline)).toLocaleString()}</p>
              </div>
              </div>
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