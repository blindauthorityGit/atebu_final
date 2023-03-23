export { default as ElementGrid1 } from "./elementGrid1";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// animations
import { motion } from "framer-motion";

import { PortableText } from "@portabletext/react";

//functions
const BlogTextShorter = dynamic(() => import("../functions/blogTextShorter"), {
    ssr: false,
});

// import BlogTextShorter from "../functions/blogTextShorter";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const BlogGrid1 = (props) => {
    const [isLoaded, setisLoaded] = useState(false);

    const [numEntriesDisplayed, setNumEntriesDisplayed] = useState(3);

    const displayedEntries = props.data.slice(0, numEntriesDisplayed);

    const handleShowMore = () => {
        setNumEntriesDisplayed(numEntriesDisplayed + 3);
    };

    useEffect(() => {
        setisLoaded(true);
    }, []);

    const textMotion = {
        rest: {
            x: -50,
            opacity: 0,

            transition: {
                duration: 0.85,
                type: "tween",
                ease: "easeIn",
            },
        },
        hover: {
            // color: "blue",
            x: 0,
            opacity: 1,

            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
    };

    return (
        <div
            className={`${
                isLoaded ? "opacity-100" : "opacity-0"
            } container px-8 sm:px-12 lg:px-24 m-auto relative sm:mt-12 sm:mb-6 ${props.colspan}`}
        >
            <div className="grid grid-cols-12 sm:gap-12 ">
                {displayedEntries.map((e, i) => {
                    return (
                        <>
                            <div
                                key={`gridBlogKey${i}`}
                                className="col-span-12 h-48  sm:h-auto md:col-span-6 relative mb-4"
                            >
                                <Link href={`/blog/${e.slug.current}`}>
                                    <div className="cursor-pointer relative h-full overflow-hidden">
                                        <Image
                                            src={urlFor(e.featuredImage).url()}
                                            layout="fill"
                                            loading="lazy"
                                            objectFit="cover"
                                            alt="hero"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="col-span-12 md:col-span-6 relative mb-8 ">
                                <p className="text-sm"> {e.date.split("T")[0].split("-").reverse().join(".")}</p>
                                <h2 className="font-oswald font-semibold text-2xl mt-2 mb-4">{e.title}</h2>
                                <div className="text-xs sm:text-sm font-sans leading-relaxed">
                                    <BlogTextShorter blocks={e.body}></BlogTextShorter>
                                    {/* <PortableText value={e.exzerpt} /> */}
                                </div>
                                <div className="author w-full hidden sm:block md:w-2/4">
                                    <div className="avatar items-center flex md:justify-end w-full">
                                        <img
                                            src={e.author.avatarUrl}
                                            className="rounded-full h-8 w-8 md:h-12 md:w-12"
                                            alt=""
                                        />
                                        <div className="name pl-2 text-xs">{e.author.name}</div>
                                    </div>
                                </div>

                                <Link href={`/blog/${e.slug.current}`}>
                                    <span className="text-black font-bold mt-4 block"> Mehr lesen</span>
                                </Link>
                            </div>
                        </>
                    );
                })}
            </div>
            {numEntriesDisplayed < props.data.length && (
                <div className="col-span-12 flex justify-center">
                    <button
                        onClick={handleShowMore}
                        className="bg-blackText font-semibold hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] uppercase rounded-md md:mt-16"
                    >
                        <span className="text-primaryColor-200"> Mehr zeigen</span>
                    </button>
                </div>
            )}
            <div className={`mehr flex justify-center mt-4 ${props.alle ? "" : "hidden"}`}>
                <Link href="/blog">
                    <a className="font-oswald text-bold hover-underline-animation">
                        {" "}
                        <span>alle anzeigen</span>{" "}
                    </a>
                </Link>
            </div>
            <style jsx>{`
                .hover-underline-animation {
                    transition: all ease-in-out 250ms;
                }
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
                    color: white;
                }

                .hover-underline-animation:hover span::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }
                .hover-underline-animation:hover {
                }
                .swiper-pagination-bullet-active {
                    background-color: #000 !important;
                }
            `}</style>
        </div>
    );
};

export default BlogGrid1;
