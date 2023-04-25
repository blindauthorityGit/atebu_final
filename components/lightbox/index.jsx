import React, { useState, useEffect } from "react";
import Image from "next/image";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import urlFor from "../functions/urlFor";

const Lightbox = (props) => {
    const [swiper, setSwiper] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        console.log(props.startIndex);
    }, []);

    return (
        <>
            <div
                className="container w-full h-full flex items-center z-50"
                style={{
                    paddingTop: `${(1 / aspectRatio) * 100}%`,
                    position: "relative",
                }}
            >
                <div className="absolute top-0 h-full w-full" data-aos={props.dataAos}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Parallax, Keyboard, Autoplay, Virtual]}
                        spaceBetween={10}
                        initialSlide={props.startIndex}
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
                                    <SwiperSlide key={`sliderKeyMobiles${i}`}>
                                        <div
                                            style={{
                                                paddingTop: `${(1 / aspectRatio) * 100}%`,
                                                position: "relative",
                                            }}
                                        >
                                            <Image
                                                // {...ImagePropsGallery(i)}
                                                src={urlFor(e).url()}
                                                layout="fill"
                                                loading="lazy"
                                                objectFit="cover"
                                                alt="Leistung"
                                                className=" "
                                                onLoad={(event) => {
                                                    console.log(aspectRatio);

                                                    setAspectRatio(event.target.width / event.target.height);
                                                }}
                                            />
                                        </div>
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

export default Lightbox;
