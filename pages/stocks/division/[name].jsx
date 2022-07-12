import  { useState, useEffect, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import { withProtected } from '@hoc/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import Items from '@components/Items/Items'
import { AuthContext } from '@context/AuthContext'
import Modal from '@components/Modal/Modal'

const StockPage = () => {

    const router = useRouter()
    const { name } = router.query

    const { user } = useContext(AuthContext)

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${name}`)
    const [nextPage, setNextPage] = useState('')
    const [previousPage, setPreviousPage] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [refetching, setRefetching] = useState(false)
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [showAddItemForm, setShowAddItemForm] = useState(false)
    const [showFilterForm, setShowFilterForm] = useState(false)
    const [disablePaginations, setDisablePaginations] = useState(false)

    const [itemName, setItemName] = useState('')
    const [itemFunction, setItemFunction] = useState('')
    const [stock, setStock] = useState(1)
    const [condition, setCondition] = useState('')

    const goToNextPage = () => {
      setDisablePaginations(true)
      if (nextPage) {
          setCurrentPage(nextPage)
          setPageNumber(pageNumber + 1)  
      }
    }

    const goToPrevPage = () => {
      setDisablePaginations(true)
        if (previousPage) {
            setCurrentPage(previousPage)
            setPageNumber(pageNumber - 1)  
        }
    }

    const getItemsByDivision = useCallback(async () => {
        let response = await axios.get(currentPage)
        let data = await response.data
        if (response.status === 200) {
          setData(data.results)
          setNextPage(data.next)
          setPreviousPage(data.previous)
        }
        setRefetching(false)
        setDisablePaginations(false)
    }, [currentPage])

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!itemName || stock < 0 || !condition || !itemFunction) return
      try {
        let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${name}`, {
          name: itemName,
          function: itemFunction,
          condition: condition,
          stock: stock
        })
        let data = await response.data
        if (response.status === 201) {
          setMessage(data.message)
          setShowModal(true)
          setRefetching(true)
          setModalType('success')
        }
      }
      catch (err) {
        console.error(err)
        setMessage(data.message)
        setShowModal(true)
        setModalType('error')
      }
      setItemName('')
      setItemFunction('')
      setStock(1)
      setCondition('')
      setShowAddItemForm(false)
    }

    const filterItem = (e) => {
      e.preventDefault()
      setCurrentPage(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${name}?condition=${e.target.value}`)
      setShowFilterForm(false)
    }

    const handleStockChange = (e) => {
      e.preventDefault()
      if (Number.isNaN(Number(e.target.value))) return
      setStock(e.target.value)
    }
  
    useEffect(() => {
      getItemsByDivision()
    }, [name, refetching, getItemsByDivision])

  return (
      <div>
        <h1 className="title">
          <Link href="/stocks">
            <a>
              <FontAwesomeIcon icon={faArrowLeft}/>
            </a>
          </Link> 
          {data[0]?.division?.name ? data[0]?.division?.name : `${(name.charAt(0).toUpperCase() + name.slice(1)).replace('-', ' ')}`}
        </h1>
        <form style={{height: showFilterForm ? '140px' : '0', marginBottom: '10px'}} onSubmit={e => e.preventDefault()}>
          <h2 className='secondary-title'>Filter by : </h2>
          <label htmlFor="">Stock</label>
          <select onChange={(e) => filterItem(e)}>
            <option value="">All</option>
            <option value="Good">Good</option>
            <option value="Second">Second</option>
            <option value="Bad">Bad</option>
          </select>
        </form>
        
        {user.leader_of && user?.leader_of?.toLowerCase().replace(' ', '-') === name ? 
          <form onSubmit={handleSubmit} style={{height: showAddItemForm ? '480px' : '0', overflowY: showAddItemForm ? 'auto' : 'hidden'}}>
            <h2 className='secondary-title'>Add New Item</h2>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Name' value={itemName} onChange={e => setItemName(e.target.value)} />
            <label htmlFor="function">Function</label>
            <textarea id="function" placeholder='Function' value={itemFunction} onChange={e => setItemFunction(e.target.value)}></textarea>
            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" placeholder='Stock' value={stock} onChange={handleStockChange} />
            <label htmlFor="">Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="" hidden disabled>Condition</option>
              <option value="Good">Good</option>
              <option value="Second">Second</option>
              <option value="Bad">Bad</option>
            </select>
            <button className="primary-btn" type='submit'>Add</button>
          </form> : null}
        {data?.length > 0  ? 
        <>
          <div className="upper">
            <h2 className="secondary-title">Items</h2>
            <div>
              {user.username === data[0].division?.leader?.user.username ? <span onClick={() => setShowAddItemForm(!showAddItemForm)}><FontAwesomeIcon icon={faPlus}/></span> : null}
              <span onClick={() => setShowFilterForm(!showFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
            </div>
          </div>
          <Items division={name} setRefetching={setRefetching} items={data} isLeader={user.username === data[0].division?.leader?.user.username}/>
        </> : 
        <div className="upper">
          <h3>This division has no items...</h3>
          <div>
            {user.leader_of && user.leader_of.toLowerCase().replace(' ', '-') === name ? <span onClick={() => setShowAddItemForm(!showAddItemForm)}><FontAwesomeIcon icon={faPlus}/></span> : null}
            <span onClick={() => setShowFilterForm(!showFilterForm)}><FontAwesomeIcon icon={faFilter}/></span>
          </div>
        </div>
        }
        {data?.length > 0  ? 
        <ul className="paginations">
            {previousPage ? <li><button disabled={disablePaginations} onClick={() => goToPrevPage()} className='pagination-button' aria-label="pagination-button"><FontAwesomeIcon icon={faArrowLeft}/></button></li> : <li></li>}
            <li>{pageNumber}</li>
            {nextPage ? <li><button disabled={disablePaginations} onClick={() => goToNextPage()} className='pagination-button' aria-label="pagination-button"><FontAwesomeIcon icon={faArrowRight}/></button></li> : <li></li>}
        </ul> : null}
        <Modal type={modalType} message={message} onClose={setShowModal} showModal={showModal}/>
      </div> 
  )
}

export default withProtected(StockPage)