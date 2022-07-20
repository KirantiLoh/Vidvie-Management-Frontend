import  { useState, useContext } from 'react'
import styles from '@styles/LoginPage.module.css'
import { AuthContext } from '@context/AuthContext'
import { withPublic } from '@hoc/route'
import LoginImg from '@public/login-img.jpg'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ModalContext } from '@context/ModalContext'

const LoginPage = () => {

  const { loginUser } = useContext(AuthContext)
  const { setShowModal, setModalType, setMessage } = useContext(ModalContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fieldType, setFieldType] = useState('password')
  const [iconType, setIconType] = useState(faEye)
  const [disableBtn, setDisableBtn] = useState(false)

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
    setDisableBtn(true)
    if (!username || !password) return
    const [error, status] = await loginUser(username, password)
    if (error && status === 401) {
      setModalType('error')
      setMessage(error.message)
      setUsername('')
      setPassword('')
    }
    setShowModal(true)
    setDisableBtn(false)
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={e => login(e)}>
        <div className={styles.loginUpper}>
            <h1 className={styles.title}>Welcome back</h1>
            <p>Please enter your authentication details to continue</p>
          </div>
          <label htmlFor={styles['username_field']}>Username</label>
          <input id={styles['username_field']} type="text" className={styles.usernameField} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
          <label htmlFor={styles['password_field']}>Password</label>
          <div  className={styles.passwordFieldContainer}>
            <input id={styles['password_field']} type={fieldType} className={styles.passwordField} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            <span className={styles.showPassword} onClick={() => handleClick()}><FontAwesomeIcon icon={iconType}/></span>
          </div>
            <button type="submit" disabled={!username || !password || disableBtn} className={`${styles.loginBtn} primary-btn`}>Login</button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.loginImage} src={LoginImg} alt={"Ruko Elang Laut"} objectFit='cover' layout='fill' priority/>
      </div>
    </div>
  )
}

export default withPublic(LoginPage)