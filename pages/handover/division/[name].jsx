import Title from '@components/Title'
import { useState, useEffect, useCallback, useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowRight, faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Handover from '@components/Handover/Handover'
import { withProtected } from '@hoc/route'
import { AuthContext } from '@context/AuthContext'
import { useRouter } from 'next/router'

const HandoverPage = () => {

  const { user } = useContext(AuthContext)
  const router = useRouter()
  const { name } = router.query

  const [approved, setApproved] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showFilterForm, setShowFilterForm] = useState(false)
  const [refetching, setRefetching] = useState(false)

  const [handovers, setHandovers] = useState([])
  const [prevPage, setPrevPage] = useState('')
  const [nextPage, setNextPage] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [currentPage, setCurrentPage] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handovers/division/${name}?page=${pageNumber}`)
  const [disablePaginations, setDisablePaginations] = useState(false)

  const filterResult = (e) => {
    e.preventDefault()
    setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handovers/division/${name}?is_approved=${approved}&date_added_before=${endDate}&date_added_after=${startDate}`)
    setPageNumber(1)
    setShowFilterForm(false)
  }

  const getHandovers = useCallback(async () => {
    let response = await axios.get(currentPage)
    let data = await response.data
    if (response.status === 200) {
      setPrevPage(data.previous)
      setNextPage(data.next)
      setHandovers(data.results)
    }
    setDisablePaginations(false)
    setRefetching(false)
  }, [currentPage])

  const goToNextPage = () => {
    setDisablePaginations(true)
    if (nextPage) {
        setCurrentPage(nextPage)
        setPageNumber(pageNumber + 1)  
    }
}

const goToPrevPage = () => {
  setDisablePaginations(true)
    if (prevPage) {
        setCurrentPage(prevPage)
        setPageNumber(pageNumber - 1)  
    }
}

  useEffect(() => {
    if (currentPage) {
      getHandovers()
    }
  }, [currentPage, getHandovers, refetching])

  return (
    <div>
      <Title text="Serah Terima" />
      <form onSubmit={filterResult} style={{height: showFilterForm ? '370px' : '0'}}>
        <h2 className="secondary-title">Filter</h2>
        <label htmlFor="approved">Approved</label>
        <select id="approved" value={approved} onChange={e => setApproved(e.target.value)} >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)}/>
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)}/>
        <button className="primary-btn">Filter</button>
      </form>
      <div className="upper">
        <h2 className="secondary-title">Daftar</h2>
        <div>
        <Link href='/handover/add'>
          <a style={{fontSize: '2rem'}}><FontAwesomeIcon icon={faPlus} /></a>
        </Link>
        <span onClick={() => setShowFilterForm(!showFilterForm)}><FontAwesomeIcon icon={faFilter} /></span>
        </div>
        
      </div>
      <Handover data={handovers} division={user.division} setRefetching={setRefetching} />
      {handovers.length > 0 ?
          <ul className="paginations">
            {prevPage ? <li><button disabled={disablePaginations} onClick={() => goToPrevPage()} className='pagination-button' aria-label="pagination-button"><FontAwesomeIcon icon={faArrowLeft}/></button></li> : <li></li>}
            <li>{pageNumber}</li>
            {nextPage ? <li><button disabled={disablePaginations} onClick={() => goToNextPage()} className='pagination-button' aria-label="pagination-button"><FontAwesomeIcon icon={faArrowRight}/></button></li> : <li></li>}
          </ul> : null}
    </div>
  )
}

export default withProtected(HandoverPage)