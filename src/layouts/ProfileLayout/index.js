import React from 'react'

const ProfileLayout = (props) => {
    const { children } = props
    return (
        <div className='profile-layout'>
            {children}
        </div>
    )
}

export default ProfileLayout