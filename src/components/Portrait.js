import React from 'react'
import './Portrait.css'

import { Avatar } from '@material-ui/core';

function Portrait(props) {
    return (
        <>
            <div style={{ position: 'relative'}}>
                <div class="circle1"></div>
                <Avatar src={props.src}
                    className="shadow-lg" style={{ width:"150px",  height:"150px" }} 
                />
            </div>
            <h4 className="text-lg mt-4">{props.name}</h4>
            <p className="text-base text-gray-600">{props.role}</p>
            <p className="text-sm text-gray-400">{props.status}</p>
        </>
    )
}

export default Portrait
