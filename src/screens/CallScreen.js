import React from 'react';

import MediaPlayer from '../components/MediaPlayer';
import MediaControls from '../components/MediaControls';

import AccessTimeIcon from '@material-ui/icons/AccessTime';

function CallScreen({ 
    localAudioTrack, 
    localVideoTrack, 
    remoteUsers, 
    handleAudio, 
    handleVideo, 
    handleCallDisconnect, 
    playing 
}) {

    

    return (
        <div className="flex flex-col items-center h-screen" style={{ background: '#102f4b' }}>
            
            <div className="flex flex-col w-full p-2 text-gray-300">
                <h3 className="text-md font-bold">Suzzane Maloney</h3>
                <p className="text-sm"><AccessTimeIcon style={{fontSize:'16px'}} />  00:30</p>
            </div>

            <div className="md:flex items-center justify-center player_screen">
                <MediaPlayer audioTrack={localAudioTrack} videoTrack={localVideoTrack} playing={playing} mine={true} />
                {
                    remoteUsers.map(user => (
                        <div key={user.uid}>
                            <MediaPlayer audioTrack={user.audioTrack} videoTrack={user.videoTrack} />
                        </div>
                    ))
                }
            </div>
            
            <div className="fixed bottom-0 w-full p-4 rounded-xl shadow-xl" style={{ background: '#091c2e' }}>
                <MediaControls audio={handleAudio} video={handleVideo} disconnect={handleCallDisconnect} />
            </div>

        </div>
    )
}

export default CallScreen
