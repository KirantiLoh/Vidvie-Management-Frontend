import Tasks from '@components/Task/Tasks'
import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import { faArrowLeft, faArrowRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import styles from '@styles/Home.module.css'
import { withProtected } from '@hoc/route'

const RecentTasks = () => {

    const [recentTasks, setRecentTasks] = useState([])
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [currentPage, setCurrentPage] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks?priority=${priority}&status=${status}`)
    const [showFilterForm, setShowFilterForm] = useState(false)

    const { user } = useContext(AuthContext)

    const filterResult = (e) => {
      e.preventDefault()
      setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks?priority=${priority}&status=${status}&date_added_before=${endDate}&date_added_after=${startDate}`)
      setPageNumber(1)
      setShowFilterForm(false)
    }

    const clearFilter = () => {
      setPriority('')
      setStatus('')
      setStartDate('')
      setEndDate('')
      setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks?priority=${priority}&status=${status}&date_added_before=${endDate}&date_added_after=${startDate}`)
      setPageNumber(1)
      setShowFilterForm(false)
    }

    const getRecentTasks = async () => {
        let response = await axios.get(currentPage)
        if (response.status === 200) {
          let data = await response.data
          setRecentTasks(data.results)
          setPrevPage(data.previous)
          setNextPage(data.next)
        }
    }

    const goToNextPage = () => {
        if (nextPage) {
            setCurrentPage(nextPage)
            setPageNumber(pageNumber + 1)  
        }
    }

    const goToPrevPage = () => {
        if (prevPage) {
            setCurrentPage(prevPage)
            setPageNumber(pageNumber - 1)  
        }
    }

    useEffect(() => {
        getRecentTasks()
    }, [currentPage])

  return (
    <>
        <Title text={`Welcome ${user.name}`}/>
        <div className='upper'>
          <h2>Recent Tasks</h2>
          <span onClick={() => setShowFilterForm(!showFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
        </div>
        <form onSubmit={e => filterResult(e)} className={styles.filterForm} style={{height: showFilterForm ? '414px' : '0'}}>
          <h3>Filter by : </h3>
          <label htmlFor="">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">None</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipping">Shipping</option>
            <option value="Finished">Finished</option>
          </select>
          <label htmlFor="">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">None</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <label htmlFor="">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/>
          <label htmlFor="">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}/>
          <button className="primary-btn">Filter</button>
          <button className="secondary-btn" onClick={() => clearFilter()}>Clear</button>
        </form>
        
        <Tasks tasks={recentTasks}/>
        <ul className="paginations">
            {prevPage ? <li onClick={() => goToPrevPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowLeft}/></li> : <li></li>}
            <li>{pageNumber}</li>
            {nextPage ? <li onClick={() => goToNextPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowRight}/></li> : <li></li>}
        </ul>
    </>
  )
}

export default withProtected(RecentTasks)