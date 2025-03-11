import Link from "next/link";
import Image from "next/image";
import EmailList from "../email-list/EmailList";

const Footer = () => {
    return (
        <footer className="relative grid-cols-8 self-end items-center justify-center h-[200px] bg-stone-50 text-base text-stone-700">
            <div className="col-span-8 p-4">
                {/* Email subscription list! */}
                <div className="flex w-full justify-center items-center bg-stone-50 min-h-fit pt-8">
                    <EmailList />
                    
                </div>
                <div className="border-t border-stone-400"/>
                {/* Social Media */}
                <div className='flex text-sm text-stone-400 justify-center items-center'>
                    {/* Instagram */}
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://instagram.com/woshicatofficial' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/instagram-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={25}
                                height={25}
                            />
                        </Link>
                    </div>
                    {/* YouTube */}
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://youtube.com/@woshicat_official' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/youtube-brands.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </div>
                     {/* TikTok */}
                     <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://www.tiktok.com/@woshicatofficial' target='_blank' className="flex justify-center items-center gap-2">
                            <Image 
                                src={'/logo/tiktok-brands-solid.svg'}
                                alt={'Instagram - WoShi Cat Official!'}
                                className="opacity-50 hover:opacity-100 transition duration-300"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="col-span-8 flex max-md:flex-col gap-4 justify-center text-center text-sm text-stone-400">
                <Link href={'/privacy-policy'} className="hover:text-black transition duration-250">Privacy Policy</Link>
                <Link href={'/terms-of-service'} className="hover:text-black transition duration-250">Terms of Service</Link>
                <Link href={'/about/faq'} className="hover:text-black transition duration-250">FAQ</Link>
                <Link href={'/contact-us'} className="hover:text-black transition duration-250">Contact Us</Link>
            </div>
            <div className="mt-4 text-sm text-center w-full flex self-end items-center justify-center col-span-8">
                WoShi Cat, LLC - 2024
            </div>
        </footer>
    )
}

export default Footer;