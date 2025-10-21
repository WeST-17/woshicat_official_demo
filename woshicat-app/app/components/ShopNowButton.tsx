'use client'
import React from "react";

interface ShopButtonProps {
    title?: string,
    classAdd?: string
}


const ShopNowButton:React.FC<ShopButtonProps> = ({ title, classAdd }) => {
    return (
        <button className="shop-item-button h-fit w-fit flex justify-center items-center rounded-md mt-2 z-1">
            <p className={`${classAdd ? classAdd : 'text-lg p-1 border-2 border-white rounded-xs w-48 font-normal'}`}>{title ? `${title}` : 'Shop Now'}</p>
        </button>
    )
}

export default ShopNowButton;