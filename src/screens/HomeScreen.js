import React from 'react'

import CallIcon from '@material-ui/icons/Call';
import VideocamIcon from '@material-ui/icons/Videocam';

import Portrait from '../components/Portrait';
import IconButton from '../components/IconButton';

function HomeScreen({ handleCallConnect }) {
    return (
        <div className="flex-row space-y-6 md:flex md:space-y-0 space-x-6 my-6">
            <div className="flex flex-col flex-grow items-center bg-white p-6 shadow rounded">
            <Portrait
                src="https://c.stocksy.com/a/rIb100/z9/381725.jpg"
                name="Suzzane Maloney" role="counselor"
            />
            <div className="flex mt-5 mb-14">
                <IconButton icon={<CallIcon />} />
                <IconButton icon={<VideocamIcon />} action={handleCallConnect} />
            </div>
            </div>
        </div>
    )
}

export default HomeScreen
