import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import styles from './SideNav.module.css'
import Logo from '@public/logo.png'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faComputer, faPeopleCarryBox, faSignIn, faTimes, faPaintBrush, faUserFriends, faTruck, faUsersCog, faGlobe, faTags, faStore, faFolder, faUsersBetweenLines, faEllipsis, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import VidvieLogo from '@public/logo-VIDVIE-icon.png'
import RenderIf from '@components/RenderIf'
import { AuthContext } from '@context/AuthContext'

const SideNav = () => {

  const { isAuthenticated } = useContext(AuthContext)

  const [navPos, setNavPos] = useState('-100%')

  useEffect(() => {
      let startPos, endPos
      window.addEventListener('touchstart', (e) => {
        startPos = e.changedTouches[0].clientX
      })
      window.addEventListener('touchend', (e) => {
        endPos = e.changedTouches[0].clientX
        if (endPos - startPos > 150) {
          setNavPos('0%')
        } else if (endPos - startPos < -150) {
          setNavPos('-100%')
        }
      })
  }, [])
  
  

  return (
    <nav className={styles.sideNav} style={{left: navPos}}>
      <Link href='/'>
        <a onClick={() => setNavPos('-100%')}>
          <Image src={Logo} alt="Logo Vidvie" objectFit='cover' />
        </a>
      </Link>
      <RenderIf isTrue={isAuthenticated}>
      <div className={styles.navlinksContainer} onClick={() => setNavPos('-100%')}>
        <ul className={styles.navlinks}>
          <li>
            <h2>Tasks</h2>
          </li>
          <li>
            <Link href="/tasks/division/branding">
              <a><FontAwesomeIcon icon={faPaintBrush}/> Branding</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/direksi">
              <a><FontAwesomeIcon icon={faUserFriends}/> Direksi</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/distributor">
              <a><FontAwesomeIcon icon={faTruck}/> Distributor</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/ga">
              <a><FontAwesomeIcon icon={faTasks}/> GA</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/hrd">
              <a><FontAwesomeIcon icon={faUsersCog}/> HRD</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/it">
              <a><FontAwesomeIcon icon={faComputer}/> IT</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/online-marketing">
              <a><FontAwesomeIcon icon={faGlobe}/> Online Marketing</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/operational">
              <a><FontAwesomeIcon icon={faFolder}/> Operational</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/sales">
              <a><FontAwesomeIcon icon={faTags}/> Sales</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/store">
              <a><FontAwesomeIcon icon={faStore}/> Store</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/vidvie">
              <a><Image src={VidvieLogo} height={20} width={20} alt='Logo Vidvie'/> Vidvie</a>
            </Link>
          </li>
          <li>
            <Link href="/tasks/division/others">
              <a><FontAwesomeIcon icon={faEllipsis}/> Others</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.navlinks}>
            <li>
              <h2>Staffs</h2>
            </li>
          
          <li>
            <Link href="/stocks">
              <a><FontAwesomeIcon icon={faBoxOpen}/> Stocks</a>
            </Link>
          </li>
          <li>
            <Link href="/handover">
              <a><FontAwesomeIcon icon={faPeopleCarryBox}/> Handover</a>
            </Link>
          </li>
          <li>
            <Link href="/divisions">
              <a><FontAwesomeIcon icon={faUsersBetweenLines}/> Divisions</a>
            </Link>
          </li>
          <li>
            <Link href="/account/logout">
              <a><FontAwesomeIcon icon={faSignIn}/> Logout</a>
            </Link>
          </li>
          <li className={styles.hideMenuBtn}>
              <FontAwesomeIcon icon={faTimes}/>
          </li>
        </ul>
      </div>
      </RenderIf>
    </nav>
  )
}

export default SideNav

