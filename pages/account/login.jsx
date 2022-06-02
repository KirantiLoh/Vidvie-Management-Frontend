import React, { useState, useContext } from 'react'
import styles from '@styles/LoginPage.module.css'
import { AuthContext } from '@context/AuthContext'
import { withPublic } from '@hoc/route'
import LoginImg from '@public/login-img.jpg'
import LogoImg from '@public/logo.png'
import Image from 'next/image'
import Modal from '@components/Modal/Modal'

const LoginPage = () => {

  const { loginUser, setLoading } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const resetForm = () => {
    setUsername('')
    setPassword('')
  }
  
  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    const [error, status] = await loginUser(username, password)
    if (error && status === 401) {
      setMessage(error.message)
      setShowModal(true)
      setUsername('')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div className={styles.loginPage}>
      <Image className={styles.loginImage} src={LoginImg} alt={"Ruko Elang Laut"} objectFit='cover' priority/>
      <div className={styles.loginFormContainer}>
      <Image className={styles.logoImg} src={LogoImg} alt="Logo Vidvie" objectFit='cover' width={270}/>
        <form className={styles.loginForm} onSubmit={e => login(e)}>
          <h1>Login</h1>
          <input type="text" className={styles.usernameField} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" className={styles.passwordField} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className='primary-btn'>Login</button>
          <button type="reset" className='secondary-btn' onClick={() => resetForm()}>Reset</button>
        </form>
      </div>
      <Modal type={"error"} message={message} showModal={showModal} onClose={e => setShowModal(false)}/>
    </div>
  )
}

export default withPublic(LoginPage)