'use client';
import Image from "next/image";
import Link from "next/link";

interface ImgSource {
    imgSrc: string;
    altSrc: string;
    nickname: string;
    bio: string;
    dayJob?: string;
    social?: string;
    url?: string;
}

const AboutImage: React.FC<ImgSource> = ({imgSrc, altSrc, nickname, bio, dayJob, social, url}) => {
    return (
        <>
        <div className="flex flex-col justify-center items-center w-full aspect-square pb-3 mb-3">
            <div className="relative w-full mb-1">
                <img 
                    src={imgSrc}
                    alt={altSrc}
                    width={1000}
                    height={1}
                    className='object-cover aspect-square'
                />
                {url ? (
                    <Link href={url} className={`w-full`}>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 hover:opacity-0 transition-opacity duration-125 ease-in-out"/>
                    </Link>
                ) : (
                    <>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-25 hover:opacity-0 transition-opacity duration-125 ease-in-out"/>
                    </>
                )}
                
            </div>
            <div className="w-full h-40 md:h-32 border-b-2 border-stone-400 ">
                <h2 className="flex items-center w-full text-lg">{nickname}</h2>
                <p className="w-full flex items-center">
                    {bio}
                </p>
                {dayJob && (
                    <p className="w-full flex items-center text-sm">Day Job: {dayJob}</p>
                )}
                {social && (
                    <p className="w-full flex items-center hover:text-[#CD000A] transition duration-200 ease-in-out text-sm">{social}</p>
                )}
            </div>
        </div>
        </>
    )
}

export default AboutImage;