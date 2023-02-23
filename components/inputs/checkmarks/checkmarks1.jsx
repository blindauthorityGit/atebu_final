import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";

function CheckboxContainer({ onCheckboxClick }) {
    const [checked, setChecked] = useState("original");

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
                        className={`w-5 md:w-8 h-5 md:h-8 border-2 border-solid border-blackText rounded-full flex items-center justify-center ${
                            checked === "original" ? "bg-blackText" : ""
                        }`}
                        variants={variants}
                        initial={checked === "original" ? "checked" : "unchecked"}
                        animate={checked === "original" ? "checked" : "unchecked"}
                    >
                        {checked === "original" && <MdCheck className="text-primaryColor-200 text-base md:text-2xl" />}
                    </motion.div>
                    <span className="ml-2 text-sm md:text-lg text-blackText">ORIGINAL</span>
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
                        className={`w-5 md:w-8 h-5 md:h-8 border-2 border-solid border-blackText rounded-full flex items-center justify-center ${
                            checked === "print" ? "bg-blackText" : ""
                        }`}
                        variants={variants}
                        initial={checked === "print" ? "checked" : "unchecked"}
                        animate={checked === "print" ? "checked" : "unchecked"}
                    >
                        {checked === "print" && <MdCheck className="text-primaryColor-200 text-base md:text-2xl" />}
                    </motion.div>
                    <span className="ml-2 text-sm md:text-lg text-blackText">PRINT</span>
                </motion.label>
            </div>
        </div>
    );
}

export default CheckboxContainer;
