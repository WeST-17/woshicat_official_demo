'use client';

import { useEffect, useState } from "react";

export default function getScrollPosition() {
    const [scrollPos, setScrollPos] = useState<number>(0);
    const handleScroll = () => {
        const height = 
            document.documentElement.scrollHeight - 
            document.documentElement.clientHeight;
        const windowScroll = document.documentElement.scrollTop;
        const scrolled = (windowScroll / height) * 100;
        setScrollPos(scrolled);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollPos;
}