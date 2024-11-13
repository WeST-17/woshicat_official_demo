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
    // e.preventDefault(); // Prevent form submission

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
     <div className={`transition-opacity duration-500 fixed inset-y-32 w-full h-96 flex justify-center items-center z-[1000] rounded-md modal ${isSubmitted === true ? 'open' : 'close pointer-events-none'}`}>
        <div className="relative w-4/5 md:w-1/2 gap-3 flex flex-col justify-center items-center h-full bg-[#FAF9F6] rounded-md z-[1001] text-white shadow-xl">
          <Image 
            src={'/media/graphics/Yoyo happy.png'}
            alt={'Something is coming, and Yoyo is at the bottom of it...'}
            fill={true}
            className="object-cover rounded-md"
          />
          <p className="text-4xl z-[1002] text-center w-4/5">
            Thanks for joining our newsletter!
          </p>
          <div className="z-[1003] text-center w-4/5 hover:text-sky-300/50 transition duration-300">
            <Link href={'https://www.instagram.com/woshicatofficial'} target="_blank">
              <p>Follow us on Instagram @woshicatofficial</p>
            </Link>
          </div>
          
          <div className="absolute w-full h-full bg-black/80 rounded-md" />
          <button onClick={closeConfirmation} className="absolute top-0 right-0 m-4 z-[1002]">close</button>
        </div>
      </div>
      <form
        className="relative w-[320px] h-[150px] md:w-full text-start flex flex-col justify-start items-center"
      >
        <div className="text-2xl flex justify-center items-center gap-3">
          <h1>WoShi Cat Newsletter!</h1> 
          <Image 
          src={'/media/graphics/Yoyo happy.png'}
          alt={'Yoyo is slightly smiling...'}
          width={50}
          height={1}
        /></div>
        <div className="flex justify-center border-2 rounded-md bg-white focus:ring-2 focus:ring-inset focus:ring-stone-600">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="shop@woshicat.com"
            className="flex w-full md:w-80 text-center border-0 py-1 px-1.5 text-stone-700 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            onChange={handleEmailChange}
            required
          />
          <button
            type="button"
            className={`m-1 rounded-md w-10 h-10 flex justify-center items-center aspect-square text-sm font-semibold text-white shadow-sm transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 ${
              !isEmailValid || email === '' ? 'bg-stone-200' : 'bg-stone-400 hover:bg-stone-500'
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
          className={`mt-2 z-[999] text-red-600 text-sm ${
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