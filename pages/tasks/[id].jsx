import TaskDetail from '@components/TaskDetail/TaskDetail'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState} from 'react'
import { withProtected } from '@hoc/route'

const TaskDetailPage = () => {

    const router = useRouter()

    const [taskURL, setTaskURL] = useState('')
    const [taskDetail, setTaskDetail] = useState({})
    const [refetchRequest, setRefetchRequest] = useState(false)

    const getTaskDetail = async () => {
        try {
           let response = await axios.get(taskURL)
            let data = await response.data
            if (response.status === 200) {
                setTaskDetail(data)
                setRefetchRequest(false)
            } 
        } catch (e) {
            console.error(e)
        }
    }

    

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query
            setTaskURL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`)
        }
    }, [router.isReady, router.query])

    useEffect(() => {
        if (taskURL) {
            getTaskDetail()
        }
    }, [taskURL, refetchRequest])

  return (
    <div>
        <TaskDetail taskDetail={taskDetail} setRefetchRequest={setRefetchRequest}/>
    </div>
  )
}

export default withProtected(TaskDetailPage)