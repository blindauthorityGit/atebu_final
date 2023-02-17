import React, { useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const ContainerVH100 = (props) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
        });
    }, []);
    return (
        <div
            className={`floater hidden sm:block absolute bottom-12 lg:text-lg lg:font-semibold text-textBlack right-6 lg:right-12 ${
                props.center ? "items-center flex" : ""
            } ${props.klasse}`}
        >
            <div className="tel flex items-center">
                {" "}
                <FaPhone className="text-primaryColor-700"></FaPhone>{" "}
                <a className="pl-4" href="tel:+43 650 944 4150">
                    +43 650 944 4150
                </a>
            </div>
            <div className="email flex items-center">
                {" "}
                <HiOutlineMail className="text-primaryColor-700"></HiOutlineMail>{" "}
                <a className="pl-4" href="">
                    {" "}
                    office@atelierbuchner.at
                </a>
            </div>
            {props.children}
        </div>
    );
};

export default ContainerVH100;
