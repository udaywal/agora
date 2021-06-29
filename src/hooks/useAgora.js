import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

// const rtc = {
//     client: null,
//     localAudioTrack: null,
//     localVideoTrack: null,
// };

const options = {
    appId: "be8aca7927fa42b99ab959738c24e60f",
    appSecret: "2788948a5d5a4944a4d52424ec7cc408",
    channel: "agora",
    token: "006be8aca7927fa42b99ab959738c24e60fIABjXqZlrp1Oqnizl93J+8XkxCAENRhLa1g0rBLpYnJpz/2gtqAAAAAAEAAm+nFWH4ncYAEAAQAdidxg",
};

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });

export default function useAgora() {

    const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
    const [localVideoTrack, setLocalVideoTrack] = useState(undefined);

    const [joinState, setJoinState] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);

    const joinChannel = async () => {
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);

        const uid = await client.join(options.appId, options.channel, options.token, null);
        console.log("🤵🏻 uid", uid);

        await client.publish([microphoneTrack, cameraTrack]);
        console.log("🚀 user published success!");
        setJoinState(true);
    }

    async function leaveChannel() {
        if (localAudioTrack) {
            localAudioTrack.stop();
            localAudioTrack.close();
        }
        if (localVideoTrack) {
            localVideoTrack.stop();
            localVideoTrack.close();
        }
        setRemoteUsers([]);
        setJoinState(false);
        await client?.leave();
    }
 
    useEffect(() => {
        if (!client) return;
        setRemoteUsers(client.remoteUsers);

        const handleUserPublished = async (user, mediaType) => {
            console.log("🙋🏻‍♀️ AgoraRTCRemoteUser", user)
    
            // Subscribe to a remote user.
            await client.subscribe(user, mediaType);
            console.log("Remote users subscribe success.");

            setRemoteUsers(Array.from(client.remoteUsers));
        }

        const handleUserUnpublished = (user) => {
            setRemoteUsers(Array.from(client.remoteUsers));
        }

        const handleUserJoined = (user) => {
            setRemoteUsers(Array.from(client.remoteUsers));
        }

        const handleUserLeft = (user) => {
            setRemoteUsers(Array.from(client.remoteUsers));
        }

        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);
        client.on('user-joined', handleUserJoined);
        client.on('user-left', handleUserLeft);

        return () => {
            client.off('user-published', handleUserPublished);
            client.off('user-unpublished', handleUserUnpublished);
            client.off('user-joined', handleUserJoined);
            client.off('user-left', handleUserLeft);
        };
    }, [client]);

    return {
        localAudioTrack,
        localVideoTrack,
        joinState,
        remoteUsers,
        joinChannel,
        leaveChannel
    };
}