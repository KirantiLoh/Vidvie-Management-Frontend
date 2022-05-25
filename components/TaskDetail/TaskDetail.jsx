import RenderIf from '@components/RenderIf'
import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import React, { useState, useContext, useEffect } from 'react'
import styles from './TaskDetail.module.css'
import Modal from '@components/Modal/Modal'
import { useRouter } from 'next/router'

const TaskDetail = ({taskDetail, setRefetchRequest}) => {

    const { user, authToken } = useContext(AuthContext)

    const router = useRouter()

    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [deadline, setDeadline] = useState('')
    const [dateAdded, setDateAdded] = useState('')
    const [priority, setPriority] = useState('')
    const [requestor, setRequestor] = useState('')
    const [requestee, setRequestee] = useState('')
    const [currentRequestor, setCurrentRequestor] = useState('')
    const [divisionsChoices, setDivisionsChoices] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [message, setMessage] = useState('')

    const getDivisions = async () => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${authToken.access}`
          }
        })
        let data = await response.json()
        if (response.status === 200) {
          setDivisionsChoices(data)
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !status || !priority || !requestor || !deadline) return
        let deadlineDate = (new Date(deadline)).toISOString()
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${authToken.access}`
                },
                body: JSON.stringify({"title": title, "description": description, "priority": priority, "status": status, "deadline": deadlineDate, "requestor_division": (typeof requestor === 'object' ? requestor.name : requestor), "requestee_division": (typeof requestee === 'object' ? requestee.name : requestee)})
            })
            let data = await response.json()
            if (response.status === 200) {
                setMessage(data.message)
                setModalType('success')
            }
        } catch (err) {
            console.error(err)
            setMessage(err)
            setModalType('error')
        } finally {
            setShowModal(true)
            setRefetchRequest(true)
        }
    }

    const deleteTask = async () => {
        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `${process.env.NEXT_PUBLIC_AUTH_HEADER_TYPE} ${authToken.access}`
                },
            })
            let data = await response.json()
            if (response.status === 200) {
                router.back()
            }
        } catch (err) {
            console.error(err)
            setMessage(err)
            setModalType('error')
        }
    }
    
      useEffect(() => {
          getDivisions()
      }, [])

      useEffect(() => {
        setId(taskDetail.id)
        setTitle(taskDetail.title)
        setDescription(taskDetail.description)
        setDateAdded((taskDetail.date_added)?.split("+")[0])
        setDeadline((taskDetail.deadline)?.split("+")[0])
        setPriority(taskDetail.priority)
        setStatus(taskDetail.status)
        setRequestor(taskDetail.requestor_division)
        setCurrentRequestor(taskDetail.requestor_division)
        setRequestee(taskDetail.requestee_division)
      }, [taskDetail])

  return (
    <RenderIf isTrue={user.username === currentRequestor?.leader?.user.username} children={
        <>
        <form onSubmit={e => handleSubmit(e)} className={styles.addRequestForm}>
            <Title text={`Edit Request : ${title}`}/>
            <label htmlFor={styles['title']}>Title</label>
            <input id={styles['title']} value={title} onChange={e => setTitle(e.target.value)} required type="text" placeholder='Title' />
            <label htmlFor={styles['desc']}>Description</label>
            <textarea id={styles['desc']} value={description} onChange={e => setDescription(e.target.value)} required placeholder='Description' cols="30" rows="10"></textarea>
            <label htmlFor={styles['status']}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} required id={styles['status']}>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Shipping">Shipping</option>
                <option value="Finished">Finished</option>
            </select>
            <label htmlFor={styles['deadline']}>Deadline</label>
            <input id={styles['deadline']} value={deadline} onChange={e => setDeadline(e.target.value)} required type="datetime-local" placeholder='Deadline' />
            <label htmlFor={styles['priority']}>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} required id={styles['division']}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <label htmlFor={styles['division']}>Requested By</label>
            <select value={requestor?.name} onChange={e => setRequestor(e.target.value)} required id={styles['priority']}>
                {user.division === 'Branding' && divisionsChoices.length > 0 ? divisionsChoices.map((divisionChoice) => {
                    return  <option key={divisionChoice.id} value={divisionChoice.name}>{divisionChoice.name}</option>
                }) : null}
                {user.division === 'Direksi' ? <option value="Vidvie">Vidvie</option> : null}
            </select>
            <label htmlFor={styles['requestee']}>Requested to</label>
            <select value={requestee?.name} onChange={e => setRequestee(e.target.value)} required>
                {divisionsChoices.length > 0 ? divisionsChoices.map((divisionChoice) => {
                    return  <option key={divisionChoice.id} value={divisionChoice.name}>{divisionChoice.name}</option>
                }) : null}
            </select>
            <p>Requested on : {(new Date(dateAdded)).toLocaleString()}</p>
            <button type="submit" className='primary-btn'>Update</button>
            <button type='button' onClick={() => deleteTask()} className="secondary-btn">Delete</button>
        </form>
        <Modal type={modalType} message={message} showModal={showModal} onClose={() => setShowModal(false)}/>
    </>
    } otherChoice={
        <div className={styles.taskDetail}>
            <Title text={title}/>
            <p>Description : {description}</p>
            <p>Status : {status}</p>
            <p>Priority : {priority}</p>
            <p>Requested by :  {requestor?.name ? requestor.name : requestor}</p>
            <p>Requested to : {requestee?.name ? requestee.name : requestee}</p>
            <p>Requested on : {(new Date(dateAdded)).toLocaleString()}</p>
            <p>Deadline : {(new Date(deadline)).toLocaleString()}</p>
        </div>
    }/>
  )
}

export default TaskDetail