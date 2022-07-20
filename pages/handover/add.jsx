import Title from '@components/Title'
import { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { withProtected } from '@hoc/route'
import { ModalContext } from '@context/ModalContext'

const HandoverPage = () => {

  const { setShowModal, setModalType, setMessage } = useContext(ModalContext)

    const [divisions, setDivisions] = useState([])
    const [members, setMembers] = useState([])
    const [items, setItems] = useState([])

    const [tipe, setTipe] = useState('')
    const [requestorDivision, setRequestorDivision] = useState('')
    const [requesteeDivision, setRequesteeDivision] = useState('')
    const [requestor, setRequestor] = useState('')
    const [count, setCount] = useState(1)
    const [item, setItem] = useState('')
    const [description, setDescription] = useState('')

    const [disableBtn, setDisableBtn] = useState(false) 


  const getDivisions = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions`)
    let data = await response.data
    if (response.status === 200) {
      setDivisions(data)
    }
  }

  const getMembersByDivision = useCallback(async () => {
    setRequestor('')
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions/${requestorDivision.toLowerCase().replace(' ', '-')}`)
    let data = await response.data
    if (response.status === 200) {
      setMembers(data.members)
    }
  }, [requestorDivision])

  const getItemsByDivision = useCallback(async () => {
    setItem('')
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/divisions/${requesteeDivision.toLowerCase().replace(' ', '-')}`)
    let data = await response.data
    if (response.status === 200) {
      setItems(data.results)
    }
}, [requesteeDivision])

const handleSubmit = async (e) => {
    e.preventDefault()
    setDisableBtn(true)
    if (!tipe || !requestor || !requestorDivision || !requesteeDivision || !count || !description || !item) {
      setDisableBtn(false)
      return
    }
    try {
      let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handovers`, 
      {
        'tipe':tipe,
        'requestor': requestor,
        'requestor_division': requestorDivision,
        'requestee_division': requesteeDivision,
        'item': item,
        'count': count,
        'description': description
      })
      let data = await response.data
      setModalType('success')
      setMessage(data.message)
    } catch (err) {
      console.error(err)
      setModalType('error')
      setMessage(err.response.data.message)
    }
    setTipe('')
    setRequestor('')
    setRequestorDivision('')
    setRequesteeDivision('')
    setItem('')
    setCount(1)
    setDescription('')
    setShowModal(true)
    setDisableBtn(false)
}

  const handleCountChange = (e) => {
    e.preventDefault()
    if (Number.isNaN(Number(e.target.value)) ||  e.target.value <= 0) return
    setCount(e.target.value)
  }

  useEffect(() => {
      getDivisions()
  }, [])

  useEffect(() => {
    if (requestorDivision) {
        getMembersByDivision()
    }
  }, [requestorDivision, getMembersByDivision])

  useEffect(() => {
    if (requesteeDivision) {
        getItemsByDivision()
    }
  }, [requesteeDivision, getItemsByDivision])

  return (
    <div>
        <Title text="Form Serah Terima" />
        <form onSubmit={handleSubmit} style={{padding: '10px'}}>
            <label htmlFor="tipe">Tipe</label>
            <select required id="tipe" value={tipe} onChange={e => setTipe(e.target.value)}>
                <option value="" hidden disabled>Choose here</option>
                <option value="Peminjaman">Peminjaman</option>
                <option value="Permintaan">Permintaan</option>
                <option value="Pengembalian">Pengembalian</option>
            </select>
            <label htmlFor="requestor_division">Requestor Division</label>
            <select required id="requestor_division" disabled={!tipe} value={requestorDivision} onChange={e => setRequestorDivision(e.target.value)}>
                <option value="" hidden disabled>Choose here</option>
                {divisions.map(division => {
                    return (
                        <option key={division.id} value={division.name}>{division.name}</option>
                    )
                })}
            </select>
            <label htmlFor="requestor">Requestor</label>
            <select required id="requestor" disabled={!requestorDivision} value={requestor} onChange={e => setRequestor(e.target.value)}>
                <option value="" hidden disabled>Choose here</option>
                {members.map(member => {
                    return (
                        <option key={member.id} value={member.user.username}>{member.user.username}</option>
                    )
                })}
            </select>
            <label htmlFor="requestee_division">Requesting to</label>
            <select required id="requestee_division" disabled={!tipe} value={requesteeDivision} onChange={e => setRequesteeDivision(e.target.value)}>
                <option value="" hidden disabled>Choose here</option>
                {divisions.filter(division => division.name !== requestorDivision).map(division => {
                    return (
                        <option key={division.id} value={division.name}>{division.name}</option>
                    )
                })}
            </select>
            <label htmlFor="item">Item</label>
            <select required id="item" disabled={!requesteeDivision} value={item} onChange={e => setItem(e.target.value)}>
                <option value="" hidden disabled>Choose here</option>
                {items.filter(item => tipe === 'Pengembalian' ? item.borrowed > 0 : item.stock > 0).map(item => {
                    return (
                        <option key={item.id} value={item.name}>{item.name} - Stock : {item.stock}</option>
                    )
                })}
            </select>
            <label htmlFor="count">Count</label>
            <input required type="number" id="count" value={count} onChange={handleCountChange} />
            <label htmlFor="description">Description</label>
            <textarea required id="description" cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)} ></textarea>
            <button className="primary-btn" disabled={!tipe || !requestor || !requestorDivision || !requesteeDivision || !count || !description || !item || disableBtn}>Create</button>
        </form>
    </div>
  )
}

export default withProtected(HandoverPage)