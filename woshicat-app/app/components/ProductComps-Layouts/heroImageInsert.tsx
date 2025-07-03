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
            {header && (
                <div className="absolute left-0 text-4xl md:text-7xl text-white w-screen h-full text-start flex items-center z-[999]">
                    <h1 className="bg-black/30 p-4 w-full h-full flex items-center">{header}</h1>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill={true}
                className={`${additional} object-fit w-full h-full`}
            />
        </>
    )
}

export default CoverHeader;