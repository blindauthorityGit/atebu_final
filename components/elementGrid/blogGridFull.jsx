export { default as ElementGrid1 } from "./elementGrid1";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// animations

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

const BlogGridFull = (props) => {
    const [isLoaded, setisLoaded] = useState(false);

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
                {props.data.map((e, i) => {
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
                                <Link href={`/blog/${e.slug.current}`}>
                                    <h2 className="font-oswald font-semibold text-2xl mt-2 mb-4">{e.title}</h2>
                                </Link>
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

export default BlogGridFull;
