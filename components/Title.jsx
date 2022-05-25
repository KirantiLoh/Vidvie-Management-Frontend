import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Title = ({text}) => {
  return (
    <h1 className="title">     
      <label htmlFor="chk" className="showMenuBtn">
        <FontAwesomeIcon icon={faBars}/>
      </label>
      {text}
    </h1>
  )
}

export default Title