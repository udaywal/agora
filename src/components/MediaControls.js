import React, { useState } from 'react'

import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';

function MediaControls(props) {

    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);

    const handleAudio = () => { 
        setAudio(!audio)
        props.audio(!audio)
    }
    const handleVideo = () => { 
        setVideo(!video)
        props.video(!video)
    }

    const handleDisconnect = () => { props.disconnect() }

    return ( 
        <div className="flex justify-center space-x-2">
            {
                audio
                ?
                <div className="iconbox">
                    <button className="icon" onClick={handleAudio}> 
                        <MicIcon className="bg-transparent" /> 
                    </button>
                    <h5 className="text-xs text-gray-300">Mic</h5>
                </div>
                :
                <div className="iconbox">
                    <button className="icon" onClick={handleAudio}> 
                        <MicOffIcon className="bg-transparent text-red-500" /> 
                    </button>
                    <h5 className="text-xs text-gray-300">Mic</h5>
                </div>
            }
            
            {
                video
                ?
                <div className="iconbox">
                    <button className="icon" onClick={handleVideo}> 
                        <VideocamIcon className="bg-transparent" /> 
                    </button>
                    <h5 className="text-xs text-gray-300">Cam</h5>
                </div>
                :
                <div className="iconbox">
                    <button className="icon" onClick={handleVideo}> 
                        <VideocamOffIcon className="bg-transparent text-red-500" /> 
                    </button>
                    <h5 className="text-xs text-gray-300">Cam</h5>
                </div>
            }
            
            <div className="iconbox">
                <button className="icon" onClick={handleDisconnect}> 
                    <CallEndIcon className="bg-transparent text-red-500" /> 
                </button>
                <h5 className="text-xs text-gray-300">Disconnect</h5>
            </div>
        </div>
    )
}

export default MediaControls;
