'use client';

import React, { useState } from 'react';

const Collapse = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    const [openItem, setItemOpen] = useState(false);
    
    const toggleItem = () => {
        setItemOpen(!openItem);
    };

    return (
        <>
            <button onClick={toggleItem} className='text-lg flex justify-end -translate-y-5'>
                {openItem ? '-' : '+'}
            </button>
            <div className={`collapse-item flex flex-col justify-start w-full h-fit ${openItem ? 'open': ''}`}>
              {children}
            </div>
        </>
    )

}

export default Collapse;