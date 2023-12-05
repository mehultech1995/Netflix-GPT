import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMoviesSuggesions from './GptMoviesSuggesions';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
    return (
        <>
            <div className='fixed -z-10'>
                <img
                    className='h-screen object-cover  md:h-auto '
                    src={BG_URL}
                    alt="Logo" />
            </div>
            <div className='pt-[35%] md:p-0 '>
                <GptSearchBar />
                <GptMoviesSuggesions />
            </div>
        </>
    )
}

export default GptSearch;
