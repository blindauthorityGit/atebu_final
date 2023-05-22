import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { config } from "./config";
import { BiChevronDown } from "react-icons/bi";
import Image from "next/image";
import parse from "html-react-parser";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//components
import { FloaterBlackFull } from "../floaters";
import { ImageGrid1 } from "../imageGrids";
import { GhostButton } from "../buttons";
import { MobileSwiper1 } from "../swiper";
import { BigChoiceBox } from "../infoBoxes";

//FUNCTIONS
import useBreakpoints from "../functions/useBreakPoints";

const TextImg2 = (props) => {
    const ref = useRef(null);
    const floaterRef = useRef(null);

    // const { scrollYProgress } = useScroll();
    const { scrollY } = useScroll();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    // BREAKPOINTS
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
        console.log(props.data[0].leistungen);
    }, []);

    return (
        <div
            ref={ref}
            className={`w-full container col-span-12 sm:px-0 md:px-12 lg:px-0 m-auto lg:gap-0 grid grid-cols-12  ${props.colspan}`}
        >
            <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull>

            <div className="right overflow-hidden px-8 sm:px-0 col-span-12 lg:col-span-16 flex flex-col justify-center ">
                <h2
                    data-aos="fade-left"
                    className="font-serif text-4xl sm:text-4xl text-darkText lg:text-6xl font-thin mt-8 tracking-wider mb-2 lg:mb-12"
                >
                    LEISTUNGEN
                </h2>
                <div
                    data-aos="fade-up"
                    className="font-montserrat lg:w-2/4  mt-4 lg:mt-0 lg:mb-12 tracking-wide leading-relaxed sm:leading-relaxed lg:leading-relaxed text-sm sm:text-sm lg:text-regular text-darkText mb-4"
                >
                    {props.data[0].description}
                </div>
            </div>
            {isDesktop ? (
                <BigChoiceBox data={props.data[0]} />
            ) : (
                <MobileSwiper1 data={props.data[0].leistungen}></MobileSwiper1>
            )}
            <div className="px-8 w-full col-span-12">
                <GhostButton link={"/leistungen"}>mehr</GhostButton>
            </div>
            {/* <motion.div
                style={{ opacity: scrollYProgress }}
                data-aos="fade-right"
                className={`left h-64 sm:h-auto sm:block mb-8 lg:mb-0 col-span-12 order-first lg:order-last lg:col-span-7 relative   lg:h-auto ${props.order}`}
            >
                <ImageGrid1 images={props.images}></ImageGrid1>
                <div
                    style={{ left: scrollYProgress }}
                    className="bgOverlay absolute bg-primaryColor opacity-20 w-full h-full md:left-[1.85rem] lg:left-[-2rem] top-[-2rem]"
                ></div>
            </motion.div> */}
            <style jsx>{`
                .hover-underline-animation span {
                    display: inline-block;
                    position: relative;
                  
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

export default TextImg2;
