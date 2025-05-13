import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    return (
    <div className="w-screen h-[100vh] flex flex-col justify-start items-center">
         <Image
            src={'/media/yoyo_yellow_sticker.png'}
            alt={'sad yoyo subway sticker'}
            width={300}
            height={1}
            className="pointer-events-none mb-12"
        />
        <h2 className="mb-4 text-2xl text-center">{`404 - Yoyo couldn't find the page he wanted to show you...`}</h2>
        
        <Link href={'/'} className="bg-black/50 text-white p-2 hover:bg-black transition duration-250">Return to Homepage</Link>
    </div>
    )
}

export default NotFound;