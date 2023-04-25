import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//FUNCTIONS
// import urlFor from "../components/functions/urlFor";
import useBreakpoints from "../functions/useBreakPoints";

//SANITY
import { PortableText } from "@portabletext/react";

//COMPS
import { LineButton } from "../buttons";
import MapboxMap from "../map";
// import { Form1 } from "../forms";

//ICONS
import { FaPhone } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Contact = (props) => {
    const ref = useRef(null);
    const floaterRef = useRef(null);
    const imgRef = useRef(null);

    //STATES
    const [imgHeight, setImgHeight] = useState(null);
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
        console.log(imgRef.current.clientWidth);
        setImgHeight(imgRef.current.clientWidth);
    }, [imgRef.current]);

    return (
        <div ref={ref} className={`w-full   sm:px-0  lg:px-0 m-auto  grid grid-cols-12  ${props.colspan}`}>
            <motion.div
                style={{
                    height: isMobile
                        ? imgHeight / 1.5 + "px"
                        : isTablet
                        ? imgHeight / 1.6 + "px"
                        : isDesktop
                        ? imgHeight + "px"
                        : "auto",
                }}
                ref={imgRef}
                className={`left  sm:block col-span-12 lg:col-span-6 h-full relative`}
            >
                <MapboxMap></MapboxMap>
            </motion.div>
            <div className="right px-8 sm:px-16 lg:px-24 col-span-12 lg:col-span-6 flex flex-col justify-center">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 sm:col-span-6">
                        <h4 className="font-thin font-freight text-2xl sm:text-4xl text-darkText lg:text-5xl  mt-6 mb-4 sm:mt-8 sm:mb-8 lg:mb-6 lg:mb-6">
                            Kontakt
                        </h4>
                        <div className="font-freight font-bold leading-relaxed text-lg sm:text-xl text-darkText">
                            {" "}
                            {props.data.contact.name}
                        </div>
                        <div className="font-freight leading-relaxed text-lg text-darkText">
                            {" "}
                            {props.data.contact.street}
                        </div>
                        <div className="font-freight leading-relaxed text-lg text-darkText">
                            {" "}
                            {props.data.contact.city}
                        </div>
                        <div className="phoner grid grid-cols-12 mt-4 leading-relaxed">
                            <div className="col-span-2 text-primaryColor flex items-center text-2xl">
                                <FaPhone />{" "}
                            </div>
                            <div className="col-span-10 font-freight leading-relaxed text-lg sm:text-xl text-darkText">
                                {props.data.contact.phone}
                            </div>
                            <div className="col-span-2 text-primaryColor flex items-center text-2xl">
                                <HiOutlineMail></HiOutlineMail>
                            </div>
                            <div className="col-span-10 font-freight leading-relaxed text-lg sm:text-xl text-darkText">
                                {props.data.contact.email}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                        <h4 className="font-thin font-freight text-2xl sm:text-4xl text-darkText lg:text-5xl  mt-6 mb-4 sm:mt-8 sm:mb-8 lg:mb-6 lg:mb-6">
                            Öffnungszeiten
                        </h4>
                        <div className="flex space-x-6">
                            <div className="font-freight ">
                                <div className="text-primaryColor-500 mb-4 leading-relaxed text-lg sm:text-xl">
                                    Brunn an der Pitten
                                </div>
                                {/* <div className="font-freight leading-relaxed text-lg text-darkText">
                                    <PortableText value={props.data.oeffnungszeiten.brunn} />
                                </div>{" "} */}
                            </div>
                            <div className="font-freight ">
                                <div className="text-primaryColor-500 mb-4 leading-relaxed text-lg sm:text-xl">
                                    Wr. Neustadt Marienmarkt
                                </div>
                                {/* <div className="font-freight leading-relaxed text-lg text-darkText">
                                    <PortableText value={props.data.oeffnungszeiten.wrn} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 mt-8">
                        <h4
                            // data-aos="fade-left"
                            className="font-thin font-freight text-2xl sm:text-4xl text-darkText lg:text-4xl  mt-6 mb-4 sm:mt-8 sm:mb-8 lg:mb-6 lg:mb-6"
                        >
                            Schreiben Sie mir!
                        </h4>
                        {/* <Form1 contact /> */}
                    </div>
                </div>

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

export default Contact;
