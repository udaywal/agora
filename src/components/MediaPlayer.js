import React, { useEffect, useRef } from 'react';

import './MediaPlayer.css';

import { Avatar } from '@material-ui/core';

import Portrait from './Portrait'

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
                <div ref={videoContainerRef} className="player" style={{ overflow: 'hidden' }} ></div>
                :
                <div className="player" style={{ overflow: 'hidden', background: '#143b5e', position: 'relative' }} >
                    {/* <Avatar 
                        src="https://c.stocksy.com/a/rIb100/z9/381725.jpg" className="mt-14 shadow-lg" 
                        style={{ width:"150px",  height:"150px", position: 'absolute', left: 250, top: 60 }} /> */}
                    <Portrait 
                        src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        type="audioonly"
                    />
                </div>
            }    
        </>
    )
}

export default MediaPlayer
