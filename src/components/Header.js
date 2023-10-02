import React from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/")
      }).catch((error) => {
        navigate("/error")
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, [])

  return (
    <div
      className='absolute z-10 px-8 py-2 bg-gradient-to-b from-black w-screen flex justify-between ' >
      <img className='w-44'
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix-Logo" />

      {user && (
        <div className='flex p-4 '>
          <img
            className='w-10 h-10 '
            src={user?.photoURL}
            alt="logoicon" />
          <button onClick={handleSignOut}
            className='font-bold' >
            (Sign out)</button>
        </div>
      )}
    </div>


  )
}

export default Header;