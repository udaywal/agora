// import { useState, useEffect } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';

// export default function useAgora(client) {

//     const [localVideoTrack, setLocalVideoTrack] = useState < ILocalVideoTrack | undefined > (undefined);
//     const [localAudioTrack, setLocalAudioTrack] = useState < ILocalAudioTrack | undefined > (undefined);

//     const [joinState, setJoinState] = useState(false);

//     const [remoteUsers, setRemoteUsers] = useState < IAgoraRTCRemoteUser[] > ([]);

//     async function createLocalTracks(audioConfig?: MicrophoneAudioTrackInitConfig, videoConfig?: CameraVideoTrackInitConfig)
//         : Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
//         const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
//         setLocalAudioTrack(microphoneTrack);
//         setLocalVideoTrack(cameraTrack);
//         return [microphoneTrack, cameraTrack];
//     }

//     const joinChannel = async () => {
//         const uid = await rtc.client.join(options.appId, options.channel, options.token, null);
//         console.log("🤵🏻 uid", uid);

//         rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//         rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

//         rtc.localVideoTrack.play("local-stream")

//         const published = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
//         console.log("🚀 user published success!", published, rtc);
//     }

//     async function leave() {
//         if (localAudioTrack) {
//             localAudioTrack.stop();
//             localAudioTrack.close();
//         }
//         if (localVideoTrack) {
//             localVideoTrack.stop();
//             localVideoTrack.close();
//         }
//         setRemoteUsers([]);
//         setJoinState(false);
//         await client?.leave();
//     }

//     useEffect(() => {
//         if (!client) return;
//         setRemoteUsers(client.remoteUsers);

//         const handleUserPublished = async (user, mediaType) => {
//             console.log("🙋🏻‍♀️ AgoraRTCRemoteUser", user)
    
//             // Subscribe to a remote user.
//             await rtc.client.subscribe(user, mediaType);
//             console.log("subscribe success");
          
//             // If the subscribed track is video.
//             if (mediaType === "video") {
//               // Get `RemoteVideoTrack` in the `user` object.
//               const remoteVideoTrack = user.videoTrack;
//               // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
//               remoteVideoTrack.play("remote-stream");
//             }
          
//             // If the subscribed track is audio.
//             if (mediaType === "audio") {
//               // Get `RemoteAudioTrack` in the `user` object.
//               const remoteAudioTrack = user.audioTrack;
//               // Play the audio track. No need to pass any DOM element.
//               remoteAudioTrack.play();
//             }
//         }

//         const handleUserUnpublished = (user) => {
//             setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
//         }

//         const handleUserJoined = (user) => {
//             setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
//         }

//         const handleUserLeft = (user) => {
//             setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
//         }

//         client.on('user-published', handleUserPublished);
//         client.on('user-unpublished', handleUserUnpublished);
//         client.on('user-joined', handleUserJoined);
//         client.on('user-left', handleUserLeft);

//         return () => {
//             client.off('user-published', handleUserPublished);
//             client.off('user-unpublished', handleUserUnpublished);
//             client.off('user-joined', handleUserJoined);
//             client.off('user-left', handleUserLeft);
//         };
//     }, [client]);

//     return {
//         localAudioTrack,
//         localVideoTrack,
//         joinState,
//         leave,
//         join,
//         remoteUsers,
//     };
// }