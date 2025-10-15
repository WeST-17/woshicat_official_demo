'use client';

import { useToggle } from "./toggleContext";
import { useEffect, useState } from "react";

const ToggleButton = () => {
    const { smoothScroll, setSmoothScroll } = useToggle();
    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        setLoading(true);
        const getScrollSettings = localStorage.getItem("smooth-scroll");
        if (!getScrollSettings || getScrollSettings === 'false') {
            setSmoothScroll(false);
        } else {
            setSmoothScroll(true);
        };
        setLoading(false);
    }, []);
    
    function toggle() {
        localStorage.setItem("smooth-scroll", `${!smoothScroll}`)
        setSmoothScroll(!smoothScroll);
    }

    return (
        <>
        {!loading && (
            <button className="relative inline-block w-10 h-5 flex justify-center items-center">
                <input id="switch-component-1" type="checkbox" className="peer appearance-none w-full h-full bg-stone-400 rounded-full checked:bg-red-900 cursor-pointer transition-colors duration-300" onChange={toggle} checked={smoothScroll === true ? true : false}/>
                <label  htmlFor="switch-component-1" className="absolute top-0 left-0 w-5 h-full bg-white rounded-full border border-stone-400  transition-transform duration-300 peer-checked:translate-x-5 peer-checked:border-[#6e08a] cursor-pointer">
                </label>
            </button>
        )}
        </>
    )
};

export default ToggleButton;