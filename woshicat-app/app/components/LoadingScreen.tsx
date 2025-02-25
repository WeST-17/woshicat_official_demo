'use client';
import Image from "next/image";

const Loader = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <Image
                src="/loading_assets/Yoyo_Walk_Cycle_Forward.gif"
                alt="Yoyo walk cycle"
                width={500}
                height={1}
                unoptimized={true}
            />
        </div>
    )
}

export default Loader;