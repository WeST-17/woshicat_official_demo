'use client';
import React, { useEffect } from "react";
import { useCart } from "./cartContext";

const ProgressBar: React.FC = () => {
    const { progress, setProgress, cartTotal, cartOpen } = useCart(); 
    
    useEffect(() => {
        
        const progressBar = async () => {
            let progress = Number(cartTotal) / 75 * 100;
            if (progress > 100) {
                setProgress(100);
                return
            }
            setProgress(progress);   
        };

        progressBar();
    }, [cartTotal, cartOpen])
    
    return (
        <>
        <div 
            className={`h-full bg-[#CD000A] rounded-full transition-all duration-300 ease-in-out`} 
            style={{ width: `${progress}%`}}
        />
        </>
    )
}

export default ProgressBar;