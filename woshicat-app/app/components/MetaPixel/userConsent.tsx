'use client';

import Link from "next/link";
import { useMetaPixel } from "./PixelContext";

const UserConsent = () => {
    const { consent, setConsent, hideNotice, setHideNotice } = useMetaPixel();

    function userSubmitConsent(x: string) {
        setConsent(x);
        setHideNotice(true);
        localStorage.setItem('consent', x);
        return;
    };

    return (
        <>
            {(consent === null && hideNotice === false) && (
                <section className={`z-[3100] bg-white/90 p-8 fixed bottom-0 w-full lg:w-half h-fit flex flex-col justify-end items-center transition-all duration-500 gap-4 ${hideNotice ? 'hidden' : ''}`}>
                    <button 
                        className="absolute top-0 right-0 text-sm m-1 h-fit border-test px-1 rounded-md border border-2 border-stone-400 flex justify-center items-center hover:text-red-800 opacity-50 hover:opacity-100"
                        onClick={() => { setHideNotice(true); }}
                    >
                        {`close`}
                    </button>
                    <div className="w-full flex max-md:flex-col justify-center items-center gap-2">
                        <h2 className="w-full text-sm">
                        {`This website utilizes third party analytics tracking to enhance web navigation, analyze website usage, and support our marketing and advertising efforts. Although we do not sell personal information in exchange for money, some of the ways in which we share personal information for targeted advertising or analytics may be considered “sales” or “sharing” for targeted advertising under U.S. state privacy laws. Your data is processed in accordance to our `} 
                        <Link href={'https://woshicat.com/privacy-policy'} className="transition duration-500 hover:text-[#CD000A]">{`privacy policy, linked here. `}</Link> 
                        {`You can OPT-IN to our analytics tracking to support our team and our website by clicking 'Accept'. You can change your preferences at any time. Thanks for supporting WoShi Cat!`}
                        </h2>

                        <div className="relative w-full flex justify-center items-center text-base transition-all duration-500 gap-4">
                            <button className="w-48 h-fit rounded-md border border-2 border-stone-400 flex justify-center items-center hover:text-red-800" onClick={() => userSubmitConsent('grant')}>
                                Grant
                            </button>
                            <button className="w-48 h-fit rounded-md border border-2 border-stone-400 flex justify-center items-center hover:text-red-800" onClick={() => userSubmitConsent('revoke')}>
                                Revoke
                            </button>
                        </div>
                    </div>
                    <h3 className="w-full text-start flex justify-start items-end text-xs">{`* Note: this opt-in does not include cookies that are required for necessary website functions.`}</h3>
                </section>
            )}
    
        </>
    )
};

export default UserConsent;