'use client';
import { motion, useIsPresent } from "framer-motion";

export default function TransitionSlide() {
    const isPresent = useIsPresent();
    return (
        <>
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity:0, transition: { duration: 1, ease: "circOut" } }}
            exit={{ opacity: 1, transition: { duration: 1, ease: "circIn" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen pointer-events-none"
        />
        </>
    )
}