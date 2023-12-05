import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {

    const dispatch = useDispatch();

    const langKey = useSelector((store) => store.config.lang)

    const searchText = useRef(null)

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );
        const json = await data.json();

        return json.results;
    };

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);
        // Make an API call to GPT API and get Movie Results

        const gptQuery = "Act as a Movie recommendation system and suggest some movies for the query 👍" +
            searchText.current.value +
            ". Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: gadar, Sholay, Don ,Golmaal, Koi mil gaya ";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });



        console.log(gptResults.choices?.[0]?.message?.content)
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")

        // For each movie I will search TMDB API

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults)
        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));

    };

    return (
        <div className=' pt-[10%] md:pt-[10%] flex justify-center' >
            <form className=' w-full md:w-1/2 grid grid-cols-12 bg-black rounded-sm ' onSubmit={(e) => e.preventDefault()} >
                <input
                    ref={searchText}
                    className=' p-4 m-4 col-span-9 '
                    type='text'
                    placeholder={lang[langKey].gptSerachPlaceholder}
                />
                <button
                    className=' col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg '
                    onClick={handleGptSearchClick}
                >
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;