import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { actionTypes } from '../contexts/reducer';
import { useStateValue } from '../contexts/StateProvider';

import Call from '../components/Call';

function IncomingScreen() {

    const { userId, channel, token } = useParams();

    const [ , dispatch ] = useStateValue();

    useEffect(() => {
        if (channel) {
            dispatch({
                type: actionTypes.SET_CALL,
                call: { channel, token: decodeURIComponent(token) }
            })
        }
    }, [])

    return (
        <div>
            <Call />
        </div>
    )
}

export default IncomingScreen
