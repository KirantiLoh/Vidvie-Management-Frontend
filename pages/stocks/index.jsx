import Divisions from '@components/Divisions/Divisions'
import Title from '@components/Title'
import { withProtected } from '@hoc/route'
import axios from 'axios'
import  { useEffect, useState} from 'react'


const StocksPage = () => {

  const [divisions, setDivisions] = useState([])

  const getDivisions = async () => {
    let response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions`)
    let data = await response.data
    if (response.status === 200) {
      setDivisions(data)
    }
  }

  useEffect(() => {
      getDivisions()
  }, [])

  return (
    <div>
      <Title text={"Stocks By Division"}/>
      <Divisions divisions={divisions} to="stocks/division" />
    </div>
  )
}

export default withProtected(StocksPage)