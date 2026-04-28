'use client';

import { DarkMode } from "./darkModeContext";

const DarkModeToggle = () => {
    const { darkMode, setDarkMode } = DarkMode();
    
    function toggle() {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <button className="relative inline-block w-10 h-5 flex justify-center items-center">
                <input id="dark-mode" type="checkbox" className="peer appearance-none w-full h-full bg-stone-400 rounded-full checked:bg-red-900 cursor-pointer transition-colors duration-300" onChange={toggle} />
                <label  htmlFor="dark-mode" className="absolute top-0 left-0 w-5 h-full bg-white rounded-full border border-stone-400  transition-transform duration-300 peer-checked:translate-x-5 peer-checked:border-[#6e08a] cursor-pointer">
                </label>
            </button>
        </>
    )
};

export default DarkModeToggle;