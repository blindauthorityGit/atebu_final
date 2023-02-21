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

const KurseTxtImg = (props) => {
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
        <div ref={ref} className={`col-span-12 mb-8  ${props.colspan}`}>
            {" "}
            <motion.div
                style={{ opacity: scrollYProgress }}
                data-aos="fade-right"
                className={`left h-64 sm:h-auto sm:block mb-8 lg:mb-0 col-span-12 order-first lg:order-last lg:col-span-7 relative   lg:h-auto ${props.order}`}
            >
                <Image
                    // {...ImagePropsGallery(i)}
                    src={props.image}
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
            <div className="right px-8 sm:px-0 col-span-12 lg:col-span-5 flex flex-col justify-center ">
                <div
                    data-aos="fade-up"
                    className="font-montserrat text-primaryColor-200 mt-4 lg:mt-0 sm:font-semibold tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-sm sm:text-base lg:text-2xl text-textBlack-100 mb-4"
                >
                    <div className="datum bg-primaryColor-300 py-2 text-center font-bold text-primaryColor-900 absolute w-full top-[-4rem]">
                        {props.data.datum}
                    </div>

                    <h2 className="font-bold uppercase text-xl mb-2">{props.data.akademieTitel}</h2>
                    <hr className="border-primaryColor " />
                    <h4 className="mt-2 font-bold">{props.data.thema}</h4>
                    <h4>{props.data.headline}</h4>
                    <div className="ablaufTop flex mt-4 mb-2">
                        <div className="left text-xs font-bold w-1/4">Ablauf:</div>
                        <div className="right border-b border-primaryColor w-full"></div>
                    </div>
                    <div className="ablaufTop flex text-xs  mb-2">
                        <div className="left text-xs font-bold w-1/4">1.Tag</div>
                        <div className="right  w-full">Lorem ipsukm dolor sit</div>
                    </div>
                    <div className="ablaufTop flex text-xs  mb-2">
                        <div className="left text-xs font-bold w-1/4">2.Tag</div>
                        <div className="right  w-full">Lorem ipsukm dolor sit</div>
                    </div>
                    <div className="ablaufTop flex text-xs  mb-2">
                        <div className="left text-xs font-bold w-1/4">3-4.Tag</div>
                        <div className="right  w-full">Lorem ipsukm dolor sit</div>
                    </div>
                    <div className="ablaufTop flex text-xs  mb-2">
                        <div className="left text-xs font-bold w-1/4">5.Tag</div>
                        <div className="right  w-full">Lorem ipsukm dolor sit</div>
                    </div>
                    <hr className="border-primaryColor" />
                    <div className="kosten mt-4">
                        <div className="top text-primaryColor">KOSTEN</div>
                        <div className="sum font-bold text-xl">{props.data.price}*</div>
                        <div className="text-xs text-primaryColor-400">Das Kleingedruckte bububububu</div>
                    </div>
                </div>

                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
                <Link href={config.buttonLink}>
                    <button className="hover-underline-animation border font-bold border-primaryColor-100 flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-16">
                        <span className="text-primaryColor-200"> MEHR</span>
                    </button>
                </Link>
                <Link href={config.buttonLink}>
                    <button className="hover-underline-animation bg-primaryColor-500 font-bold flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-16">
                        <span className="text-primaryColor-200"> Buchen</span>
                    </button>
                </Link>
            </div>
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

export default KurseTxtImg;
