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
            fill={true}
            className="z-[2] object-cover"
        />
    )
}

export default ImgHolder;