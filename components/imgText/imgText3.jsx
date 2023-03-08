import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { config } from "./config";
import { BiChevronDown } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//components
import { FloaterBlackFull } from "../floaters";

const TextImg3 = (props) => {
    const ref = useRef(null);
    const floaterRef = useRef(null);

    // const { scrollYProgress } = useScroll();
    const { scrollY } = useScroll();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
        console.log(floaterRef.current);
    }, []);

    return (
        <div
            ref={ref}
            className={`w-full container  sm:px-0 md:px-12 lg:px-0 m-auto lg:gap-24 grid grid-cols-12  ${props.colspan}`}
        >
            <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull>

            <div className="absolute bottom-16 lg:pt-0 px-8 sm:px-0 lg:pl-24  col-span-12 lg:col-span-8 flex flex-col justify-center ">
                {/* <div
                    data-aos="fade-up"
                    className="font-montserrat italic  mt-4 lg:mt-0 font-regular tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-base lg:text-2xl text-primaryColor-100 mb-4"
                >
                    "{config.topTitle}"
                </div> */}
                {/* <div
                    data-aos="fade-up"
                    className="font-montserrat  mt-4 lg:mt-0 font-base tracking-wide leading-loose lg:leading-relaxed text-xs lg:text-sm text-primaryColor-300 mb-4"
                >
                    {config.subTitle}
                </div> */}
                <h2
                    data-aos="fade-left"
                    className="font-montserrat text-2xl z-10 sm:text-4xl text-primaryColor-300 lg:text-6xl font-bold mt-8 tracking-widest mb-8 lg:mb-12"
                >
                    CHRISTINE BUCHNER
                </h2>
                <div className="sm flex text-primaryColor-500 text-3xl lg:w-[70%] z-20 justify-end">
                    <Link href="#">
                        <a className="mr-8">
                            <FaFacebook></FaFacebook>
                        </a>
                    </Link>
                    <Link href="#">
                        <a className="">
                            <FaInstagram></FaInstagram>
                        </a>
                    </Link>
                </div>
                <div className="kontakt flex mt-6 font-semibold  md:mt-12 text-primaryColor-400 z-20 md:text-3xl lg:w-[70%] items-center justify-end">
                    <div className="left">+43 650 944 4150</div>
                    <div className="left ml-4">
                        <FaPhone></FaPhone>
                    </div>
                </div>
                <div className="kontakt flex font-semibold text-primaryColor-400 z-20 mt-4 md:text-3xl lg:w-[70%] items-center justify-end">
                    <div className="left">christine@atelierbuchner.at</div>
                    <div className="left ml-4">
                        <FaEnvelope></FaEnvelope>
                    </div>
                </div>
                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
            </div>
            <style jsx>{`
                .hover-underline-animation span {
                    display: inline-block;
                    position: relative;
                    color: #000;
                }

                .hover-underline-animation span::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: black;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                }

                .hover-underline-animation:hover span::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
          
            `}</style>
        </div>
    );
};

export default TextImg3;
