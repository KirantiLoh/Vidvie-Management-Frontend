import { withProtected } from '@hoc/route'
import  { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import ItemDetail from '@components/ItemDetail/ItemDetail'
import axios from 'axios'

const ItemPage = () => {
    const router = useRouter()

    const [itemURL, setItemURL] = useState('')
    const [items, setItems] = useState([])
    const [refetchRequest, setRefetchRequest] = useState(false)

    const getItems = useCallback(async () => {
        try {
           let response = await axios.get(itemURL)
            let data = await response.data
            if (response.status === 200) {
                setItems(data)
                setRefetchRequest(false)
            } 
        } catch (e) {
            console.error(e)
        }
    }, [itemURL])

    

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query
            setItemURL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${id}`)
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        if (itemURL) {
            getItems()
        }
    }, [itemURL, refetchRequest, getItems])

    return (
        <div>
            <ItemDetail items={items} refetchRequest={refetchRequest} setRefetchRequest={setRefetchRequest}/>
        </div>
    )

}

export default withProtected(ItemPage)