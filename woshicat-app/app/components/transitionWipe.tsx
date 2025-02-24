'use client';
import { motion, useIsPresent } from "framer-motion";
import Loader from "./LoadingScreen";

export default function TransitionSlide() {
    const isPresent = useIsPresent();
    return (
        <>
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, transition: { duration: 0.5, ease: "circOut" } }}
            exit={{ opacity: 0, transition: { duration: 0, ease: "circIn" } }}
            style={{ originX: isPresent ? 0 : 1 }}
            className="privacy-screen pointer-events-none"
        >
            <Loader />
        </motion.div>
        </>
    )
}