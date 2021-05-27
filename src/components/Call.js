import React, { useState } from 'react'

import AgoraRTC from "agora-rtc-sdk-ng";

import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

import MediaPlayer from './MediaPlayer';

import { Avatar } from '@material-ui/core';

const rtc = {
    client: null,
    localAudioTrack: null,
    localVideoTrack: null,
};

const options = {
    appId: "be8aca7927fa42b99ab959738c24e60f",
    appSecret: "2788948a5d5a4944a4d52424ec7cc408",
    channel: "agora",
    token: "006be8aca7927fa42b99ab959738c24e60fIABCXkqj89p0ek5+g3QeDLDcX9RxLSWsX3aWtYGjhRXoMv2gtqAAAAAAEAA8g5F5gzuxYAEAAQCDO7Fg",
};

rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

function Call() {

    const [isUserJoined, setIsUserJoined] = useState(false);

    const handleDisconnect = () => { leaveChannel() }

    const joinChannel = async () => {
        const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
        console.log("🤵🏻 uid", uid);
        
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

        // rtc.localVideoTrack.play(videoContainerRef.current)
        
        const published = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
        setIsUserJoined(true);
        console.log("🚀 user published success!", published, rtc);
    }
    
    console.log("😎", rtc.client.remoteUsers);
    
    const leaveChannel = async () => {
        console.log("⛔ leaving channel...")
        if (rtc.localAudioTrack) {
            rtc.localAudioTrack.stop();
            rtc.localAudioTrack.close();
        }
        if (rtc.localVideoTrack) {
            rtc.localVideoTrack.stop();
            rtc.localVideoTrack.close();
        }
        setIsUserJoined(false);
        // setRemoteUsers([]);
        await rtc.client?.leave();
    }

    return (
        <div className="flex flex-col flex-grow items-center bg-white p-6 shadow rounded">
            {
                !isUserJoined
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
                    <MediaPlayer rtc={rtc} audioTrack={rtc.localAudioTrack} videoTrack={rtc.localVideoTrack} disconnect={handleDisconnect}/>
                </>
            }
        </div>
    )
}

export default Call
