import React, { useEffect, forwardRef } from "react";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const FloaterBlackFull = (props, ref) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
        });
    }, []);
    return (
        <div
            className={`floater hidden sm:block absolute bottom-0 h-[100%] lg:h-[100%] w-[10rem] left-6 opacity-40 lg:left-12 lg:text-lg lg:font-semibold text-textBlack  right-12 ${
                props.center ? "items-center flex" : ""
            } ${props.klasse}`}
        >
            <div
                ref={ref}
                style={{ ...props.style, opacity: props.opacity }}
                className="w-[1px] opacity-0 animate-expand delay-1000 border-blackText-50 border h-full"
            ></div>
            <div className="w-[160px] absolute top-[0%] lg:top-[0%] opacity-0 animate-expand2  border-blackText-50 border-t-[1px] h-full"></div>
            <div className="w-[200px] absolute top-[0%] lg:top-[0%]  opacity-0 left-[15%]  animate-expand2   h-full">
                Find out more
            </div>
        </div>
    );
};

export default forwardRef(FloaterBlackFull);
