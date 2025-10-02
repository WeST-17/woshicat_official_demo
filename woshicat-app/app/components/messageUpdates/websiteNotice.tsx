'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Notice = () => {
    const date = new Date();
    const [notice, setNotice] = useState<boolean>(false);
    
    useEffect(() => {
        const storedValue = localStorage.getItem('notice');
        setTimeout(() => {
            if (!storedValue || date.getTime() - parseInt(storedValue) >= 259200000 ) {
                setNotice(true);
                localStorage.setItem('notice', `${date.getTime()}`);
                
            }
        }, 300)
        
    }, []);

    const closeNotice = () => {
        const noticeContainer = document.getElementsByClassName('notice-container')[0];
        noticeContainer.classList.toggle("close-notice");

        setTimeout(() => {
            setNotice(false);
            console.log('notice viewed');
        }, 500);
    };

    return (
        <>
        {notice && (
        <>
            <div className="z-[2005] fixed inset-0 w-full h-[100vh] flex justify-center items-center transition duration-500 notice-container" onClick={closeNotice}>
            <div className="relative lg:w-2/3 lg:h-2/3 w-4/5 h-fit flex max-md:flex-col justify-center items-center overflow-hidden rounded-md">
                <button className="absolute top-0 right-1 w-fit h-fit m-2 z-[100]" onClick={closeNotice}>close</button>
                <section className="relative w-fit md:w-1/3 h-full flex flex-col justify-center items-center text-center md:text-start p-5 gap-4 shrink">
                <Image
                    src="/logo/Logo Red Version Clean.png"
                    alt="WoShi Cat Red Logo"
                    width={80}
                    height={1}
                    className="z-[100]"
                />
                <p className="lg:text-xl text-base z-[100] text-black w-full">{`Our online store will be closed until Oct 6, 2025`}</p>
                <p className="lg:text-base text-sm z-[100] text-black w-full">{`We'll be at Asia Times Square's 18th Annual Mid-Autumn Festival. Meet us there !!`}</p>
                <Link href={"https://linktr.ee/asiatimessquare"} target="_blank" className="z-[100] w-full opacity-75 hover:opacity-100 transition duration-450 text-black flex justify-center items-center">
                    <p className="w-full text-xs p-2 border-2 border-red-900/20 hover:border-red-900 hover:bg-red-900/50 rounded-md transition duration-450 text-center">
                    {`linktr.ee.com/asiatimessquare`}
                    </p>
                </Link>
                
                </section>
                <section className="relative w-full md:w-2/3 h-full flex justify-center items-center p-5">
                <Image
                    src={"https://asiatimessquare.com/wp-content/uploads/2025/06/3.png"}
                    alt="Asia Times Square 18th Annual Mid-Autumn Festival Promotion graphic"
                    width={400}
                    height={1}
                    className="object-contain w-full rounded-md"
                />
                </section>
                <div className="absolute top-0 right-0 w-full h-full bg-white/90 z-[-1]" />
            </div> 
            </div>
            <div className="absolute top-0 right-0 w-full h-full bg-black/50 z-[2000]" />
            </>
        )}
        </>
    )
};

export default Notice;