import RenderIf from '@components/RenderIf'
import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import React, { useState, useContext, useEffect } from 'react'
import styles from './ItemDetail.module.css'
import Modal from '@components/Modal/Modal'
import { useRouter } from 'next/router'
import axios from 'axios'
import Items from '@components/Items/Items'

const ItemDetail = ({items, setRefetchRequest}) => {

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [itemFunction, setItemFunction] = useState('')
    const [stock, setStock] = useState(0)
    const [dateAdded, setDateAdded] = useState('')
    const [requestor, setRequestor] = useState('')
    const [condition, setCondition] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [message, setMessage] = useState('')

      const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !itemFunction || !condition || !stock) return
        try {
            let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${id}`, 
            {"name": name, "stock": stock, "function": itemFunction, "condition": condition})
            let data = await response.data
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

    const deleteItem = async () => {
        try {
            let response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${id}`)
            let data = await response.data
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
        if (items.length > 0) {
            let itemDetail = items[0]
            setId(itemDetail.id)
            setName(itemDetail.name)
            setStock(itemDetail.stock)
            setItemFunction(itemDetail.function)
            setCondition(itemDetail.condition)
            setDateAdded((itemDetail.date_added)?.split("+")[0])
            setRequestor(itemDetail.division)
        }
      }, [items])


  return (
      <>
    <RenderIf isTrue={user.username === requestor?.leader?.user.username} children={
        <>
        <form onSubmit={e => handleSubmit(e)} className={styles.addItemForm}>
            <Title text={`Edit Item : ${name}`}/>
            <p>Belongs to :  {requestor?.name ? requestor.name : requestor}</p>
            <p>Added on : {(new Date(dateAdded)).toLocaleString()}</p>
            <label htmlFor={styles['name']}>Name</label>
            <input id={styles['name']} value={name} onChange={e => setName(e.target.value)} required type="text" placeholder='Title' />
            <label htmlFor="">Stock</label>
            <input required type="number" value={stock} onChange={e => setStock(e.target.value)} />
            <label htmlFor={styles['priority']}>Condition</label>
            <select required value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="" hidden disabled>Condition</option>
              <option value="Good">Good</option>
              <option value="Second">Second</option>
              <option value="Bad">Bad</option>
            </select>
            <label htmlFor={styles['desc']}>Description</label>
            <textarea id={styles['desc']} value={itemFunction} onChange={e => setItemFunction(e.target.value)} required placeholder='Function' cols="30" rows="10"></textarea>
            <button type="submit" className='primary-btn'>Update</button>
            <button type='button' onClick={() => deleteItem()} className="secondary-btn">Delete</button>
        </form>
        <Modal type={modalType} message={message} showModal={showModal} onClose={() => setShowModal(false)}/>
    </>
    } otherChoice={
        <div className={styles.itemDetail}>
            <Title text={name}/>
            <p>Description : {itemFunction}</p>
            <p>Condition : {condition}</p>
            <p>Belongs to :  {requestor?.name ? requestor.name : requestor}</p>
            <p>Added on : {(new Date(dateAdded)).toLocaleString()}</p>
        </div>
    }/>
    <h2 className='secondary-title'>History</h2>
    {items.length > 1 ? <Items items={items.slice(1)}/> : null}
      </>
  )
}

export default ItemDetail