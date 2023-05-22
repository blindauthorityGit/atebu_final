import React, { useState, useEffect } from "react";
import Link from "next/link";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";

import IMG1 from "./assets/1.jpg";
import IMG2 from "./assets/2.jpg";
import IMG3 from "./assets/3.jpg";
import IMG4 from "./assets/4.jpg";
import IMG5 from "./assets/5.jpeg";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//COMPS
import Lightbox from "../lightbox";

// animations
import { motion } from "framer-motion";

// icons
import { BsArrowRightShort } from "react-icons/bs";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
import { IoIosAdd } from "react-icons/io";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ImageGridBasic = (props) => {
    const [showLB, setShowLB] = useState(false);
    const [lbImg, setLbImg] = useState(null);

    return (
        <>
            {showLB ? (
                <Lightbox
                    closeMe={() => {
                        setShowLB(false);
                    }}
                    data={props.data[lbImg]}
                ></Lightbox>
            ) : null}

            <div className={`w-full grid grid-cols-12 relative z-10   gap-2 h-full  ${props.colspan}`}>
                <>
                    {props.data.map((e, i) => {
                        return (
                            <div className="col-span-4 relative group xl:h-[450px]">
                                <Image
                                    // {...ImagePropsGallery(i)}
                                    src={urlFor(e).url()}
                                    layout="fill"
                                    loading="lazy"
                                    objectFit="cover"
                                    alt="hero"
                                    className="group-hover:scale-110 transition-all duration-500"
                                    onClick={() => {
                                        console.log("RTE");
                                        setShowLB(true);
                                        setLbImg(i);
                                    }}
                                />
                            </div>
                        );
                    })}
                </>
            </div>
        </>
    );
};

export default ImageGridBasic;
