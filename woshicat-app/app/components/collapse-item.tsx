'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQ } from './textLists/data';

const Collapse = () => {
    const [openItem, setItemOpen] = useState(false);
    
    const toggleItem = () => {
        setItemOpen(!openItem);
    };

    return (
        <>
            <button onClick={toggleItem} className='text-md flex justify-start'>
                {openItem ? '- Collapse' : '+ Expand'}
            </button>
            <div className={`collapse-item flex flex-col justify-start w-full h-fit ${openItem ? 'open': ''}`}>
              {FAQ.map((question) => (
                <Link href={`#${question.link}`} key={question.link} className="hover:text-stone-400 transition duration-150">
                    {question.q}
                </Link>
              ))}
              
              
            </div>
        </>
    )

}

export default Collapse;