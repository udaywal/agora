import React, { useState } from 'react'

import useAgora from '../hooks/useAgora';

import { Avatar } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

import MediaPlayer from './MediaPlayer';
import MediaControls from './MediaControls';

import API from '../services/api';

import { actionTypes } from '../contexts/reducer';
import { useStateValue } from '../contexts/StateProvider';

function Call() {

    const { localAudioTrack, localVideoTrack, joinState, remoteUsers, joinChannel, leaveChannel } = useAgora("agora", "ad");
    const [ playing, setPlaying ] = useState(true);

    const [{ call }, dispatch] = useStateValue();

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

    const handleCallConnect = async () => {
        try {
            if (call && call.channel) {
                console.log("incoming call 📲📞")
                joinChannel( call.channel, call.token )
            } else {
                const apiResponse = await API._outgoingCall({ callerId: 1, calleeId: 2 });
                if (apiResponse && apiResponse.success) {
                    console.log("outgoing call 📤📞", apiResponse.data)
                    joinChannel( apiResponse.data.channel, apiResponse.data.token )
                }
            }
        } catch (error) {
            console.log("Some error", error)
        }
    }

    const handleCallDisconnect = async () => {
        console.log(call)
        leaveChannel();
        dispatch({
            type: actionTypes.RESET_STATE,
            call: null,
            user: null
        })
        console.log(call)
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
                        <button className="icon" onClick={handleCallConnect}> 
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
                    <MediaControls audio={handleAudio} video={handleVideo} disconnect={handleCallDisconnect} />
                </>
            }
        </div>
    )
}

export default Call
