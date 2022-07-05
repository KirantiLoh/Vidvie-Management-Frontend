import  { useEffect, useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@context/AuthContext'
import { withProtected } from '@hoc/route'
import Tasks from '@components/Task/Tasks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faFilter } from '@fortawesome/free-solid-svg-icons'
import Title from '@components/Title'
import axios from 'axios'
import styles from '@styles/Home.module.css'
import Requests from '@components/Request/Request'

const TaskByDivision = () => {

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [division, setDivision] = useState('')
  
    const [query, setQuery] = useState('tasks')
    const [datas, setDatas] = useState([])
    const [currentPage, setCurrentPage] = useState('')
    const [prevPage, setPrevPage] = useState('')
    const [nextPage, setNextPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [showActionForm, setShowActionForm] = useState(false)
    const [refetchRequest, setRefetchRequest] = useState(false)
    const [disablePaginations, setDisablePaginations] = useState(false)

    const [showFilterForm, setShowFilterForm] = useState(false)
  
    const fetchDatas = useCallback(async () => {
        try {
            let response = await axios.get(currentPage)
              let data = await response.data
              if (response.status === 200) {
                setDatas(data.results)
                setNextPage(data.next)
                setPrevPage(data.previous)
              } else {
                setDatas([])
              }
        } catch (err) {
            setDatas([])
        }
        setRefetchRequest(false)
        setDisablePaginations(false)
    }, [currentPage])

    const clearFilter = () => {
      setPriority('')
      setStatus('')
      setStartDate('')
      setEndDate('')
      setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${query}/division/${division}?priority=${priority}&status=${status}&date_added_before=${endDate}&date_added_after=${startDate}`)
      setPageNumber(1)
      setShowFilterForm(false)
    }

    const filterResult = (e) => {
      e.preventDefault()
      setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${query}/division/${division}?priority=${priority}&status=${status}&date_added_before=${endDate}&date_added_after=${startDate}`)
      setPageNumber(1)
      setShowFilterForm(false)
    }

    const goToPrevPage = () => {
      setDisablePaginations(true)
      if (prevPage) {
        setCurrentPage(prevPage)
        setPageNumber(prev => prev - 1)
      }
    }

    const goToNextPage = () => {
      setDisablePaginations(true)
      if (nextPage) {
        setCurrentPage(nextPage)
        setPageNumber(prev => prev + 1)
      }
    }

    useEffect(() => {
        if (router.isReady) {
            const { division } = router.query
            setDivision(prev => prev = division)
            setPageNumber(1)
            setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${query}/division/${division}`)
        }
    }, [router.isReady, router.query, query])
    
  
    useEffect(() => {
        if (currentPage) {
            fetchDatas()
        }
    }, [currentPage, refetchRequest, fetchDatas])

  return (
    <div>
        <Title text={`${(division.charAt(0).toUpperCase()+division.slice(1)).replace('-', ' ')}`}/>
        <div className='upper'>
          <select value={query} className={styles.query} onChange={e => setQuery(e.target.value)}>
            <option value="tasks">Tasks</option>
            <option value="requests">Requests</option>
          </select>
          <div>
            <span onClick={() => setShowFilterForm(!showFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
          </div>
        </div>
        <form onSubmit={e => filterResult(e)} className={styles.filterForm} style={{height: showFilterForm ? '435px' : '0'}}>
          <h3>Filter by : </h3>
          <label htmlFor="">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Shipping">Shipping</option>
            <option value="Finished">Finished</option>
          </select>
          <label htmlFor="">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="">All</option>
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
        {query === 'tasks' 
        ? <Tasks tasks={datas} division={division} isLeader={datas[0]?.requestee_division?.name === user.division} inTaskbyDivisionPage={true} showActionForm={showActionForm} setShowActionForm={setShowActionForm} setRefetching={setRefetchRequest}/>
        : <Requests requests={datas} division={division} isLeader={datas[0]?.requestor_division?.name === user.division} inTaskbyDivisionPage={true} showActionForm={showActionForm} setShowActionForm={setShowActionForm} setRefetching={setRefetchRequest}/>
        }
        {datas.length > 0 ?
          <ul className="paginations">
            {prevPage ? <button disabled={disablePaginations} onClick={() => goToPrevPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowLeft}/></button> : <li></li>}
            <li>{pageNumber}</li>
            {nextPage ? <button disabled={disablePaginations} onClick={() => goToNextPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowRight}/></button> : <li></li>}
          </ul> : null}
    </div>
  )
}

export default withProtected(TaskByDivision)