import RenderIf from '@components/RenderIf'
import React from 'react'
import styles from './Tasks.module.css'
import Link from 'next/link'

const Tasks = ({tasks, isLeader, inTaskbyDivisionPage}) => {

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
        <>
  
        </>
      }/>
      <ul className={styles.tasks}>
        {tasks.length > 0 ? tasks.map((task) => {
          return (
            <li key={task.id} className={styles.task}>
              {isLeader && inTaskbyDivisionPage ? <input type="checkbox" name="" id="" /> : null}
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