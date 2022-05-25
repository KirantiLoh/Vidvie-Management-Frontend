import RenderIf from '@components/RenderIf'
import React, { useState } from 'react'
import styles from './Requests.module.css'
import Link from 'next/link'
import axios from 'axios'

const Requests = ({showActionForm, setShowActionForm, requests, isLeader, inRequestbyDivisionPage, division, setRefetching}) => {

  const [action, setAction] = useState('')
  const [updating, setUpdating] = useState('')
  const [updatedValue, setUpdatedValue] = useState('')
  const [isChecked, setIsChecked] = useState([])

  const bulkRequest = async (e) => { 
    e.preventDefault()
    if (!action || isChecked.length === 0) return
    try {
      if (action === 'Delete') {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/division/${division}`, {
          data: {'isChecked':isChecked}
        })
      } else if (action === 'Update') {
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/division/${division}`, {
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
    if (status === 'In Progress') return '#7a7702'
    if (status === 'Shipping') return '#df3600' 
    if (status === 'Finished') return '#497e14'
  }

  return (
    <>
    <div className={styles.upper}>
      <RenderIf isTrue={isLeader && inRequestbyDivisionPage} children={
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
              <option value="Status">Status</option>
              <option value="Priority">Priority</option>
              <option value="Deadline">Deadline</option>
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
          {updating === "Priority" ? (
          <select required id={styles['action']} value={updatedValue} onChange={e => setUpdatedValue(e.target.value)}>
            <option value="" disabled hidden>Choose Here</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          ) : null}
          {updating === 'Deadline' ? (<input type="datetime-local" value={updatedValue} onChange={e => setUpdatedValue(e.target.value)}/>) : null}
          <button type="submit" className='primary-btn'>Submit</button>
        </form>
      }/>
    </div>
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
                  <p className={styles.priority} style={{backgroundColor: setPriorityColor(request.priority)}}>{request.priority}</p>
                  <p className={styles.status} style={{backgroundColor: setStatusColor(request.status)}}>{request.status}</p>
                </div>
                </div>
                <p>Requesting to :  {request.requestee_division.name}</p>
                <p>Requested on : {(new Date(request.date_added)).toLocaleString()}</p>
                <p>Deadline : {(new Date(request.deadline)).toLocaleString()}</p>
              </div>
              {isLeader && inRequestbyDivisionPage && showActionForm ? <input type="checkbox" value={request.id} checked={isChecked.includes(request.id)} onChange={() => {isChecked.includes(request.id) ? setIsChecked(isChecked.filter(e =>  e !== request.id)) : setIsChecked([...isChecked, request.id])}} /> : null}
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