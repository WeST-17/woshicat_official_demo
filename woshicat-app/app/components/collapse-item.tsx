'use client';

import React, { useState } from 'react';

interface CollapseProps {
    children: React.ReactNode;
    plus?: string;
    minus?: string;
    classProp?: string;
}

const Collapse: React.FC<CollapseProps> = ({ children, plus, minus, classProp}) => {
    const [openItem, setItemOpen] = useState(false);
    
    const toggleItem = () => {
        setItemOpen(!openItem);
    };

    return (
        <>
            <button 
                onClick={toggleItem} 
                className={`text-md flex ${classProp}`}
            >
                {openItem ? minus || ' - ' : plus || ' + '}
            </button>
            <div className={`collapse-item flex flex-col justify-center w-full h-fit ${openItem ? 'open' : ''}`}>
                {children}
            </div>
        </>
    );
};

export default Collapse;
