import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//config
import sliderConfig from "./slides/config";

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

const HeroSlider1 = (props) => {
    const [loading, setLoading] = useState(true);
    const [swiper, setSwiper] = useState(null);

    return (
        <>
            {" "}
            <div
                className="left hidden lg:block absolute top-[45%] left-24 text-6xl text-primaryColor-800"
                onClick={() => {
                    swiper.slidePrev();
                }}
            >
                <HiOutlineChevronLeft></HiOutlineChevronLeft>
            </div>
            <div
                className="right hidden lg:block absolute top-[45%] right-24 text-6xl text-primaryColor-800"
                onClick={() => {
                    swiper.slideNext();
                }}
            >
                <HiOutlineChevronRight></HiOutlineChevronRight>
            </div>
            <div
                className={`h-[83%] sm:h-[90%] lg:h-[95%] container xl:container-xl m-auto relative  ${props.colspan}`}
            >
                <div className="relative h-full" data-aos={props.dataAos}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        parallax
                        // autoplay
                        keyboard={true}
                        fadeEffect={{ crossFade: true }}
                        speed={400}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        onSwiper={(swiper) => {
                            console.log(swiper.params);
                            {
                                setSwiper(swiper);
                            }
                        }}
                        onSlideChange={() => console.log("slide change")}
                        className="h-full "
                    >
                        {props.data.map((e, i) => {
                            return (
                                <>
                                    <SwiperSlide
                                        className="bg-cover grid grid-cols-12 bg-no-repeat relative h-full"
                                        // style={{ backgroundImage: `url(${urlFor(e.image)})` }}
                                    >
                                        <div
                                            style={{ boxShadow: "var(--shadow-elevation-high)" }}
                                            className="h-[92%] lg:h-[93%] sm:border-8  border-white relative"
                                            data-swiper-parallax="100"
                                            data-swiper-parallax-opacity="0.15"
                                            data-swiper-parallax-scale="0.78"
                                        >
                                            <Image
                                                // {...ImagePropsGallery(i)}
                                                src={urlFor(e.image).url()}
                                                layout="fill"
                                                loading="lazy"
                                                objectFit="cover"
                                                objectPosition="top"
                                                alt="hero"
                                                quality="10"
                                                onLoad={() => {
                                                    console.log("LOADING");
                                                    setLoading(false);
                                                }}
                                            />
                                        </div>

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
                                            data-swiper-parallax-duration="1200"
                                        >
                                            <p className="hidden sm:block">
                                                {e.titel_Bild} | {e.year} {e.technik}
                                            </p>
                                            {/* <p className="sm:hidden block">
                                                {e.year} {e.technik}
                                            </p> */}
                                        </div>
                                    </SwiperSlide>
                                </>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="w-full flex justify-center">
                    <Link href={""}>
                        <button className="bg-blackText hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] max-w-[12rem]  uppercase rounded-md">
                            <span className=""> Alle ansehen</span>
                        </button>
                    </Link>
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
        </>
    );
};

export default HeroSlider1;
