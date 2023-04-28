import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// COMPS
import { PrintAvailability } from "../floaters";

// FUNCTIONS
import shuffleArray from "../functions/shuffleArray";

// Framer motion
import { motion, useScroll, useAnimation } from "framer-motion";

// icons
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

// ANIMATIONS

const containerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0,
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const HeroSlider1 = (props) => {
    const [loading, setLoading] = useState(true);
    const [swiper, setSwiper] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 100);
    };

    return (
        <>
            {/* <div
                className="left hidden lg:block absolute top-[45%] left-24 text-6xl text-primaryColor-800"
                onClick={() => {
                    swiper.slidePrev();
                }}
            >
                <HiOutlineChevronLeft></HiOutlineChevronLeft>
            </div> */}
            {/* <div
                className="right hidden lg:block absolute top-[45%] right-24 text-6xl text-primaryColor-800"
                onClick={() => {
                    swiper.slideNext();
                }}
            >
                <HiOutlineChevronRight></HiOutlineChevronRight>
            </div> */}
            <div className={`h-[65%] sm:h-[70%] lg:h-[80%]  container m-auto relative  ${props.colspan}`}>
                <PrintAvailability />
                <div className="relative col-span-8 h-full" data-aos={props.dataAos}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual]}
                        spaceBetween={20}
                        slidesPerView={1}
                        parallax
                        centeredSlides
                        keyboard={true}
                        virtual
                        fadeEffect={{ crossFade: true }}
                        speed={225}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        onSwiper={(swiper) => {
                            console.log(swiper.params);
                            {
                                setSwiper(swiper);
                            }
                        }}
                        onSlideChange={() => console.log("slide change")}
                        className={` h-full `}
                    >
                        {props.data.map((e, i) => {
                            return (
                                <>
                                    <SwiperSlide
                                        key={`sliderKey${i}`}
                                        layoutId="hero"
                                        transition={{ duration: 0.5 }}
                                        className="bg-cover  bg-no-repeat relative h-full"
                                    >
                                        <motion.div
                                            // style={{ boxShadow: "var(--shadow-elevation-high)" }}
                                            className={`h-[90%] md:h-[95%] lg:h-[97%] sm:border-8 border-white relative transition-all ${
                                                clicked ? "scale-[0.975]" : ""
                                            }`}
                                            data-swiper-parallax="100"
                                            data-swiper-parallax-opacity="0.15"
                                            data-swiper-parallax-scale="0.78"
                                        >
                                            <Link href={`/galerie/${e.slug.current}`}>
                                                <a>
                                                    <Image
                                                        // {...ImagePropsGallery(i)}
                                                        src={urlFor(e.image).url()}
                                                        layout="fill"
                                                        loading="lazy"
                                                        objectFit="cover"
                                                        objectPosition="top"
                                                        alt="hero"
                                                        quality="10"
                                                        onClick={handleClick}
                                                        onLoad={() => {
                                                            console.log("LOADING");
                                                            setLoading(false);
                                                        }}
                                                        className="  sm:max-w-[100%!important] sm:min-w-[100%!important] KNORKE"
                                                        // max-w-[99%!important] min-w-[92%!important]
                                                    />
                                                </a>
                                            </Link>
                                        </motion.div>

                                        {/* <div className="textBox z-40 px-16 sm:px-36 lg:px-48 col-span-12 lg:col-span-8 flex flex-col justify-center items-center sm:items-start">
                                <h1 className="text-white text-2xl sm:text-6xl font-oswald uppercase font-bold text-center sm:text-left">
                                    {e.title}
                                </h1>
                                <p className="subLine text text-white font-serif mt-10 ">{e.subTitle}</p>
                                <Link href={e.buttonLink}>
                                    <button className="bg-primaryColor hover-underline-animation  flex items-center justify-center text-white mt-8 py-3 px-6 min-w-[10rem] max-w-[12rem] font-oswald uppercase rounded-md">
                                        <span className=""> {e.buttonText}</span>
                                    </button>
                                </Link>
                            </div> */}
                                        {/* <div className="absolute w-full h-full bg-black top-0 opacity-30"></div> */}
                                        {/* <img src={e.image} alt="" /> */}
                                        <div
                                            className="absolute text-center sm:text-left py-3 sm:py-0 bottom-[2.25rem]  sm:bg-transparent sm:bottom-[2rem] lg:bottom-[0rem] pl-8 sm:pl-0 text-primaryColor-200 w-full sm:w-auto sm:text-textBlack sm:left-8 text-xs z-50  lg:block"
                                            data-swiper-parallax-opacity="0.5"
                                            data-swiper-parallax="-600"
                                            data-swiper-parallax-duration="600"
                                        >
                                            <p className="hidden sm:block">
                                                {e.titel_Bild} | {e.year} {e.technik}
                                            </p>
                                            <p className="sm:hidden block font-semibold z-30 relative">
                                                {e.year} {e.technik}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                </>
                            );
                        })}
                    </Swiper>
                </div>

                <style jsx>{`
                    .hover-underline-animation span {
                        display: inline-block;
                        position: relative;
                        color: #e5e4dd;
                    }

                    .hover-underline-animation span::after {
                        content: "";
                        position: absolute;
                        width: 100%;
                        transform: scaleX(0);
                        height: 2px;
                        bottom: 0;
                        left: 0;
                        background-color: white;
                        transform-origin: bottom right;
                        transition: transform 0.25s ease-out;
                    }

                    .hover-underline-animation:hover span::after {
                        transform: scaleX(1);
                        transform-origin: bottom left;
                    }
                    .swiper-pagination-bullet {
                        background-color: #fff !important;
                    }
                `}</style>
            </div>
            <div className="container h-[40%] md:h-[28%] text-blackText-500 p-4 mx-auto flex-col items-center justify-center ">
                <div className="wrapper h-full flex flex-col justify-center py-4">
                    <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.h1
                            className="text-4xl md:text-5xl font-serif tracking-wider mb-2"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
                            }}
                        >
                            <motion.span
                                className="text-xl block"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0 } }}
                            >
                                ATELIER
                            </motion.span>
                            BUCHNER
                        </motion.h1>
                    </motion.div>
                    <p className="text-xs sm:text-sm text-center tracking-widest">Atelier für Kunstmalerei & Kurse</p>
                    <div className="w-full flex justify-center mt-4">
                        <Link href="/galerie">
                            <button className="bg-blackText hover-underline-animation font-semibold flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-xs tracking-wider sm:text-base sm:py-3 px-6 min-w-[12rem] max-w-[12rem]  uppercase rounded-md">
                                <span className=""> Alle Bilder</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSlider1;
