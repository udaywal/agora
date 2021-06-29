import React, { useEffect, useRef } from 'react';

import { Avatar } from '@material-ui/core';

function MediaPlayer({ audioTrack, videoTrack, playing = true, mine = false }) {

    const videoContainerRef = useRef(null);

    useEffect(() => {
        if (!videoContainerRef.current) return;
        if (!playing) {
            videoContainerRef.current = null;
        } else {
            videoTrack?.play(videoContainerRef.current);
        }
        return () => {
            videoTrack?.stop();
        };
    }, [videoContainerRef, videoTrack, playing]);

    useEffect(() => {
        if (!mine) {
            audioTrack?.play();
            return () => {
                audioTrack?.stop();
            };
        }
    }, [audioTrack]);

    return (
        <>
            {
                playing
                ?
                <div ref={videoContainerRef} style={{ width: "650px", height: "420px", borderRadius: '15px', overflow: 'hidden' }} ></div>
                :
                <div style={{ width: "650px", height: "420px", borderRadius: '15px', overflow: 'hidden', background: '#102f4b', position: 'relative' }} >
                    <Avatar 
                        src="https://c.stocksy.com/a/rIb100/z9/381725.jpg" className="mt-14 shadow-lg" 
                        style={{ width:"150px",  height:"150px", position: 'absolute', left: 250, top: 60 }} />
                </div>
            }    
        </>
    )
}

export default MediaPlayer
