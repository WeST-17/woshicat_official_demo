// 'use client';

// import React, { useEffect, useState } from "react";

// export default function getScrollPosition() {
//     const [scrollPos, setScrollPos] = useState<number>(0);
//     const HandleScroll = () => {
//         const height = 
//             document.documentElement.scrollHeight - 
//             document.documentElement.clientHeight;
//         const windowScroll = document.documentElement.scrollTop;
//         const scrolled = (windowScroll / height) * 100;
//         setScrollPos(scrolled);
//     }

//     useEffect(() => {
//         window.addEventListener("scroll", HandleScroll, { passive: true });
//         return () => {
//             window.removeEventListener("scroll", HandleScroll);
//         };
//     }, []);

//     return scrollPos;
// }