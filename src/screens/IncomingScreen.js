import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';

import { actionTypes } from '../contexts/reducer';
import { useStateValue } from '../contexts/StateProvider';

import Portrait from '../components/Portrait';
import IconButton from '../components/IconButton';

function IncomingScreen() {

    const { userId, channel, token } = useParams();
    const history = useHistory();

    const [ , dispatch ] = useStateValue();

    const handleCallAccept = () => {
        /* TODO - Some logic to check whther it's a valid call.  */
        dispatch({
            type: actionTypes.SET_CALL,
            call: { 
                incoming: true, 
                outgoing: false,
                channel: channel, 
                token: decodeURIComponent(token) 
            }
        })
        history.push("/");
    }

    const handleCallReject = () => {
        dispatch({
            type: actionTypes.SET_CALL,
            call: null
        })
        history.push("/");
    }

    // useEffect(() => {
    //     if (channel) {
    //         dispatch({
    //             type: actionTypes.SET_CALL,
    //             call: { channel, token: decodeURIComponent(token) }
    //         })
    //     }
    // }, [])

    return (
        <div className="grid h-screen place-content-center" style={{ background: '#102f4b' }}>
            <Portrait 
                src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                status="Incoming Audio Call"
            />
            <div className="flex justify-center pt-16">
                <IconButton 
                    icon={<CallIcon style={{ color: 'green' }} />} 
                    action={handleCallAccept}
                />
                <div className="px-3"></div>
                <IconButton 
                    icon={<CallEndIcon style={{ color: 'red' }} />} 
                    action={handleCallReject} 
                />
            </div>
        </div>
    )
}

export default IncomingScreen
