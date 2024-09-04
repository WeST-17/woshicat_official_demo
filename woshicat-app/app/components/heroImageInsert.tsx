import React from "react";
import Image from "next/image";

interface imgHolderProp {
    imgSrc: string,
    altText: string,
}

/* May want to add width and height props */
const ImgHolder: React.FC<imgHolderProp> = ({ imgSrc, altText }) => {
    return (
        <Image
            src={imgSrc}
            alt={altText}
            width={300}
            height={300}
            className="z-[2]"
        />
    )
}

export default ImgHolder;