import React, { useState } from 'react'

import useAgora from '../hooks/useAgora';

import { Avatar } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

import MediaPlayer from './MediaPlayer';
import MediaControls from './MediaControls';

function Call() {

    const { localAudioTrack, localVideoTrack, joinState, remoteUsers, joinChannel, leaveChannel } = useAgora();
    const [ playing, setPlaying ] = useState(true);

    const handleAudio = (data) => {
        // console.log("🎵 ", data, rtc.localAudioTrack)
        // console.log("🎵 ", rtc.localAudioTrack.getVolumeLevel())
        // console.log("🎵 ", rtc.localAudioTrack.stop())
        data
            ? localAudioTrack.setVolume(100)
            : localAudioTrack.setVolume(0);
    }

    const handleVideo = async (data) => {
        // console.log("🎵 ", rtc.localVideoTrack.isPlaying)
        localVideoTrack.setEnabled(data);
        setPlaying(data);
    }

    return (
        <div className="flex flex-col flex-grow items-center bg-white p-6 shadow rounded">
            {
                !joinState
                ?
                <>
                    <Avatar 
                        src="https://c.stocksy.com/a/rIb100/z9/381725.jpg"
                        className="mt-14 shadow-lg" style={{ width:"150px",  height:"150px" }} />
                    <h4 className="text-lg mt-4">Suzzane Maloney</h4>
                    <p className="text-base text-gray-600">counselor</p>
                    <div className="flex mt-5 mb-14">
                        <button className="icon"> 
                            <CallIcon className="bg-transparent" /> 
                        </button>
                        <button className="icon" onClick={joinChannel}> 
                            <VideocamIcon className="bg-transparent" /> 
                        </button>
                    </div>
                </>
                :
                <>
                    <MediaPlayer audioTrack={localAudioTrack} videoTrack={localVideoTrack} playing={playing} mine={true} />
                    {
                        remoteUsers.map(user => (
                            <div key={user.uid}>
                                <MediaPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} />
                            </div>
                        ))
                    }
                    <MediaControls audio={handleAudio} video={handleVideo} disconnect={leaveChannel} />
                </>
            }
        </div>
    )
}

export default Call
