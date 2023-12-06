import React from 'react'
import "./container.scss"
import { Container } from 'react-bootstrap'
const CusContainer = ({children,style}) => {
  return (
    <Container id="container" style={style}>{children}</Container>
  )
}

export default CusContainer