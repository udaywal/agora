import React, { useState } from 'react'
import Call from './Call'
import Chat from './Chat'

import { getDeviceToken, onMessageListener } from '../utils/firebase'

function App() {

    const [isTokenFound, setTokenFound] = useState(false);
    const [deviceToken, setDeviceToken] = useState("");
    const [notification, setNotification] = useState({title: '', body: ''});
    
    getDeviceToken(setTokenFound, setDeviceToken);

    onMessageListener().then(payload => {
        // setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log("message listener", payload);
        alert(`${notification.title} & ${notification.body}`)
    }).catch(err => console.log('failed: ', err));

    

    return (
        <div className="bg-gray-100 overflow-auto">
            <div className="h-screen max-w-screen-lg mx-auto">
                <div className="flex-row space-y-6 md:flex md:space-y-0 space-x-6 my-6">
                    <Call />
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default App
