// import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Handover.module.css'
import axios from 'axios'

const Handover = ({data, division, setRefetching}) => {

    const handleChange = async (e, id) => {
        e.preventDefault()
        try{
            let response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/handovers/${id}`, 
            {is_approved: e.target.value})
            let data = await response.data
        } catch (err) {
          console.error(err)
        }
        setRefetching(true)
    }

  return (
    <ul className={styles.handovers}>
        {data.length > 0 ? data.map(handover => {
            return (
                <li key={handover.id} className={styles.handover}>
                    <div className={styles.handoverContainer}>
                        <div className={styles.upperDetail}>
                            <h3 className={styles.handoverTitle}>{handover.tipe} : {handover.item.name} ({handover.count})</h3>
                            {
                                division === handover.requestor_division ?
                                <select value={handover.is_approved} onChange={e => handleChange(e, handover.id)} style={{backgroundColor: handover.is_approved ? 'var(--status-finished-background-color)' : 'var(--status-not-started-background-color)', color: '#fff'}} className={styles.approved}>
                                    <option value={true}>Approved</option>
                                    <option value={false}>Not Approved</option>
                                </select> :
                                <p style={{backgroundColor: handover.is_approved ? 'var(--status-finished-background-color)' : 'var(--status-not-started-background-color)', color: '#fff'}} className={styles.approved}>{handover.is_approved ? 'Approved' : 'Not Approved'}</p>
                            }
                        </div>
                        <div className={styles.extraDetails}>
                            <p>Requested by : {handover.requestor} ({handover.requestor_division})</p>
                            <p>Requested on : {handover.date_added ? (new Date(handover.date_added)).toLocaleString() : null}</p>
                        </div>
                        <p>Description : {handover.description}</p>
                    </div>
                    {
                    // <span className={styles.deleteBtn}><FontAwesomeIcon icon={faTrash}/></span>
                    }
                </li>
            )
        }) : <li>No data</li>}
    </ul>
  )
}

export default Handover