import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const InfoBox = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleInfoBox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="col-span-12 border">
            <div
                className="flex justify-between items-center px-4 py-2 bg-blackText text-primaryColor-100"
                onClick={toggleInfoBox}
            >
                <h3>Printing Process</h3>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {isOpen && (
                <div>
                    <p>Here's some information about the printing process...</p>
                    <p>More information can be added here...</p>
                </div>
            )}
        </div>
    );
};

export default InfoBox;
