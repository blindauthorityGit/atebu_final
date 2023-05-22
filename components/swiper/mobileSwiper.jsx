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
import { LeistungSlide1 } from "./slides";

// FUNCTIONS

// Framer motion
import { motion, useScroll, useAnimation } from "framer-motion";

// icons
import { BsArrowRightShort } from "react-icons/bs";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

//ImageBuilder
import urlFor from "../functions/urlFor";

const MobileSwiper1 = (props) => {
    const [loading, setLoading] = useState(true);
    const [swiper, setSwiper] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 100);
    };

    return (
        <>
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
            <div className={` container col-span-12 xl:container-xl m-auto my-4 relative  ${props.colspan}`}>
                <div className="relative h-full" data-aos={props.dataAos}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual]}
                        spaceBetween={10}
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
                            console.log(e);
                            return (
                                <>
                                    <SwiperSlide key={`sliderKeyMobile${i}`}>
                                        <LeistungSlide1 data={e} />
                                    </SwiperSlide>
                                </>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default MobileSwiper1;
