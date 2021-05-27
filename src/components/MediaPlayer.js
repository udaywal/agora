import React, { useEffect, useRef, useState } from 'react';
import MediaControls from './MediaControls';

function MediaPlayer(props) {

    const videoContainerRef = useRef(null);
    const remoteVideoContainerRef = useRef(null);

    const [remoteVideo, setRemoteVideo] = useState(false)

    const handleAudio = (data) => {
        // console.log("🎵 ", data, rtc.localAudioTrack)
        // console.log("🎵 ", rtc.localAudioTrack.getVolumeLevel())
        // console.log("🎵 ", rtc.localAudioTrack.stop())
        data
            ? props.audioTrack.setVolume(100)
            : props.audioTrack.setVolume(0);
    }

    const handleVideo = (data) => {
        // console.log("🎵 ", data, rtc.localVideoTrack.isPlaying)
        // console.log("🎵 ", rtc.localAudioTrack.getVolumeLevel())
        // console.log("🎵 ", rtc.localAudioTrack.stop())
        data
            ? props.videoTrack.play(videoContainerRef.current)
            : props.videoTrack.stop()
        // console.log("🎵 ", rtc.localVideoTrack.isPlaying)
    }

    const handleDisconnect = () => { props.disconnect() }

    // When remote user published media / gets online
    props.rtc.client.on("user-published", async (user, mediaType) => {
        console.log("🙋🏻‍♀️ AgoraRTCRemoteUser", user)

        setRemoteVideo(true);

        // Subscribe to a remote user.
        await props.rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        
        // If the subscribed track is video.
        if (mediaType === "video") {
            // Get `RemoteVideoTrack` in the `user` object.
            const remoteVideoTrack = user.videoTrack;
            // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
            remoteVideoTrack?.play("remote-stream");
        }
        
        // If the subscribed track is audio.
        if (mediaType === "audio") {
            // Get `RemoteAudioTrack` in the `user` object.
            const remoteAudioTrack = user.audioTrack;
            // Play the audio track. No need to pass any DOM element.
            remoteAudioTrack.play();
        }
    });

    useEffect(() => {
        if (!videoContainerRef.current) return;
        props.videoTrack?.play(videoContainerRef.current);
        return () => {
            props.videoTrack?.stop();
        };
    }, [videoContainerRef, props.videoTrack]);

    useEffect(() => {
        props.audioTrack?.play();
        return () => {
            props.audioTrack?.stop();
        };
    }, [props.audioTrack]);

    return (
        <>
            <div ref={videoContainerRef} style={{ width: "650px", height: "420px", borderRadius: '15px', overflow: 'hidden' }} ></div>
            {
                remoteVideo &&
                <div id="remote-stream" style={{ width: "300px", height: "200px", borderRadius: '10px', overflow: 'hidden' }} ></div>
            }
            <MediaControls audio={handleAudio} video={handleVideo} disconnect={handleDisconnect} />
            {/* <div id="remote-stream" style={{ width: "200px", height: "200px" }}></div> */}
        </>
    )
}

export default MediaPlayer
