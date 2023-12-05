import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { AVATAR_LOGO, BG_URL } from '../utils/constants';



const Login = () => {


  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const togleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Validate form data
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    //Sign In Sign Up Logic
    if (!isSignInForm) {
      // Sign UP  Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR_LOGO,
          }).then(() => {
            // Profile updated

            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              }))
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });

    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)

        });
    }
  };

  return (
    <div>
      <Header />

      <div className='absolute'>
        <img
          className='h-screen object-cover md:h-auto '
          src={BG_URL}
          alt="Logo" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-[30%] absolute p-12 bg-black my-20 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80' >

        <h1 className='font-bold text-3xl py-0 '>
          {isSignInForm ? "Sign In" : "Sign Up"} </h1>

        {!isSignInForm &&
          <input
            ref={name}
            type="text"
            placeholder='User name'
            className='p-3 my-4 w-full bg-gray-800 rounded-md'
          />}

        <input
          ref={email}
          type="text"
          placeholder='Email or phone number'
          className='p-3 my-4 w-full bg-gray-800 rounded-md'
        />

        <input
          ref={password}
          type="password"
          placeholder='Password'
          className='p-3 my-4 w-full bg-gray-800 rounded-md'
        />

        <p className='text-red-600 font-semibold text-sm py-0'>{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className='p-4 my-4 bg-red-700 w-full rounded-lg' >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className=' mt-0 mb-4 '>
          <input type="checkbox" id="myCheckbox" />
          <label className='text-gray-500 '
            htmlFor="myCheckbox"> Remember me</label>
        </div>

        <p className='text-lg cursor-pointer ' onClick={togleSignInForm} >
          {isSignInForm ? " New to Netflix? Sign Up Now" : "Already a user? Sign In now"}
        </p>

        <p className='text-sm my-2 text-gray-500' >This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</p>

      </form>



    </div>
  )
}

export default Login