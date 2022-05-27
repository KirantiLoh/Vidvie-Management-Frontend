import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import Tasks from '@components/Task/Tasks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faPenToSquare, faFilter } from '@fortawesome/free-solid-svg-icons'
import Title from '@components/Title'
import Requests from '@components/Request/Request'
import axios from 'axios'
import styles from '@styles/Home.module.css'

const TaskByDivision = () => {

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [division, setDivision] = useState('')
  
    const [tasks, setTasks] = useState([])
    const [tasksCurrentPage, setTasksCurrentPage] = useState('')
    const [tasksPrevPage, setTasksPrevPage] = useState('')
    const [tasksNextPage, setTasksNextPage] = useState('')
    const [tasksPageNumber, setTasksPageNumber] = useState(1)
    const [taskPriority, setTaskPriority] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const [taskStartDate, setTaskStartDate] = useState('')
    const [taskEndDate, setTaskEndDate] = useState('')
    const [showTaskActionForm, setShowTaskActionForm] = useState(false)
    const [refetchTasksRequest, setRefetchTasksRequest] = useState(false)


    const [requests, setRequests] = useState([])
    const [requestsCurrentPage, setRequestsCurrentPage] = useState('')
    const [requestsPrevPage, setRequestsPrevPage] = useState('')
    const [requestsNextPage, setRequestsNextPage] = useState('')
    const [requestsPageNumber, setRequestsPageNumber] = useState(1)
    const [requestPriority, setRequestPriority] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestStartDate, setRequestStartDate] = useState('')
    const [requestEndDate, setRequestEndDate] = useState('')
    const [showRequestActionForm, setShowRequestActionForm] = useState(false)

    const [refetchRequestsRequest, setRefetchRequestsRequest] = useState(false)
    const [showTaskFilterForm, setShowTaskFilterForm] = useState(false)
    const [showRequestFilterForm, setShowRequestFilterForm] = useState(false)
  
    const fetchTasks = async () => {
        try {
            let response = await axios.get(tasksCurrentPage)
              let data = await response.data
              if (response.status === 200) {
                setTasks(data.results)
                setTasksNextPage(data.next)
                setTasksPrevPage(data.previous)
              } else {
                setTasks([])
              }
        } catch (err) {
            setTasks([])
        }
        setRefetchTasksRequest(false)
    }

    const clearTaskFilter = () => {
      setTaskPriority('')
      setTaskStatus('')
      setTaskStartDate('')
      setTaskEndDate('')
      setTasksCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/division/${division}?priority=${taskPriority}&status=${taskStatus}&date_added_before=${taskEndDate}&date_added_after=${taskStartDate}`)
      setTasksPageNumber(1)
      setShowTaskFilterForm(false)
    }

    const clearRequestFilter = () => {
      setRequestPriority('')
      setRequestStatus('')
      setRequestStartDate('')
      setRequestEndDate('')
      setRequestsCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/division/${division}?priority=${requestPriority}&status=${requestStatus}&date_added_before=${requestEndDate}&date_added_after=${requestStartDate}`)
      setRequestsPageNumber(1)
      setShowRequestFilterForm(false)
    }
  
    const fetchRequests = async () => {
        try {
          let response = await axios.get(requestsCurrentPage)
              let data = await response.data
              if (response.status === 200) {
                setRequests(data.results)
                setRequestsNextPage(data.next)
                setRequestsPrevPage(data.previous)
              } else {
                setRequests([])
              }
            } catch (err) {
                setRequests([])
            }
            setRefetchRequestsRequest(false)
    }
  
    const goToNextTaskPage = async () => {
      if (tasksNextPage) {
        setTasksCurrentPage(tasksNextPage)
        setTasksPageNumber(tasksPageNumber + 1)
      }
    }
  
    const goToPrevTaskPage = async () => {
      if (tasksPrevPage) {
        setTasksCurrentPage(tasksPrevPage)
        setTasksPageNumber(tasksPageNumber - 1)
      }
    }
  
    const goToNextRequestPage = async () => {
      if (requestsNextPage) {
        setRequestsCurrentPage(requestsNextPage)
        setRequestsPageNumber(requestsPageNumber + 1)
      }
    }
  
    const goToPrevRequestPage = async () => {
      if (requestsPrevPage) {
        setRequestsCurrentPage(requestsPrevPage)
        setRequestsPageNumber(requestsPageNumber - 1)
      }
    }

    const filterTaskResult = (e) => {
      e.preventDefault()
      setTasksCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/division/${division}?priority=${taskPriority}&status=${taskStatus}&date_added_before=${taskEndDate}&date_added_after=${taskStartDate}`)
      setTasksPageNumber(1)
      setShowTaskFilterForm(false)
    }

    const filterRequestResult = (e) => {
      e.preventDefault()
      setRequestsCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/division/${division}?priority=${requestPriority}&status=${requestStatus}&date_added_before=${requestEndDate}&date_added_after=${requestStartDate}`)
      setRequestsPageNumber(1)
      setShowRequestFilterForm(false)
    }

    useEffect(() => {
        if (router.isReady) {
            const { division } = router.query
            setDivision(division)
            setTasksPageNumber(1)
            setRequestsPageNumber(1)
            setTasksCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/division/${division}`)
            setRequestsCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/division/${division}`)
        }
    }, [router.isReady, router.query])
    
  
    useEffect(() => {
        if (tasksCurrentPage) {
            fetchTasks()
        }
    }, [tasksCurrentPage, refetchTasksRequest])

    useEffect(() => {
        if (requestsCurrentPage) {
            fetchRequests()
        }
    }, [requestsCurrentPage, refetchRequestsRequest])

  return (
    <div>
        <Title text={`${(division.charAt(0).toUpperCase()+division.slice(1)).replace('-', ' ')}`}/>
        <div className='upper'>
          <h2>Tasks</h2>
          <div>
            <span onClick={() => setShowTaskFilterForm(!showTaskFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
            {tasks.length > 0 && tasks[0]?.requestee_division?.leader?.user.username === user.username ? <span onClick={() => setShowTaskActionForm(!showTaskActionForm)}><FontAwesomeIcon icon={faPenToSquare}/></span> : null}
          </div>
        </div>
        <form onSubmit={e => filterTaskResult(e)} className={styles.filterForm} style={{height: showTaskFilterForm ? '414px' : '0'}}>
          <h3>Filter by : </h3>
          <label htmlFor="">Status</label>
          <select value={taskStatus} onChange={e => setTaskStatus(e.target.value)}>
            <option value="">None</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipping">Shipping</option>
            <option value="Finished">Finished</option>
          </select>
          <label htmlFor="">Priority</label>
          <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <label htmlFor="">Start Date</label>
          <input type="date" value={taskStartDate} onChange={e => setTaskStartDate(e.target.value)}/>
          <label htmlFor="">End Date</label>
          <input type="date" value={taskEndDate} onChange={e => setTaskEndDate(e.target.value)}/>
          <button className="primary-btn">Filter</button>
          <button className="secondary-btn" onClick={() => clearTaskFilter()}>Clear</button>
        </form>
        <Tasks tasks={tasks} division={division} isLeader={tasks[0]?.requestee_division?.leader?.user?.username === user.username} inTaskbyDivisionPage={true} showActionForm={showTaskActionForm} setShowActionForm={setShowTaskActionForm} setRefetching={setRefetchTasksRequest}/>
        {tasks.length > 0 ?
          <ul className="paginations">
            {tasksPrevPage ? <li onClick={() => goToPrevTaskPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowLeft}/></li> : <li></li>}
            <li>{tasksPageNumber}</li>
            {tasksNextPage ? <li onClick={() => goToNextTaskPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowRight}/></li> : <li></li>}
          </ul> : null}
        <div className='upper'>
          <h2>Requests</h2>
          <div>
            <span onClick={() => setShowRequestFilterForm(!showRequestFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
            {requests.length > 0 && requests[0]?.requestor_division?.leader?.user.username === user.username ? <span onClick={() => setShowRequestActionForm(!showRequestActionForm)}><FontAwesomeIcon icon={faPenToSquare}/></span> : null}
          </div>
        </div>
        <form onSubmit={e => filterRequestResult(e)} className={styles.filterForm} style={{height: showRequestFilterForm ? '414px' : '0'}}>
          <h3>Filter by : </h3>
          <label htmlFor="">Status</label>
          <select value={requestStatus} onChange={e => setRequestStatus(e.target.value)}>
            <option value="">None</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipping">Shipping</option>
            <option value="Finished">Finished</option>
          </select>
          <label htmlFor="">Priority</label>
          <select value={requestPriority} onChange={e => setRequestPriority(e.target.value)}>
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <label htmlFor="">Start Date</label>
          <input type="date" value={requestStartDate} onChange={e => setRequestStartDate(e.target.value)}/>
          <label htmlFor="">End Date</label>
          <input type="date" value={requestEndDate} onChange={e => setRequestEndDate(e.target.value)}/>
          <button className="primary-btn">Filter</button>
          <button className="secondary-btn" onClick={() => clearRequestFilter()}>Clear</button>
        </form>
        <Requests setShowActionForm={setShowRequestActionForm} showActionForm={showRequestActionForm} setRefetching={setRefetchRequestsRequest} division={division} requests={requests} isLeader={requests[0]?.requestor_division?.leader?.user.username === user.username} inRequestbyDivisionPage={true}/>
        {requests.length > 0 ?
          <ul className="paginations">
            {requestsPrevPage ? <li onClick={() => goToPrevRequestPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowLeft}/></li> : <li></li>}
            <li>{requestsPageNumber}</li>
            {requestsNextPage ? <li onClick={() => goToNextRequestPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowRight}/></li> : <li></li>}
          </ul> : null}
    </div>
  )
}

export default withProtected(TaskByDivision)