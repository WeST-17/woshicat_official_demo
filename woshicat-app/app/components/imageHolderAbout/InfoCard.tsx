'use client';

import React from "react";

interface CardProps {
    description: string | string[],
    classAdd: string
}

const Card: React.FC<CardProps> = ({ description, classAdd }) => {
    return (
        <>
            <section className={`h-1/2 lg:h-[500px] lg:text-xl p-3 flex justify-center items-center text-black bg-white/90 ${classAdd}`}>
                {description[0]}
                <br/>
                <br/>
                {description[1]}
            </section>
        </>
    )
}

export default Card;