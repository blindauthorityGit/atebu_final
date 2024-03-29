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
            className={`w-full container  sm:px-0 md:px-12 lg:px-0 m-auto lg:gap-24 grid grid-cols-12  ${props.colspan}`}
        >
            <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull>
            <motion.div
                style={{ opacity: scrollYProgress }}
                data-aos="fade-right"
                className={`left hidden sm:block col-span-12 lg:col-span-5 relative h-64 lg:h-auto ${props.order}`}
            >
                <Image
                    // {...ImagePropsGallery(i)}
                    src={config.image}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    alt="hero"
                    className="z-10"
                />
                <div
                    style={{ left: scrollYProgress }}
                    className="bgOverlay absolute bg-primaryColor opacity-20 w-full h-full md:left-[1.85rem] lg:left-[-2rem] top-[-2rem]"
                ></div>
            </motion.div>
            <div className="right px-8 sm:px-0 col-span-12 lg:col-span-7 flex flex-col justify-center ">
                <div
                    data-aos="fade-up"
                    className="font-montserrat  mt-4 lg:mt-0 sm:font-semibold tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-xs sm:text-base lg:text-2xl text-primaryColor-100 mb-4"
                >
                    {config.topTitle}
                </div>
                {/* <div
                    data-aos="fade-up"
                    className="font-montserrat  mt-4 lg:mt-0 font-base tracking-wide leading-loose lg:leading-relaxed text-xs lg:text-sm text-primaryColor-300 mb-4"
                >
                    {config.subTitle}
                </div> */}
                <h2
                    data-aos="fade-left"
                    className="font-serif text-2xl sm:text-4xl text-primaryColor lg:text-6xl font-semibold mt-8 tracking-widest mb-8 lg:mb-12"
                >
                    {config.title}
                </h2>
                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
                <Link href={props.link}>
                    <button className="bg-primaryColor font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-16">
                        <span className=""> {config.buttonText}</span>
                    </button>
                </Link>
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
