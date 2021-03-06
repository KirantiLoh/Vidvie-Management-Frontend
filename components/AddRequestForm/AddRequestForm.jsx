import { AuthContext } from '@context/AuthContext'
import axios from 'axios'
import  { useContext, useState, useEffect } from 'react'
import styles from './AddRequestForm.module.css'
import { ModalContext } from '@context/ModalContext'

const AddRequestForm = () => {

    const { user } = useContext(AuthContext)
    const { setShowModal, setModalType, setMessage } = useContext(ModalContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')
    const [requestor, setRequestor] = useState('')
    const [requestee, setRequestee] = useState('')
    const [divisionsChoices, setDivisionsChoices] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let deadlineDate = (new Date(deadline)).toISOString()
        if (!title || !description || !priority || !requestor || !deadline) return
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                "title": title, 
                "description": description, 
                "priority": priority, 
                "status": "Not Started", 
                "deadline": deadlineDate, 
                "requestor_division": requestor, 
                "requestee_division": requestee
            })
            let data = await response.data
            if (response.status === 201) {
                setMessage(data.message)
                setModalType('success')
            }
        } catch (err) {
            console.error(err)
            setMessage(err)
            setModalType('error')
        } finally {
            setTitle('')
            setDescription('')
            setDeadline('')
            setPriority('')
            setRequestor('')
            setRequestee('')
            setShowModal(true)
        }

    }

    const resetForm = (e) => {
        e.preventDefault()
        setTitle('')
        setDescription('')
        setDeadline('')
        setPriority('')
        setRequestor('')
        setRequestee('')
    }


  const getDivisions = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions`)
    let data = await response.data
    if (response.status === 200) {
      setDivisionsChoices(data)
    }
  }

  useEffect(() => {
      getDivisions()
  }, [])

  return (
    <>
        <form onSubmit={e => handleSubmit(e)} className={styles.addRequestForm}>
            <label htmlFor="">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required type="text" placeholder='Title' />
            <label htmlFor="">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder='Description' cols="30" rows="10"></textarea>
            <label htmlFor={styles['deadline']}>Deadline</label>
            <input id={styles['deadline']} value={deadline} onChange={e => setDeadline(e.target.value)} required type="datetime-local" placeholder='Deadline' />
            <label htmlFor={styles['priority']}>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} required id={styles['division']}>
                <option value="" disabled hidden>Choose here</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <label htmlFor={styles['division']}>Requested By</label>
            <select value={requestor} onChange={e => setRequestor(e.target.value)} required id={styles['priority']}>
                <option value="" disabled hidden>Choose here</option>
                {user.division === 'Branding' && divisionsChoices.length > 0 ? divisionsChoices.map((divisionChoice) => {
                    return  <option key={divisionChoice.id} value={divisionChoice.name}>{divisionChoice.name}</option>
                }) : <option value={user.division}>{user.division}</option>}
                {user.division === 'Direksi' ? <option value="Vidvie">Vidvie</option> : null}
            </select>
            <label htmlFor={styles['requestee']}>Requesting to</label>
            <select value={requestee} onChange={e => setRequestee(e.target.value)} required>
                <option value="" disabled hidden>Choose here</option>
                {divisionsChoices.length > 0 ? divisionsChoices.map((divisionChoice) => {
                    return  <option key={divisionChoice.id} value={divisionChoice.name}>{divisionChoice.name}</option>
                }) : null}
            </select>
            <button type="submit" className='primary-btn'>Add</button>
            <button type='reset' onClick={resetForm} className='secondary-btn'>Reset</button>
        </form>
    </>
  )
}

export default AddRequestForm