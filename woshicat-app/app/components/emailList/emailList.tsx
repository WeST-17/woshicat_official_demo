'use client';
import { useState } from "react";
import Image from "next/image";

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
          <form className="relative w-[320px] h-[120px] md:w-full text-start flex flex-col justify-start items-center gap-2">
            <div className="text-2xl">WoShi Cat Newsletter!</div>
            <div className="flex justify-center border-2 rounded-md bg-white focus:ring-2 focus:ring-inset focus:ring-stone-600">
                <input id='email' name='email' type='email' autoComplete="email" placeholder="help@woshicat.com"
                className="flex w-full md:w-96 text-center border-0 py-1 px-1.5 text-stone-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleEmailChange} required/>
                <button
                  type="submit"
                  className={`m-1 rounded-md w-10 h-10 flex justify-center items-center aspect-square text-sm font-semibold text-white shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${!isEmailValid || email === '' ? 'bg-stone-200' : 'bg-stone-400 hover:bg-stone-500'}`}
                  onClick={joinNewsLetter}
                  disabled={!isEmailValid || email === ''}
                  >
                  <Image src={'/icons/paper-plane-regular.svg'} alt={'submit'} width={15} height={15}/>
                </button>
                
            </div> 
            <div className={`z-[999] text-red-600 text-sm ${!isEmailValid ? '' : 'hidden'}`}>Yoyo Says: Use a valid email please...</div> 
          </form>
        </>
    )
}

export default EmailList;