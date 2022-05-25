import React from 'react'
import { useRouter } from 'next/router'

const RenderIf = ({isTrue, otherChoice, children}) => {
  const router = useRouter()
  return isTrue ? children : otherChoice
}

export default RenderIf