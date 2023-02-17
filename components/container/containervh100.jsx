import React from "react";
import HugeLogo from "../../assets/hugeLogo.svg";

const ContainerVH100 = (props) => {
    return (
        <div
            className={`containervh100 lg:min-h-screen relative overflow-hidden ${
                props.center ? "items-center flex" : ""
            }  ${props.hFull ? "h-full" : ""} ${props.first ? "py-16 sm:py-24" : "py-8 sm:py-24"}  w-full ${
                props.klasse
            }`}
        >
            {props.showBG ? (
                <div className="absolute left-[-30%] top-0 h-full opacity-[0.02]">
                    <img src={HugeLogo.src} alt="" />
                </div>
            ) : null}
            {/* Background Image */}
            {props.children}
        </div>
    );
};

export default ContainerVH100;
