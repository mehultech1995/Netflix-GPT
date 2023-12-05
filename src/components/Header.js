import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const showgptSearch = useSelector((store) => store.gpt.showgptSearch)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      }).catch((error) => {
        navigate("/error")
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    return () => unsubscribe();
  }, [])

  const handleGptSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div
      className='absolute z-10 px-8 py-2 bg-gradient-to-b from-black w-screen flex flex-col md:flex-row justify-between ' >
      <img className='w-44 mx-auto md:mx-0 '
        src={NETFLIX_LOGO}
        alt="Netflix-Logo" />

      {user && (
        <div className='flex p-4 justify-between '>

          {
            showgptSearch && <select className='p-2 bg-gray-900 text-white rounded-sm cursor-pointer '
              onChange={handleLanguageChange} >
              {SUPPORTED_LANGUAGES.map(lang =>
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              )}
            </select>
          }

          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg '
            onClick={handleGptSearchClick}
          >
            {showgptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className='hidden md:block w-12 h-12'
            src={user?.photoURL}
            alt="logoicon" />
          <button onClick={handleSignOut}
            className='font-semibold text-white ' >
            (Sign out)</button>
        </div>
      )}
    </div>
  )
}

export default Header;