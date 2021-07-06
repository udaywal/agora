import React, { useState } from 'react'

import useAgora from '../hooks/useAgora';

// import { Avatar } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

import MediaPlayer from './MediaPlayer';
import MediaControls from './MediaControls';
import Portrait from './Portrait';
import IconButton from './IconButton';

import API from '../services/api';

import { actionTypes } from '../contexts/reducer';
import { useStateValue } from '../contexts/StateProvider';

function Call() {

    const { localAudioTrack, localVideoTrack, joinState, remoteUsers, joinChannel, leaveChannel } = useAgora();
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
        dispatch({
            type: actionTypes.SET_CALL,
            call: null
        })
        leaveChannel();
    }

    return (
        <div className="flex flex-col flex-grow items-center bg-white p-6 shadow rounded">
            {
                !joinState
                ?
                <>
                    <Portrait 
                        src="https://c.stocksy.com/a/rIb100/z9/381725.jpg"  
                        name="Suzzane Maloney" role="counselor" status="connecting..."
                    />
                    <div className="flex mt-5 mb-14">
                        <IconButton icon={<CallIcon />} />
                        <IconButton icon={<VideocamIcon />} action={handleCallConnect} />
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
