import React from 'react'
import './Portrait.css'

import { Avatar } from '@material-ui/core';

function Portrait(props) {
    // props.type = default/incoming/audioonly
    return (
        <div className="flex flex-col items-center"
            style={
                props.type === 'audioonly' ? { position: 'absolute', left: '34%', top: '23%' } : null
            }
        >
            <div style={{ position: 'relative'}}>
                {props.type === 'calling' && <div className="circle1"></div>}
                <Avatar src={props.src}
                    className="shadow-lg" 
                    style={{ width:"150px", height:"150px" }} 
                />
            </div>
            <h4 className="text-lg mt-4">{props.name}</h4>
            <p className="text-base text-gray-600">{props.role}</p>
            <p className="text-sm text-gray-400">{props.status}</p>
        </div>
    )
}

export default Portrait
