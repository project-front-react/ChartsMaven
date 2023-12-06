import React, { useState } from 'react'
import './PasswordInput.scss';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';


const PasswordInput = (props) => {
    const { error, forUserName, onChange, name, type, placeholder, value, onClick, passwordType } = props

    
    return (
        <div className="inputContainer">
            <div className='inputFieldData'>
                <input type={type} onChange={onChange} value={value} name={name} placeholder={placeholder} />

                <button className="btnData" onClick={onClick}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px"
                    }}
                >
                    {passwordType === "password" ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
            </div>
            {error ? <span className="error">{error}</span>
                : forUserName && <span className="error">{forUserName}</span>}
        </div>
    )
}

export default PasswordInput