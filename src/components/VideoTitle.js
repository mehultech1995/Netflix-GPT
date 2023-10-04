import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className=' w-screen aspect-video pt-[14%] px-20 absolute text-white bg-gradient-to-r from-zinc-900 ' >
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-sm  w-1/3'>{overview}</p>
            <div className='my-4'>
                <button
                    className='bg-white text-black rounded-md text-lg p-2 px-6 hover:bg-opacity-70 ' >
                    ⏯️ Play</button>
                <button
                    className='bg-gray-500 text-black rounded-md text-lg p-2 px-6 mx-2 hover:bg-opacity-70' >
                    ℹ️ More Info</button>
            </div>


        </div>
    )
}
export default VideoTitle;