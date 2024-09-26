'use client';
import { useState } from "react";

const EmailList = () => {

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
  
    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
  
    const handleEmailChange = (e: any) => {
      const value = e.target.value;
      setEmail(value);
      setIsEmailValid(validateEmail(value));
    };
  
    const joinNewsLetter = () => {
      alert("Testing newsletter button!")
      console.log(email)
    }

    return (
        <>
          <div className="relative w-fit text-center flex justify-center items-center gap-8">
            <label>WoShi Cat Newsletter!</label>
            <div className="flex justify-center border-2 rounded-md bg-white focus:ring-2 focus:ring-inset focus:ring-stone-600">
                <input id='email' name='email' type='email' autoComplete="email" placeholder="general@woshicat.com"
                className="flex w-48 lg:w-72 text-center border-0 py-1.5 pe-1.5 text-stone-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleEmailChange} required/>
                <button
                  type="submit"
                  className="m-1 rounded-md bg-stone-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-stone-500 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                  onClick={joinNewsLetter}
                  disabled={!isEmailValid}
                  >
                  Submit!
                </button>
                <div className={`absolute top-12 right-0 z-[999] text-red-600 text-sm ${!isEmailValid ? '' : 'hidden'}`}>Yoyo Says: Use a valid email pls...</div>
            </div>    
          </div>
        </>
    )
}

export default EmailList;