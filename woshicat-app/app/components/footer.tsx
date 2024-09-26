import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="relative col-span-8 grid-cols-8 self-end items-center justify-center min-h-[250px] bg-stone-50 text-base text-stone-700">
            <div className="col-span-8 flex gap-4 justify-center text-center pt-8 pb-4">
                <Link href={'/privacy'}>Privacy Policy</Link>
                <Link href={'/terms_of_service'}>Terms of Service</Link>
                <Link href={'/faq'}>FAQ</Link>
                <Link href={'/faq#contact'}>Contact Us</Link>
            </div>
            <div className="col-span-8 mb-3">
                {/* Social Media */}
                <div className='flex text-sm text-stone-400 justify-center items-center'>
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://instagram.com/woshicatofficial' target='_blank'>
                            <Image 
                                src={'/logo/instagram-brands-solid.svg'}
                                alt={'Instagram'}
                                className="text-stone-700"
                                width={25}
                                height={25}
                            />
                        </Link>
                    </div>
                    <div className="text-center rounded-md hover:text-stone-900 transition duration-300 p-2">
                        <Link href='https://tiktok.com/woshicatofficial' target='_blank'>
                            <Image 
                                src={'/logo/tiktok-brands-solid.svg'}
                                alt={'TikTok'}
                                className="text-stone-700"
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>
                    
                </div>
            </div>
            <div className="text-sm text-center w-full flex self-end items-center justify-center col-span-8">
                &copy; WoShi Cat, 2024
            </div>
        </footer>
    )
}

export default Footer;