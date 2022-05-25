import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { withProtected } from '@hoc/route'
import Members from '@components/Members/Members'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import axios from 'axios'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const DivisionPage = () => {

    const router = useRouter()
    const { name } = router.query

    const [data, setData] = useState([])

    const getDivisionByName = async () => {
      let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions/${name}`)
      let data = await response.data
      if (response.status === 200) {
        
        setData(data)
      }
    }
  
    useEffect(() => {
      getDivisionByName()
    }, [name])

  return (
    
      <div>
        <h1 className="title"><Link href="/divisions"><a><FontAwesomeIcon icon={faArrowLeft}/></a></Link> {data.name}</h1>
        {data.members?.length > 0  ? 
        <>
          <div className="upper">
            <h3 className='secondary-title'>Leader : {data.leader?.user.first_name ? `${data.leader?.user.first_name} ${data.leader?.user.last_name}` : data.leader?.user.username}</h3>
            <Link href={`https://wa.me/${data.whatsapp_number}`}><a target='_blank' rel='noreferrer' className='whatsapp-link'><FontAwesomeIcon icon={faWhatsapp}/></a></Link>
          </div>
          <Members members={data?.members} leader={data.leader}/>
        </> : 
        <h3>This Division has no members...</h3>}
      </div> 
    
  )
}

export default withProtected(DivisionPage)