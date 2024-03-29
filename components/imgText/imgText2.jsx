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

const TextImg2 = (props) => {
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
        console.log(props.images);
    }, []);

    return (
        <div
            ref={ref}
            className={`w-full container  sm:px-0 md:px-12 lg:px-0 m-auto lg:gap-24 grid grid-cols-12  ${props.colspan}`}
        >
            <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull>

            <div className="right px-8 sm:px-0 col-span-12 lg:col-span-5 flex flex-col justify-center ">
                <h2
                    data-aos="fade-left"
                    className="font-serif text-2xl sm:text-4xl text-blackText lg:text-6xl font-semibold mt-0 tracking-widest mb-4 lg:mb-12"
                >
                    LEISTUNGEN
                </h2>
                <div
                    data-aos="fade-up"
                    className="font-montserrat  mt-4 lg:mt-0 sm:font-semibold tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-sm sm:text-base lg:text-2xl text-textBlack-100 mb-4"
                >
                    {props.data[0].description}
                </div>

                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
                <Link href={"/leistungen"}>
                    <button className="bg-blackText font-semibold hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] uppercase rounded-md md:mt-16">
                        <span className="text-primaryColor-200"> Alle ansehen</span>
                    </button>
                </Link>
            </div>
            <motion.div
                style={{ opacity: scrollYProgress }}
                data-aos="fade-right"
                className={`left h-64 sm:h-auto sm:block mb-8 lg:mb-0 col-span-12 order-first lg:order-last lg:col-span-7 relative   lg:h-auto ${props.order}`}
            >
                <ImageGrid1 images={props.images}></ImageGrid1>
                <div
                    style={{ left: scrollYProgress }}
                    className="bgOverlay absolute bg-primaryColor opacity-20 w-full h-full md:left-[1.85rem] lg:left-[-2rem] top-[-2rem]"
                ></div>
            </motion.div>
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
