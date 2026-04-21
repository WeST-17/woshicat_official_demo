'use client';

import React, { useEffect, useState } from "react";

interface ToggleProps {
    alwaysOn?: boolean;
    toggleFunction?: () => void;
    switch_id: string;
}

const ToggleButton:React.FC<ToggleProps> = ({ alwaysOn, toggleFunction, switch_id }) => {
    const [loading, setLoading] = useState<boolean | null>(null);
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (alwaysOn === true) { 
            setState(alwaysOn); 
        };
        setLoading(false);

        return () => {};
    }, []);

    return (
        <>
            {!loading && (
                <button className="relative inline-block w-10 h-5 flex justify-center items-center">
                    <input id={`switch-component-${switch_id}`} type="checkbox" className={`peer appearance-none w-full h-full rounded-full ${alwaysOn ? 'bg-stone-300 checked:bg-red-900/50 pointer-events-none' : 'bg-stone-500 checked:bg-red-900' } cursor-pointer transition-colors duration-300 `} onChange={toggleFunction} checked={state} />
                    <label  htmlFor={`switch-component-${switch_id}`} className="absolute top-0 left-0 w-5 h-full bg-white rounded-full border border-stone-400 transition-transform duration-300 peer-checked:translate-x-5 peer-checked:border-[#6e08a] cursor-pointer">
                    </label>
                </button>
            )}
            
        </>
    )
};

export default ToggleButton;