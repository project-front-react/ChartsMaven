import React from 'react'
import { Col } from 'react-bootstrap'

const Sidebar = (props) => {
    const { children } = props
    return (
        <Col xs={12} md={12} lg={5}>
            {children}
        </Col>
    )
}

export default Sidebar   