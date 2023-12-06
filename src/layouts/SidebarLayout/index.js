import React from 'react'
import { Row } from 'react-bootstrap'

const SidebarLayout = (props) => {
    const { sidebar, children } = props
    
    return (
        <div className='sidebar-layout'>
            <Row>
                {children}
            </Row>
        </div>
    )
}

export default SidebarLayout