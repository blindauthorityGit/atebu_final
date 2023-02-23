import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Popup1 = ({ children, isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onClose();
            setIsAnimating(false);
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 max-w-md mx-auto relative"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
                            onClick={handleClose}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Popup1;
