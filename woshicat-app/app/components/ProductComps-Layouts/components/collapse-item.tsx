'use client';

import React, { useState } from 'react';

interface CollapseProps {
    children: React.ReactNode;
    title?: string;
    classProp?: string;
    divider?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({ children, title, classProp, divider = true}) => {
    const [openItem, setItemOpen] = useState(false);
    
    const toggleItem = () => {
        setItemOpen(!openItem);
    };

    return (
        <>
            <span className={`flex w-full h-[0.5px] rounded-full ${divider ? "" : "hidden"}`} /> 
            <div className={`px-2 py-3 relative w-full h-fit flex flex-col justify-start items-start ${classProp}`}>
                <button 
                    onClick={toggleItem} 
                    className={`relative w-full h-full flex justify-start transition transition-all duration-350 ${!openItem ? 'font-medium' : 'font-bold'}`}
                >
                    <p className='w-4/5 h-fit flex justify-start text-start'>{title}</p> 
                    <div className='w-1/5 flex justify-end items-center'>{openItem ? "-" : "+"}</div>
                </button>
                <div className={`collapse-item flex flex-col justify-start items-center w-full h-fit ${openItem ? 'open' : ''}`} 
                    onClick={() => {
                        setTimeout(toggleItem, 500);
                    }}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Collapse;
