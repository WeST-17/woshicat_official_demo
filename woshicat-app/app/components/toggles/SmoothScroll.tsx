'use client';

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { useToggle } from "./toggleContext";

interface Children {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<Children> = ({ children }) => {
    const [lenisRef, setLenisRef] = useState<any>(null);
    const [rafState, setRafState] = useState<any>(null);
    const { smoothScroll } = useToggle();
    
    useEffect(() => {
        const smoothScrolling = () => {
            const scroller = new Lenis({
                easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)),
                duration: 0.5
            });
            let rf;

            function raf(time: number) {
                scroller.raf(time);
                requestAnimationFrame(raf);
            }
            rf = requestAnimationFrame(raf);
            setRafState(rf);
            setLenisRef(scroller);

            return () => {
                if (lenisRef) {
                    cancelAnimationFrame(rafState);
                    lenisRef.destroy();
                }
            }
        };
        if (smoothScroll) {
            smoothScrolling();
        } else {
            if (lenisRef) {
                cancelAnimationFrame(rafState);
                lenisRef.destroy();
            }
        }
    }, [smoothScroll]);
    

    return (
        <>
        {children}
        </>
    )
};

export default SmoothScroll;