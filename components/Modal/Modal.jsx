import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({type, message, showModal, onClose}) => {

    const handleCloseClick = (e) => {
        e.preventDefault()
        onClose()
    }    

    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 3000);
    }, [showModal])
    


        if (typeof window !== 'undefined') {
            return ReactDOM.createPortal(
                <div style={{left: showModal ? '0' : '-150%'}} className={type === 'success' ? styles.success : styles.error}>
                    <p>{message}</p>
                    <span onClick={handleCloseClick}><FontAwesomeIcon icon={faTimesCircle}/></span>
                </div>, document.getElementById('modal-root')
            )
        }

  
}

export default Modal