'use client';
import { motion, useIsPresent } from "framer-motion";
import Loader from "./LoadingScreen";
import { usePathname } from "next/navigation";
import path from "path";

export default function TransitionSlide() {
    const isPresent = useIsPresent();
    const pathname = usePathname();
    
    return (
        <>
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.5, ease: "circOut" } }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "circIn" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen"
            key={pathname}
        >
            <Loader />
        </motion.div>
        </>
    )
}