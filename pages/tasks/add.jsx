import AddRequestForm from '@components/AddRequestForm/AddRequestForm'
import Title from '@components/Title'
import { withProtected } from '@hoc/route'
import React from 'react'

const AddNewTaskPage = () => {
  return (
    <div>
        <Title text={"Add New Request"}/>
        <AddRequestForm/>
    </div>
  )
}

export default withProtected(AddNewTaskPage)