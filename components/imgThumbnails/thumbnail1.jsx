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

const Thumbnail1 = (props) => {
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
                className={`col-span-12 sm:col-span-3 h-48  sm:h-64 relative mb-12 sm:mb-6 ${props.colspan}`}
            >
                <div className="date text-primaryColor-300 font-medium text-lg mb-2">{props.date}</div>
                <Link href={props.link}>
                    <a className="">
                        {" "}
                        <motion.div
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            className="h-full relative block overflow-hidden group"
                        >
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(props.image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="sm:grayscale thumbnail group-hover:grayscale-0 duration-500 ease-in-out transition-all group-hover:scale-110"
                            />

                            <motion.div
                                variants={boxMotion}
                                className="w-full hidden sm:block px-4 py-4 bottom-0 absolute bg-black text-primaryColor-200"
                            >
                                <h4 className="text-lg font-medium"> {props.motto}</h4>
                            </motion.div>
                            <motion.div className="w-full block sm:hidden px-4 py-4 bottom-0 absolute bg-blackText-600 text-primaryColor-200">
                                <h4 className="text-sm font-base"> {props.motto}</h4>
                            </motion.div>
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

export default Thumbnail1;
