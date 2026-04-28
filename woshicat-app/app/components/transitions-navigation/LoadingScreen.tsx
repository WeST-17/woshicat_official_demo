'use client';
import Image from "next/image";
import { DarkMode } from "../toggles/Dark_Mode/darkModeContext";

const Loader = () => {
    const { darkMode } = DarkMode();

    return (
        <div className={`w-full h-full flex flex-col justify-center items-center ${darkMode ? 'bg-stone-900/90' : 'bg-white'}`}>
            <Image
                src="/loading_assets/Yoyo_Walk_Cycle_Forward.gif"
                alt="Yoyo walk cycle"
                width={500}
                height={1}
                className={`object-contain opacity-90 ${darkMode ? 'invert' : ''}`}
                unoptimized={true}
            />
        </div>
    )
}

export default Loader;