import React from 'react'
import Call from './Call'
import Chat from './Chat'

function App() {
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
