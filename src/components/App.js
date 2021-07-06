import React, { useState } from 'react'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import DashboardScreen from '../screens/DashboardScreen';
import IncomingScreen from '../screens/IncomingScreen';

import { getDeviceToken, onMessageListener } from '../utils/firebase'

function App() {

    /* Handle user authentication and user&counselor data */
    

    const [isTokenFound, setTokenFound] = useState(false);
    const [deviceToken, setDeviceToken] = useState("");
    const [notification, setNotification] = useState({title: '', body: ''});
    
    /* Notifications */

    getDeviceToken(setTokenFound, setDeviceToken);

    onMessageListener().then(payload => {
        // setShow(true);
        setNotification({title: payload.notification.title, body: payload.notification.body})
        console.log("message listener", payload);
        alert(`${notification.title} & ${notification.body}`)
    }).catch(err => console.log('failed: ', err));

    /* Setting the users state */

    return (
        <div className="bg-gray-100 overflow-auto">
            {/* <div className="h-screen max-w-screen-lg mx-auto"> */}
            <div className="h-screen mx-auto">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={DashboardScreen} />
                    <Route path="/incoming/:userId/:channel/:token" component={IncomingScreen} />
                    <Route path="*" render={()=> <Redirect to="/" />} />
                </Switch>
            </BrowserRouter>
            </div>
        </div>
    )
}

export default App
