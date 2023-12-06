import React from 'react'
import { Col } from 'react-bootstrap'

const SidebarMain = (props) => {
    const { children } = props
    return (
        <React.Fragment>
            <Col xs={12} md={12} lg={7}>
                {children}
            </Col>
        </React.Fragment>
    )
}

export default SidebarMain