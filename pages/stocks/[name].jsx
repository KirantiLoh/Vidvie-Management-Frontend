import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { withProtected } from '@hoc/route'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
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
    const [showActionForm, setShowActionForm] = useState(false)
    const [refetching, setRefetching] = useState(false)
    const [message, setMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [showAddItemForm, setShowAddItemForm] = useState(false)

    const [itemName, setItemName] = useState('')
    const [itemFunction, setItemFunction] = useState('')
    const [stock, setStock] = useState(1)
    const [condition, setCondition] = useState('')

    const goToNextPage = () => {
      e.preventDefault()
      if (nextPage) {
          setCurrentPage(nextPage)
          setPageNumber(pageNumber + 1)  
      }
    }

    const goToPrevPage = () => {
      e.preventDefault()
        if (previousPage) {
            setCurrentPage(prevPage)
            setPageNumber(pageNumber - 1)  
        }
    }

    const getItemsByDivision = async () => {
        let response = await axios.get(currentPage)
        let data = await response.data
        if (response.status === 200) {
          setData(data.results)
          setNextPage(data.next)
          setPreviousPage(data.previous)
        }
        setRefetching(false)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (!itemName || !stock || !condition || !itemFunction) return
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
  
    useEffect(() => {
      getItemsByDivision()
    }, [name, currentPage, refetching])

  return (
      <div>
        <h1 className="title"><Link href="/stocks"><a><FontAwesomeIcon icon={faArrowLeft}/></a></Link> {data[0]?.division?.name ? data[0]?.division?.name : `${(name.charAt(0).toUpperCase() + name.slice(1)).replace('-', ' ')}`}</h1>
        {user.leader_of.toLowerCase().replace(' ', '-') === name ? 
          <form onSubmit={handleSubmit} style={{height: showAddItemForm ? '430px' : '0'}}>
            <h3 className='secondary-title'>Add New Item</h3>
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Name' value={itemName} onChange={e => setItemName(e.target.value)} />
            <label htmlFor="">Function</label>
            <textarea placeholder='Function' value={itemFunction} onChange={e => setItemFunction(e.target.value)}></textarea>
            <label htmlFor="">Stock</label>
            <input type="number" placeholder='Stock' value={stock} onChange={(e) => setStock(e.target.value)} />
            <label htmlFor="">Condition</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="" hidden disabled>Condition</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
            </select>
            <button className="primary-btn" type='submit'>Add</button>
          </form> : null}
        {data?.length > 0  ? 
        <>
          <div className="upper">
            <h3>Items</h3>
            <div>
              {user.username === data[0].division?.leader?.user.username ? <span onClick={() => setShowActionForm(!showActionForm)}><FontAwesomeIcon icon={faPenToSquare}/></span> : null}
              {user.username === data[0].division?.leader?.user.username ? <span onClick={() => setShowAddItemForm(!showAddItemForm)}><FontAwesomeIcon icon={faPlus}/></span> : null}
            </div>
          </div>
          <Items division={name} setRefetching={setRefetching} items={data} isLeader={user.username === data[0].division?.leader?.user.username} showActionForm={showActionForm}/>
        </> : 
        <h3>This Division has no items...</h3>}
        {data?.length > 0  ? 
        <ul className="paginations">
            {previousPage ? <li onClick={() => goToPrevPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowLeft}/></li> : <li></li>}
            <li>{pageNumber}</li>
            {nextPage ? <li onClick={() => goToNextPage()} className='pagination-button'><FontAwesomeIcon icon={faArrowRight}/></li> : <li></li>}
        </ul> : null}
        <Modal type={modalType} message={message} onClose={setShowModal} showModal={showModal}/>
      </div> 
  )
}

export default withProtected(StockPage)