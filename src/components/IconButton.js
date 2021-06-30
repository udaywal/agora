import React from 'react'

function IconButton(props) {
    return (
        <button className="icon" onClick={props.action}> 
            <i className="bg-transparent">
                {props.icon}
            </i>
        </button>
    )
}

export default IconButton
