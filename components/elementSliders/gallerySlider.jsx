import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

// Overlay
import Overlay from "../modal/overlay";
// Modal
import Modal from "../modal/modal";

const GallerySlider1 = (props) => {
    const [isLoaded, setisLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [activeImg, setActiveImg] = useState(null);

    const swiperRef = useRef();

    useEffect(() => {
        setisLoaded(true);
        swiperRef.current.style.paddingBottom = "3.75rem!important";
    }, []);

    useEffect(() => {
        swiperRef.current.style.paddingBottom = "3.75rem!important";
    }, [swiperRef.current]);

    return (
        <>
            {showOverlay ? <Overlay onClick={(e) => setShowOverlay(false)}></Overlay> : null}
            {showOverlay ? (
                <Modal onClick={(e) => setShowOverlay(false)}>
                    <Image
                        // {...ImagePropsGallery(i)}
                        src={activeImg}
                        layout="fill"
                        loading="lazy"
                        objectFit="contain"
                        alt="hero"
                    />
                </Modal>
            ) : null}
            <div className={`${isLoaded ? "opacity-100" : "opacity-0"}  relative ${props.colspan}`}>
                <Swiper
                    // install Swiper modules
                    modules={[Pagination, A11y]}
                    spaceBetween={25}
                    slidesPerView={4}
                    ref={swiperRef}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    className="h-full eventSlider pb-[3rem!important]"
                    style={{ paddingBottom: "3.75rem!important" }}
                    breakpoints={{
                        // when window width is >= 640px
                        320: {
                            slidesPerView: 1.25,
                        },
                        768: {
                            slidesPerView: 2.2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 1.2,
                        },
                    }}
                >
                    {props.data.map((e, i) => {
                        return (
                            <>
                                <SwiperSlide key={`galleryKey${i}`} className="">
                                    <div className="cursor-pointer relative overflow-hidden h-48 xl:h-[580px]">
                                        {/* <motion.img
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.3 },
                                        }}
                                        src={urlFor(e.image).width(400).height(300)}
                                        onClick={(e) => {
                                            setShowOverlay(true);
                                            setActiveImg(urlFor(props.data[i].image).url());
                                            console.log(props.data[i]);
                                        }}
                                    /> */}
                                        <Image
                                            // {...ImagePropsGallery(i)}
                                            src={urlFor(e).url()}
                                            layout="fill"
                                            loading="lazy"
                                            objectFit="cover"
                                            alt="hero"
                                            onClick={props.onClick}
                                            id={i}
                                        />
                                    </div>{" "}
                                </SwiperSlide>
                            </>
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
        </>
    );
};

export default GallerySlider1;
