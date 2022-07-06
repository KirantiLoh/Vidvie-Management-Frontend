import styles from './LoadingScreen.module.css'
import Image from 'next/image'
import VidvieLogo from '@public/logo.png'

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div>
        <Image src={VidvieLogo} alt="Logo Vidvie" width={250} objectFit='cover'/>
        <h1 className="title">
          <div className={styles.spinner}></div>
        </h1>
      </div>
    </div>
  )
}

export default LoadingScreen