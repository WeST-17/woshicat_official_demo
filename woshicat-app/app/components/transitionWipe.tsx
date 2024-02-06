'use client';
import { motion, useIsPresent } from "framer-motion";

export default function TransitionSlide() {
    const isPresent = useIsPresent();
    return (
        <>
        <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0, transition: { duration: 1, ease: "easeInOut" } }}
            exit={{ scaleX: 1, transition: { duration: 1, ease: "easeInOut" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen"
        />
        </>
    )
}