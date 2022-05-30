import React from 'react'
import styles from './Requests.module.css'
import Link from 'next/link'
import axios from 'axios'

const Requests = ({showActionForm, setShowActionForm, requests, isLeader, setRefetching}) => {

  const changeRequestStatus = async (e, request) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${request.id}`, 
      {"title": request.title, "description": request.description, "priority": request.priority, "status": e.target.value, "deadline": request.deadline, "requestor_division": (typeof request.requestor_division === 'object' ? request.requestor_division.name : request.requestor), "requestee_division": (typeof request.requestee_division === 'object' ? request.requestee_division.name : request.requestee)})
    } catch (err) {
      console.error(err)
    }
    setRefetching(true)
  }

  const changeRequestPriority = async (e, request) => {
    e.preventDefault()
    console.log(e.target.value)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${request.id}`, 
      {"title": request.title, "description": request.description, "priority": e.target.value, "status": request.status, "deadline": request.deadline, "requestor_division": (typeof request.requestor_division === 'object' ? request.requestor_division.name : request.requestor), "requestee_division": (typeof request.requestee_division === 'object' ? request.requestee_division.name : request.requestee)})
    } catch (err) {
      console.error(err)
    }
    setRefetching(true)
  }

  const setPriorityColor = (priority) => {
    if (priority === 'High') return 'var(--status-not-started-background-color)'
    if (priority === 'Medium') return 'var(--status-shipping-background-color)' 
    else return 'var(--status-finished-background-color)'
  }

  const setStatusColor = (status) => {
    if (status === 'Not Started') return '#910810'
    if (status === 'In Progress') return 'var(--status-in-progress-background-color)'
    if (status === 'Shipping') return 'var(--status-shipping-background-color)' 
    if (status === 'Finished') return 'var(--status-finished-background-color)'
  }

  return (
    <>
      <ul className={styles.requests}>
        {requests.length > 0 ? requests.map((request) => {
          return (
            <li key={request.id} className={styles.requestContainer}>
              <div className={styles.request}>
                <div className={styles.upperDetail}>
                <h3 className={styles.requestTitle}>
                  <Link href={`/tasks/${request.id}`}>
                    <a>
                      {request.title}
                    </a>
                  </Link>
                </h3>
                <div className={styles.priorityAndStatus}>
                  {isLeader ? 
                  <select className={styles.status} style={{backgroundColor: setPriorityColor(request.priority), border: 'none'}} value={request.priority} onChange={e => changeRequestPriority(e, request)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>: 
                    <p className={styles.priority} style={{backgroundColor: setPriorityColor(request.priority)}}>{request.priority}</p>}
                  {isLeader ? 
                    <select className={styles.status} style={{backgroundColor: setStatusColor(request.status), border: 'none'}} value={request.status} onChange={e => changeRequestStatus(e, request)}>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Finished">Finished</option>
                    </select> :
                    <p className={styles.status} style={{backgroundColor: setStatusColor(request.status)}}>{request.status}</p>}
                </div>
                </div>
                <p>Requesting to :  {request.requestee_division.name}</p>
                <p>Requested on : {(new Date(request.date_added)).toLocaleString()}</p>
                <p>Deadline : {(new Date(request.deadline)).toLocaleString()}</p>
              </div>
            </li>
          )
        }) : 
        <li>
          <h3>No Requests</h3>
        </li>}
      </ul>
    </>
  )
}

export default Requests