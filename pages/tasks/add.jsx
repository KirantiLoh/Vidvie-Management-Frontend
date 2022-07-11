import AddRequestForm from '@components/AddRequestForm/AddRequestForm'
import Title from '@components/Title'
import { withProtected } from '@hoc/route'

const AddNewTaskPage = () => {
  return (
    <div>
        <Title text={"Add New Request"}/>
        <AddRequestForm/>
    </div>
  )
}

export default withProtected(AddNewTaskPage)