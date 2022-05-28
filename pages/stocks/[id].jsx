import { withProtected } from '@hoc/route'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ItemDetail from '@components/ItemDetail/ItemDetail'
import axios from 'axios'

const ItemPage = () => {
    const router = useRouter()

    const [itemURL, setItemURL] = useState('')
    const [itemDetail, setItemDetail] = useState({})
    const [refetchRequest, setRefetchRequest] = useState(false)

    const getItemDetail = async () => {
        try {
           let response = await axios.get(itemURL)
            let data = await response.data
            if (response.status === 200) {
                setItemDetail(data)
                setRefetchRequest(false)
            } 
        } catch (e) {
            console.error(e)
        }
    }

    

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query
            setItemURL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${id}`)
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        if (itemURL) {
            getItemDetail()
        }
    }, [itemURL, refetchRequest])

    return (
        <div>
            <ItemDetail itemDetail={itemDetail} refetchRequest={refetchRequest} setRefetchRequest={setRefetchRequest}/>
        </div>
    )

}

export default withProtected(ItemPage)