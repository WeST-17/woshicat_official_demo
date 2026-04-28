import React from "react";
import Image from "next/image";

interface CoverHeaderProp {
    src: string,
    alt: string,
    header?: string,
    additional?: string,
}

/* May want to add width and height props */
const CoverHeader: React.FC<CoverHeaderProp> = ({ src, alt, header, additional }) => {
    return (
        <>
            <div className="relative w-full h-[57vh] flex justify-center items-center overflow-hidden rounded-b-[8px]">
            {header && (
                <div className="absolute top-0 left-0 text-3xl lg:text-5xl text-white w-full h-full text-start flex items-center z-999">
                    <h1 className="bg-black/35 ps-4 w-full h-full flex items-center">{header}</h1>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill={true}
                className={`object-cover ${additional}`}
            />
            </div>
        </>
    )
}

export default CoverHeader;