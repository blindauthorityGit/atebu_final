import React, { forwardRef } from "react";

import { MdOutlineClose } from "react-icons/md";

const ModalMobile = ({ ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="fixed slide-in-bottom overflow-y-auto max-h-[100%] w-[100%] lg:w-[80%] min-h-[80%] bg-white p-8 lg:p-24 z-50 bottom-0"
        >
            <div
                className="closer absolute top-6 right-6 text-4xl cursor-pointer transition hover:opacity-50 z-50"
                onClick={props.onClick}
            >
                <MdOutlineClose></MdOutlineClose>
            </div>
            {props.children}
        </div>
    );
};

export default forwardRef(ModalMobile);
