import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const Thumbnail2 = (props) => {
    const boxMotion = {
        rest: {
            opacity: 0,
            display: "none",
            ease: "easeOut",
            y: 100,
            duration: 0.2,
            type: "spring",
            transition: {
                duration: 0.8,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            opacity: 1,
            display: "block",
            y: 0,
            transition: {
                duration: 0.8,
                type: "spring",
                ease: "easeIn",
            },
        },
        end: {
            opacity: 0,
            y: 100,
            display: "block",
            transition: {
                duration: 0.8,
                type: "spring",
                ease: "easeIn",
            },
        },
    };

    return (
        <>
            <div
                data-aos={props.dataAos}
                className={`col-span-12 sm:col-span-4 h-36  sm:h-64 lg:h-96 relative mb-4 sm:mb-6 ${props.colspan}`}
            >
                <Link href={props.link}>
                    <a className="">
                        {" "}
                        <motion.div
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            className="h-full relative block overflow-hidden group "
                        >
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(props.image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className=" thumbnail group-hover:grayscale-0 duration-500 ease-in-out transition-all group-hover:scale-110"
                            />

                            <motion.div
                                variants={boxMotion}
                                className="w-full sm:block px-4 py-4 bottom-0 absolute  text-primaryColor-200"
                            >
                                {/* <h4 className="text-lg font-medium"> {props.motto}</h4> */}
                            </motion.div>

                            <div className="w-full  px-4 py-4 flex flex-col justify-center transition-all duration-500 ease-in-out lg:justify-end group-hover:lg:justify-center items-center h-24 group-hover:lg:h-full  bottom-0 absolute z-10 text-primaryColor-50">
                                <div className="date text-primaryColor-50 font-medium text-base sm:text-lg mb-2">
                                    {props.date}
                                </div>
                                <h4 className="text-xl font-bold tracking-wider"> {props.titel}</h4>
                                <hr className="border hidden group-hover:block border-primaryColor-500 w-3/4 my-3 " />
                                <div className="date hidden group-hover:block text-primaryColor-50 font-medium text-base sm:text-lg mb-2">
                                    {props.motto}
                                </div>
                            </div>
                            {/* 
                            <motion.div className="w-full   px-4 py-4 flex flex-col justify-center transition-all duration-500 ease-in-out lg:justify-end group-hover:lg:justify-center items-center h-full absolute z-10 text-primaryColor-50">
                                <div className="date text-primaryColor-50 font-medium text-base sm:text-lg mb-2">
                                    {props.date}
                                </div>

                                <h4 className="text-xl font-bold tracking-wider"> {props.titel}</h4>
                            </motion.div> */}
                            <div className="absolute bg-darkGrey  w-full h-full duration-500 ease-in-out transition-all lg:h-24 lg:bottom-0 group-hover:lg:h-full opacity-50"></div>
                        </motion.div>{" "}
                    </a>
                </Link>
                {/* <div className="under">
                    <h5>Hallo</h5>
                    <h4>Bubu</h4>
                </div> */}
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
            </div>{" "}
        </>
    );
};

export default Thumbnail2;
