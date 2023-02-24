import React, { useState, useEffect } from "react";
import Link from "next/link";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//config
import sliderConfig from "./slides/config";

// animations
import { motion } from "framer-motion";

// icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

//functions
import BlogTextShorter from "../functions/blogTextShorter";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const EventSlider1 = (props) => {
    const [isLoaded, setisLoaded] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const [isLastSlideLeft, setIsLastSlideLeft] = useState(true);
    const [isLastSlideRight, setIsLastSlideRight] = useState(false);

    const handleNav = () => {
        if (swiper && swiper.activeIndex === 0) {
            setIsLastSlideLeft(true);
        } else if (swiper.activeIndex === swiper.slides.length - 1) {
            setIsLastSlideRight(true);
        } else {
            setIsLastSlideLeft(false);
            setIsLastSlideRight(false);
        }
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
            className={`${isLoaded ? "opacity-100" : "opacity-0"} container sm:px-8 sm:px-24 m-auto relative ${
                props.colspan
            }`}
        >
            <div className="w-full z-50 md:hidden">
                <div
                    onClick={() => {
                        swiper.slidePrev();
                    }}
                    className="absolute top-[18%]  transform -translate-x-1/2 z-50 "
                >
                    <button
                        style={{ opacity: isLastSlideLeft ? 0.5 : 1 }}
                        className=" rounded-full h-8 w-8 flex items-center justify-center"
                    >
                        <HiChevronLeft className="text-blackText" />
                    </button>
                </div>
                <div
                    onClick={() => {
                        swiper.slideNext();
                    }}
                    className="absolute top-[18%] right-[0] transform -translate-x-1/2  z-50"
                >
                    <button
                        style={{ opacity: isLastSlideRight ? 0.5 : 1 }}
                        className=" rounded-full h-8 w-8 flex items-center justify-center"
                    >
                        <HiChevronRight className="text-blackText" />
                    </button>
                </div>
            </div>
            {props.nonstart ? (
                <h2 className="font-oswald text-4xl lg:text-6xl font-semibold mb-8 lg:mb-12">
                    Weitere Veranstaltungen:
                </h2>
            ) : null}

            <Swiper
                // install Swiper modules
                modules={[Pagination, Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={4}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => {
                    console.log(swiper.params);
                    {
                        setSwiper(swiper);
                    }
                }}
                onSlideChange={() => {
                    console.log("slide change");
                    console.log(swiper.activeIndex);
                    handleNav();
                }}
                className="h-full eventSlider pb-[3.75rem!important]"
                style={{ paddingBottom: "3.75rem!important" }}
                breakpoints={{
                    // when window width is >= 640px
                    320: {
                        slidesPerView: 1.1,
                        navigation: true,
                    },
                    768: {
                        slidesPerView: 1.2,
                        navigation: true,
                    },
                    1024: {
                        slidesPerView: 2,
                        navigation: false,
                    },
                    1280: {
                        slidesPerView: 2,
                        navigation: false,
                    },
                }}
            >
                {props.data.map((e, i) => {
                    return (
                        <SwiperSlide
                            key={`sliderKey${i}`}
                            className="px-6 sm:px-0 w-full relative min-h-[350px!important] sm:min-h-[380px!important]"
                        >
                            <h3
                                onClick={() => {
                                    swiper && swiper.slideNext();
                                }}
                                className="font-oswald text-xl font-semibold mb-2"
                            >
                                {e.date.split("T")[0].split("-").reverse().join(".")}
                                {/* {e.date.split("-").reverse().join(".")} */}
                            </h3>
                            <Link href={`/events/${e.slug.current}`}>
                                <div className="cursor-pointer relative overflow-hidden">
                                    <motion.img
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.3 },
                                        }}
                                        src={urlFor(e.featuredImage)}
                                        alt={e.title}
                                    />
                                </div>
                            </Link>
                            <div className=" sm:text-left mt-4 ">
                                <div className="md:flex mb-4">
                                    <h2 className="font-oswald w-full md:w-2/4 font-semibold text-xl mt-3">
                                        {e.title}
                                    </h2>
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
                                </div>
                                <hr />
                                <p className="mb-6 sm:mb-12 sm:mt-6 text-xs md:text-regular leading-relaxed">
                                    <BlogTextShorter blocks={e.body}></BlogTextShorter>
                                </p>
                            </div>
                            <Link href={`/events/${e.slug.current}`}>
                                <button className="bg-blackText font-semibold hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-2 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-16">
                                    <span className="text-primaryColor-200"> Mehr</span>
                                </button>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <style jsx>{`
                .hover-underline-animation {
                    transition: all ease-in-out 250ms;
                }
                .hover-underline-animation span {
                    display: inline-block;
                    position: relative;
                    // color: #000;
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

export default EventSlider1;
