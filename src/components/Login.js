import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



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
            photoURL: "https://avatars.githubusercontent.com/u/114760517?v=4",
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
          console.log(user)
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

      <div>
        <img
          className='absolute'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Logo" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className='absolute text-white p-10 bg-black w-1/3 my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-md' >

        <h1 className='font-semibold text-3xl py-4 '>
          {isSignInForm ? "Sign In" : "Sign Up"} </h1>

        {!isSignInForm &&
          <input
            ref={name}
            className='p-3 my-4 w-full bg-gray-800 rounded-md '
            type="text"
            placeholder='User name' />}

        <input
          ref={email}
          className='p-3 my-4 w-full bg-gray-800 rounded-md '
          type="text"
          placeholder='Email or phone number' />

        <input
          ref={password}
          className='p-3 my-4 w-full bg-gray-800 rounded-md '
          type="password"
          placeholder='Password' />

        <p className='text-red-600 font-semibold'>{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className='p-3 mt-10 bg-red-600 w-full rounded-md ' >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className=' mt-2 mb-12 '>
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