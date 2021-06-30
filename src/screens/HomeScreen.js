import React from 'react'
import Call from '../components/Call'
import Chat from '../components/Chat'

function HomeScreen() {
    return (
        <div className="flex-row space-y-6 md:flex md:space-y-0 space-x-6 my-6">
            <Call />
            <Chat />
        </div>
    )
}

export default HomeScreen
