import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { config } from "./config";
import Image from "next/image";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//components
import { FloaterBlackFull } from "../floaters";
import { GhostButton } from "../buttons";

const TextImg1 = (props) => {
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
            className={`w-full container  sm:px-0 md:px-24 lg:px-0 m-auto lg:gap-24 grid grid-cols-12  ${props.colspan}`}
        >
            {/* <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull> */}

            <div className="right px-8 sm:px-0 col-span-12 lg:col-span-12 flex flex-col justify-center ">
                {/* <div
                    data-aos="fade-up"
                    className="font-montserrat  mt-4 lg:mt-0 font-base tracking-wide leading-loose lg:leading-relaxed text-xs lg:text-sm text-primaryColor-300 mb-4"
                >
                    {config.subTitle}
                </div> */}
                <h2
                    data-aos="fade-left"
                    className="font-serif text-4xl sm:text-4xl text-darkText lg:text-6xl font-thin mt-8 tracking-wider mb-2 lg:mb-12"
                >
                    {config.title}
                </h2>
                <div
                    data-aos="fade-right"
                    className="font-montserrat lg:w-2/4  mt-4 lg:mt-0 lg:mb-12 tracking-wide leading-relaxed sm:leading-relaxed lg:leading-relaxed text-sm sm:text-sm lg:text-regular text-darkText mb-4"
                >
                    {config.topTitle}
                </div>
                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
                <div className="w-full flex justify-center">
                    <GhostButton link={props.link}>mehr</GhostButton>
                </div>
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

export default TextImg1;
