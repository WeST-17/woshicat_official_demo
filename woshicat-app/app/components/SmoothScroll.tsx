'use client';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ 
    children, 
}) => {
    const [isLoading, setIsLoading] = useState(true);

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current != null) {
                setContentHeight(contentRef.current.scrollHeight);
            }
            setWindowHeight(window.innerHeight);
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (contentRef.current) {
                resizeObserver.unobserve(contentRef.current);
            }
        };

    }, [contentRef]);

    // Intercept normal scroll behavior
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.1,
        stiffness: 100,
        damping: 20,
        restDelta: 0.001,
    });

    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (latest === 0) {
            setIsLoading(false);
        }
    })

    const yPos = useTransform(smoothProgress, (value) => {
        return value * -(contentHeight - windowHeight);
    });

    return (
        <>
            <div style={{ height: contentHeight }}/>
            <motion.div 
                className='w-screen fixed top-0 transition-opacity duration-200 ease-in-out' 
                ref={contentRef} 
                style={{ y: isLoading ? 0 : yPos, opacity: isLoading ? 0 : 1 }}
            >
                {children}
            </motion.div>
        </>
    )
}

export default SmoothScroll;