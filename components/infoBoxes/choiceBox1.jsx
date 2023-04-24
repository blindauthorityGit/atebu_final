import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import urlFor from "../functions/urlFor";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

//SLIDER
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ChoiceBox1 = (props) => {
    const [textIndex, setTextIndex] = useState(0);
    const swiperRef = useRef(null);
    const [swiper, setSwiper] = useState(null);

    const handleClick = (i) => {
        setTextIndex(i);
        onCategoryChange();
    };

    const onCategoryChange = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(0);
        }
    };

    const handleReachEnd = () => {
        const currentIndex = textIndex % props.data.leistungElementFull.length;
        const nextIndex = (currentIndex + 1) % props.data.leistungElementFull.length;
        setTextIndex(textIndex + 1);
    };

    return (
        <div className="col-span-12 mb-8">
            <div className="grid grid-cols-12 px-8">
                <div className="col-span-12">
                    <h2 className="font-semibold font-serif tracking-wide text-xl md:text-3xl mb-4">
                        {props.data.title}
                    </h2>
                </div>
                <div className="col-span-12 relative h-48">
                    <div className={` container xl:container-xl m-auto  relative h-full  ${props.colspan}`}>
                        <div className="relative h-full " data-aos={props.dataAos}>
                            <Swiper
                                // install Swiper modules
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                    Parallax,
                                    Keyboard,
                                    Autoplay,
                                    Virtual,
                                ]}
                                ref={swiperRef}
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
                                onReachEnd={() => {
                                    console.log("end reached");
                                    console.log(textIndex + 1);
                                    // handleReachEnd();
                                }}
                                onSlideChange={() => console.log("slide change")}
                                className={` h-full `}
                            >
                                {props.data.leistungElementFull[textIndex].image.map((e, i) => {
                                    console.log(e);
                                    return (
                                        <>
                                            <SwiperSlide key={`sliderKeyMobileFull${i}`}>
                                                <Image
                                                    src={urlFor(e).url()}
                                                    layout="fill"
                                                    loading="lazy"
                                                    objectFit="cover"
                                                    alt="hero"
                                                    className="z-10"
                                                />
                                            </SwiperSlide>
                                        </>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                    {/* <Image
                        src={urlFor(props.data.leistungElementFull[textIndex].image[0]).url()}
                        layout="fill"
                        loading="lazy"
                        objectFit="cover"
                        alt="hero"
                        className="z-10"
                    /> */}
                </div>
                <div className="choiceBtns col-span-12 flex p-2 bg-primaryColor-200 text-sm">
                    {props.data.leistungElementFull.map((e, i) => {
                        const isActive = textIndex === i;

                        return (
                            <>
                                <div
                                    className={`button mr-8  ${
                                        isActive ? "active underline font-bold" : "font-semibold opacity-40"
                                    }`}
                                    onClick={() => handleClick(i)}
                                >
                                    {e.title}
                                </div>
                            </>
                        );
                    })}
                </div>
                <div className="text-sm leading-relaxed col-span-12 mt-6">
                    <PortableText value={props.data.leistungElementFull[textIndex].richText} />
                </div>
                <hr className="col-span-12 mt-4  bg-primaryColor-600" />
            </div>
        </div>
    );
};

export default ChoiceBox1;
