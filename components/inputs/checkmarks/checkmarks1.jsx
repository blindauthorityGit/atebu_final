import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";

function CheckboxContainer({ onCheckboxClick }) {
    const [checked, setChecked] = useState("");

    const handleCheckboxChange = (event) => {
        const { value } = event.target;

        if (value === checked) {
            setChecked("");
        } else {
            setChecked(value);
        }

        onCheckboxClick(event);
    };

    const variants = {
        checked: {
            scale: 1.2,
            transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 500,
                damping: 20,
            },
        },
        unchecked: {
            scale: 1,
        },
    };

    return (
        <div className="flex space-x-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="original"
                    name="original"
                    value="original"
                    checked={checked === "original"}
                    className="hidden"
                    onChange={handleCheckboxChange}
                />
                <motion.label
                    htmlFor="original"
                    className="flex items-center cursor-pointer"
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                >
                    <motion.div
                        className={`w-5 h-5 border-2 border-solid border-gray-800 rounded-full flex items-center justify-center ${
                            checked === "original" ? "bg-gray-800" : ""
                        }`}
                        variants={variants}
                        initial={checked === "original" ? "checked" : "unchecked"}
                        animate={checked === "original" ? "checked" : "unchecked"}
                    >
                        {checked === "original" && <MdCheck className="text-yellow-400" size="14px" />}
                    </motion.div>
                    <span className="ml-2 text-sm text-blackText">ORIGINAL</span>
                </motion.label>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="print"
                    name="print"
                    value="print"
                    checked={checked === "print"}
                    className="hidden"
                    onChange={handleCheckboxChange}
                />
                <motion.label
                    htmlFor="print"
                    className="flex items-center cursor-pointer"
                    variants={variants}
                    whileHover={{ scale: 1.1 }}
                >
                    <motion.div
                        className={`w-5 h-5 border-2 border-solid border-gray-800 rounded-full flex items-center justify-center ${
                            checked === "print" ? "bg-gray-800" : ""
                        }`}
                        variants={variants}
                        initial={checked === "print" ? "checked" : "unchecked"}
                        animate={checked === "print" ? "checked" : "unchecked"}
                    >
                        {checked === "print" && <MdCheck className="text-yellow-400" size="14px" />}
                    </motion.div>
                    <span className="ml-2 text-sm text-blackText">PRINT</span>
                </motion.label>
            </div>
        </div>
    );
}

export default CheckboxContainer;
