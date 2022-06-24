import React, { useState, useContext } from 'react'
import styles from '@styles/LoginPage.module.css'
import { AuthContext } from '@context/AuthContext'
import { withPublic } from '@hoc/route'
import LoginImg from '@public/login-img.jpg'
import LogoImg from '@public/logo.png'
import Image from 'next/image'
import Modal from '@components/Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {

  const { loginUser, setLoading } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [fieldType, setFieldType] = useState('password')
  const [iconType, setIconType] = useState(faEye)

  const handleClick = () => {
    if (fieldType === 'password') {
      setFieldType('text')
      setIconType(faEyeSlash)
    } else {
      setFieldType('password')
      setIconType(faEye)
    }
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
      <div className={styles.loginFormContainer}>
      <div className={styles.loginUpper}>
            <h1 className={styles.title}>Welcome back</h1>
            <p>Please enter your authentication details to continue</p>
          </div>
        <form className={styles.loginForm} onSubmit={e => login(e)}>
          <label htmlFor={styles['username_field']}>Username</label>
          <input id={styles['username_field']} type="text" className={styles.usernameField} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
          <label htmlFor={styles['password_field']}>Password</label>
          <div  className={styles.passwordFieldContainer}>
            <input id={styles['password_field']} type={fieldType} className={styles.passwordField} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <span className={styles.showPassword} onClick={() => handleClick()}><FontAwesomeIcon icon={iconType}/></span>
          </div>
            <button type="submit" disabled={!username || !password} className={`${styles.loginBtn} primary-btn`}>Login</button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.loginImage} src={LoginImg} alt={"Ruko Elang Laut"} objectFit='cover' layout='fill' priority/>
      </div>
      <Modal type={"error"} message={message} showModal={showModal} onClose={e => setShowModal(false)}/>
    </div>
  )
}

export default withPublic(LoginPage)