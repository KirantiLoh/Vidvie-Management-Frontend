import Modal from '@components/Modal/Modal'
import { createContext, useState } from 'react'

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [message, setMessage] = useState('')

    const contextValue = {
        setShowModal: setShowModal,
        setModalType: setModalType,
        setMessage: setMessage
    }

  return (
    <ModalContext.Provider value={contextValue}>
        {children}
        <Modal type={modalType} message={message} showModal={showModal} onClose={() => setShowModal(false)}/>
    </ModalContext.Provider>
  )
}
