'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddEmailSubscriber from "./action-klaviyo";

const EmailList = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSubmitted, SetIsSubmitted] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const joinNewsletter = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    if (isEmailValid && email !== '') {
      AddEmailSubscriber(email);
    }
    SetIsSubmitted(true);
  };

  const closeConfirmation = () => {
    SetIsSubmitted(false);
  }

  return (
    <>
     <div className={`transition-opacity duration-500 fixed inset-y-32 w-full h-96 flex justify-center items-center z-1000 rounded-md modal ${isSubmitted === true ? 'open' : 'close pointer-events-none'}`}>
        <div className="relative w-4/5 md:w-1/2 gap-3 flex flex-col justify-center items-center h-full bg-[#FAF9F6] rounded-md z-1001 text-white shadow-xl">
          <Image 
            src={'/media/graphics/Yoyo happy.png'}
            alt={'Something is coming, and Yoyo is at the bottom of it...'}
            fill={true}
            className="object-cover rounded-md"
          />
          <p className="text-4xl z-1002 text-center w-4/5">
            Thanks for joining our newsletter!
          </p>
          <div className="z-1003 text-center w-4/5 hover:text-sky-300/50 transition duration-300">
            <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
              <p>Follow us on Instagram @woshicatofficial</p>
            </Link>
          </div>
          
          <div className="absolute w-full h-full bg-black/80 rounded-md" />
          <button onClick={closeConfirmation} className="absolute top-0 right-0 m-4 z-1002">close</button>
        </div>
      </div>
      <form
        className="relative w-[320px] h-[150px] text-start flex flex-col justify-start items-center mb-3"
      >
        <div className="relative text-xl flex justify-center items-center gap-3 w-full">
          <h2>WoShi Cat Newsletter!</h2> 
          <Image 
            src={'/media/graphics/Yoyo Single Shot.png'}
            alt={'Yoyo is slightly smiling...'}
            width={80}
            height={1}
            className="translate-y-5 hover:translate-y-0 transition duration-300 ease"
          />
          <div className="absolute rounded-full bg-red-600 w-2 h-2 right-10 -top-8"></div>
        </div>
        <div className={`z-999 flex w-full justify-center border-2 rounded-md bg-white focus:ring-2 focus:ring-inset focus:ring-stone-600`}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="shop@woshicat.com"
            className={`flex w-full text-center border-0 py-1 px-1.5 text-stone-700 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${!isEmailValid ? 'outline-2 outline-red-600' : ''}`}
            onChange={handleEmailChange}
            required
          />
          <button
            type="button"
            className={`m-1 rounded-md w-10 h-10 flex justify-center items-center aspect-square text-sm font-semibold text-white shadow-xs transition duration-300 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${
              !isEmailValid || email === '' ? 'bg-stone-100' : 'bg-stone-400 hover:bg-stone-500'
            }`}
            disabled={!isEmailValid || email === ''}
            onClick={joinNewsletter}
          >
            <Image
              src={'/icons/paper-plane-regular.svg'}
              alt={'submit'}
              width={15}
              height={15}
            />
          </button>
        </div>
        <div
          className={`mt-2 z-999 text-red-600 text-base absolute bottom-0 left-0 ${
            !isEmailValid ? '' : 'hidden'
          }`}
        >
          Yoyo Says: Use a valid email please...
        </div>
      </form>
      
    </>
  );
};

export default EmailList;