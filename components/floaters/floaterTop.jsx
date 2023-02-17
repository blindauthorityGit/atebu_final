import React, { useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const FloaterTop = (props) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
        });
    }, []);
    return (
        <div
            className={`floater hidden sm:block absolute bottom-0 h-[12%] lg:h-[33%] w-[10rem] left-6 lg:left-12 lg:text-lg lg:font-semibold text-textBlack  right-12 ${
                props.center ? "items-center flex" : ""
            } ${props.klasse}`}
        >
            <div className="kugel z-10 absolute  opacity-0  top-0 left-[-7%] animate-scaleUp delay-1000 w-6 h-6 border-[6px] border-blackText rounded-full bg-primaryColor-300"></div>
            <div className="w-[1px] opacity-0 animate-expand delay-1000 border-blackText-200 border h-full"></div>
            <div className="w-[160px] absolute top-[69%] lg:top-[88%] opacity-0 animate-expand2  border-blackText-200 border-t-[1px] h-full"></div>
            <div className="w-[200px] absolute top-[47%] lg:top-[77%]  opacity-0 left-[15%]  animate-expand2   h-full">
                Find out more
            </div>
        </div>
    );
};

export default FloaterTop;
