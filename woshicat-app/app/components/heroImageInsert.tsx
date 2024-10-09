import React from "react";
import Image from "next/image";

interface CoverHeaderProp {
    src: string,
    alt: string,
    header: string,
    additional?: string,
}

/* May want to add width and height props */
const CoverHeader: React.FC<CoverHeaderProp> = ({ src, alt, header, additional }) => {
    return (
        <>
            <div className="bg-black/25 absolute left-0 text-4xl md:text-7xl text-white w-full h-full text-center flex items-center z-[999]">
                <h1 className="p-4">{header}</h1>
            </div>
            <Image
                src={src}
                alt={alt}
                width={1920}
                height={1}
                className={`object-cover inset-0 w-full ${additional}`}
            />
        </>
    )
}

export default CoverHeader;