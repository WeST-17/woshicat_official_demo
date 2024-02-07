'use client';
import { AnimatePresence, motion } from "framer-motion";

const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                className="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                >
                <div>Loading...</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default LoadingScreen;
