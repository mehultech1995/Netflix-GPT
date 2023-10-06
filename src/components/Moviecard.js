import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const Moviecard = ({ posterPath }) => {
    return (
        <div
            className='w-36 md:w-36 pr-4'
        >
            <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
        </div>
    )
}

export default Moviecard;