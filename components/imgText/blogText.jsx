import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useRouter } from "next/router";

import urlFor from "../functions/urlFor";
import Breadcrumbs from "../Breadcrumbs";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const myPortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value) return null;
            return (
                <div className="relative  h-48 mb-4 mt-4">
                    <Image
                        src={urlFor(value).url()}
                        layout="fill"
                        loading="lazy"
                        alt={value.alt ? value.alt : "Bild"}
                        className=" mb-1"
                        objectFit="cover"
                    />
                    {value.caption ? <div className="caption mt-2 italic text-right">{value.caption}</div> : null}
                </div>
            );
        },
    },
};

const BlogTxt = (props) => {
    const ref = useRef(null);
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    // BREADCRUMBS
    const [linkList, setLinkList] = useState([]);

    useEffect(() => {
        setLinkList(() => [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Blog",
                link: "/blog",
            },
            { title: props.dataBlog.title, link: props.dataBlog.slug.current },
        ]);
        return () => {};
    }, [router.asPath]);

    return (
        <div ref={ref} className={`col-span-12 grid grid-cols-12  ${props.colspan}`}>
            {" "}
            <motion.div
                data-aos="fade-right"
                className={`left h-64 sm:h-auto md:h-[20rem]  sm:block mb-4 lg:mb-0 col-span-12 order-first lg:order-last lg:col-span-7 relative   lg:h-auto ${props.order}`}
            >
                <Image src={props.image} layout="fill" loading="lazy" objectFit="cover" alt="hero" className="z-10" />
                <div className="bgOverlay absolute md:hidden bg-primaryColor opacity-20 w-full h-full md:left-[1.85rem] lg:left-[-2rem] top-[-2rem]"></div>
            </motion.div>
            <Breadcrumbs links={linkList} klasse="px-8"></Breadcrumbs>
            <div className="right col-span-12 sm:col-span-8 px-8 sm:px-0 md:px-12  lg:col-span-5 flex flex-col justify-center ">
                <div
                    data-aos="fade-up"
                    className="font-montserrat  text-blackText mt-4 lg:mt-0  tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-sm sm:text-base lg:text-2xl text-textBlack-100 mb-4"
                >
                    <h2 className="font-bold font-serif tracking-wider text-3xl md:text-3xl mb-6">
                        {props.data.title}
                    </h2>
                    <div className="author w-full  sm:block md:w-2/4 mb-8">
                        <div className="avatar items-center flex md:justify-end w-full">
                            <img
                                src={urlFor(props.dataBlog.author.avatarUrl)}
                                className="rounded-full h-8 w-8 md:h-12 md:w-12"
                                alt=""
                            />
                            <div className="name pl-2 text-xs mr-8">{props.dataBlog.author.name}</div>
                            <div className="datum text-xs">
                                {props.data.date.split("T")[0].split("-").reverse().join(".")}
                            </div>
                        </div>
                    </div>

                    <div className="text-sm leading-relaxed">
                        <PortableText value={props.data.body} components={myPortableTextComponents} />
                    </div>
                </div>

                {props.children}
                {props.button ? (
                    <div className="grid grid-cols-12 w-full gap-2 mb-6">
                        {" "}
                        <Link href={props.link}>
                            <button className="hover-underline-animation col-span-12 md:col-span-6 border font-bold border-primaryColor-300 flex items-center justify-center text-primaryColor-300 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-8">
                                <span className="text-primaryColor-300"> MEHR</span>
                            </button>
                        </Link>
                        <button
                            onClick={props.buchenClick}
                            id={props.id}
                            className="hover-underline-animation col-span-12 md:col-span-6  bg-primaryColor-500 font-bold flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-8"
                        >
                            <span className="text-primaryColor-50"> Buchen</span>
                        </button>
                    </div>
                ) : null}
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

export default BlogTxt;
