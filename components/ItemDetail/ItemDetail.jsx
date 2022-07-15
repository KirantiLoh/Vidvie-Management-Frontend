import RenderIf from '@components/RenderIf'
import Title from '@components/Title'
import { AuthContext } from '@context/AuthContext'
import  { useState, useContext, useEffect, useRef } from 'react'
import styles from './ItemDetail.module.css'
import Modal from '@components/Modal/Modal'
import { useRouter } from 'next/router'
import axios from 'axios'
import Items from '@components/Items/Items'
import Image from 'next/image'
import ImageContainer from '@components/ImageContainer/ImageContainer'
import NoImageAvailable from '@public/no-image-available.png'

const ItemDetail = ({items, setRefetchRequest}) => {

    const { user } = useContext(AuthContext)

    const router = useRouter()

    const imageRef = useRef()
    const btnRef = useRef()

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [itemFunction, setItemFunction] = useState('')
    const [image, setImage] = useState('')
    const [itemImage, setItemImage] = useState('')
    const [stock, setStock] = useState(0)
    const [borrowed, setBorrowed] = useState(0)
    const [broken, setBroken] = useState(0)
    const [dateAdded, setDateAdded] = useState('')
    const [requestor, setRequestor] = useState('')
    const [condition, setCondition] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [message, setMessage] = useState('')
    const [disableBtn, setDisableBtn] = useState(false)

      const handleSubmit = async (e, image) => {
        e.preventDefault()
        setDisableBtn(true)
        if (!name || !itemFunction || !condition || stock < 0) {
            setDisableBtn(false)
            return
        }
        let formData = new FormData()
        formData.append("name", name)
        formData.append("function", itemFunction)
        formData.append("condition", condition)
        formData.append("stock", stock)
        image ? formData.append("image", image) : null

      try {
        let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${id}`, 
          formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        let data = await response.data
            if (response.status === 200) {
                setMessage(data.message)
                setModalType('success')
            } else {
                setMessage(data.message)
                setModalType('error')
            }
        } catch (err) {
            console.error(err)
            setMessage(err.response.data.message)
            setModalType('error')
        } finally {
            setItemImage('')
            imageRef.current.value=''
            setShowModal(true)
            setRefetchRequest(true)
            setDisableBtn(false)
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

    const handleStockChange = (e) => {
        e.preventDefault()
        if (Number.isNaN(Number(e.target.value))) return
        setStock(e.target.value)
      }

      useEffect(() => {
        if (items.length > 0) {
            let itemDetail = items[0]
            setId(itemDetail.id)
            setName(itemDetail.name)
            setStock(itemDetail.stock)
            setBorrowed(itemDetail.borrowed)
            setBroken(itemDetail.broken)
            setImage(itemDetail.image)
            setItemFunction(itemDetail.function)
            setCondition(itemDetail.condition)
            setDateAdded((itemDetail.date_added)?.split("+")[0])
            setRequestor(itemDetail.division)
        }
      }, [items])

  return (
      <>
    <RenderIf isTrue={user.username === requestor?.leader?.user.username} otherChoice={
        <div className={styles.itemDetail}>
            <Title text={name}/>
            <ImageContainer className={styles.imageContainer} width={250} height={250}>
                 <Image priority src={image ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_BUCKET}/${image}` : NoImageAvailable} alt={name} layout='fill' objectFit='cover' /> 
            </ImageContainer>
            <p>Borrowed : {borrowed}</p>
            <p>Broken : {broken}</p>
            <p>Condition : {condition}</p>
            <p>Belongs to :  {requestor?.name ? requestor.name : requestor}</p>
            <p>Added on : {(new Date(dateAdded)).toLocaleString()}</p>
            <p>Description : {itemFunction}</p>
        </div>
    }>
    <>
          <Title text={`Edit Item : ${name}`}/>
          <ImageContainer className={styles.imageContainer} width={250} height={250}>
            <label htmlFor="image" className={styles.changePhoto}>Change Photo</label>
            <Image priority src={image ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_BUCKET}/${image}` : NoImageAvailable} alt={name} layout='fill' objectFit='cover' /> 
          </ImageContainer>
          <input className={styles.imageInputField} disabled={disableBtn} type="file" ref={imageRef} onChange={e => handleSubmit(e, e.target.files[0])} id="image" accept='image/jpeg,image/jpg,image/png'/>
        <form onSubmit={handleSubmit} className={styles.addItemForm}>
            <p>Belongs to :  {requestor?.name ? requestor.name : requestor}</p>
            <p>Added on : {(new Date(dateAdded)).toLocaleString()}</p>
            <p>Borrowed : {borrowed}</p>
            <p>Broken : {broken}</p>
            <label htmlFor={styles['name']}>Name</label>
            <input id={styles['name']} value={name} onChange={e => setName(e.target.value)} required type="text" placeholder='Title' />
            <label htmlFor="">Stock</label>
            <input required type="number" value={stock} onChange={handleStockChange} />
            <label htmlFor={styles['priority']}>Condition</label>
            <select required value={condition} onChange={(e) => setCondition(e.target.value)}>
              <option value="" hidden disabled>Condition</option>
              <option value="Good">Good</option>
              <option value="Second">Second</option>
              <option value="Bad">Bad</option>
            </select>
            <label htmlFor={styles['desc']}>Description</label>
            <textarea id={styles['desc']} value={itemFunction} onChange={e => setItemFunction(e.target.value)} required placeholder='Function' cols="30" rows="10"></textarea>
            <button type="submit"  ref={btnRef} disabled={disableBtn} className='primary-btn'>Update</button>
            <button type='button' disabled={disableBtn} onClick={() => deleteItem()} className="secondary-btn">Delete</button>
        </form>
        <Modal type={modalType} message={message} showModal={showModal} onClose={() => setShowModal(false)}/>
    </>
    </RenderIf>
    {items.length > 1 ? 
    <>
        <h2 className='secondary-title'>History</h2>
        <Items items={items.slice(1)}/>
    </> : null}
      </>
  )
}

export default ItemDetail