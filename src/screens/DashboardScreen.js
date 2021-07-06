import React, { useEffect, useState } from 'react';

import useAgora from '../hooks/useAgora';

import API from '../services/api';

import { actionTypes } from '../contexts/reducer';
import { useStateValue } from '../contexts/StateProvider';

import HomeScreen from './HomeScreen';
import CallScreen from './CallScreen';

function DashboardScreen() {

    const { localAudioTrack, localVideoTrack, joinState, remoteUsers, joinChannel, leaveChannel } = useAgora();
    const [playing, setPlaying] = useState(true);

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
            if (call && call.incoming) {
                console.log("incoming call 📲📞")
                joinChannel(call.channel, call.token)
            } else {
                const apiResponse = await API._outgoingCall({ callerId: 1, calleeId: 2 });
                if (apiResponse && apiResponse.success) {
                    console.log("outgoing call 📤📞", apiResponse.data)
                    joinChannel(apiResponse.data.channel, apiResponse.data.token)
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

    useEffect(() => {
        if (call && call.incoming) {
            handleCallConnect()
        }
    }, [])

    return (
        <div >
            {
                !joinState
                ?
                <HomeScreen handleCallConnect={handleCallConnect} />
                :
                <CallScreen 
                    localAudioTrack={localAudioTrack} 
                    localVideoTrack={localVideoTrack} 
                    remoteUsers={remoteUsers}
                    handleAudio={handleAudio} 
                    handleVideo={handleVideo}
                    handleCallDisconnect={handleCallDisconnect}
                    playing={playing}
                />
            }
        </div>
    )
}

export default DashboardScreen
