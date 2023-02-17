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

// animations
import { motion } from "framer-motion";

//functions
import generateNumbers from "../functions/generateNumbers";

// icons
import { BsArrowRightShort } from "react-icons/bs";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ImageGrid1 = (props) => {
    const [images, setImages] = useState(null);
    const [numbers, setNumbers] = useState(null);

    useEffect(() => {
        setImages(props.images);
        setNumbers(generateNumbers());
        console.log(generateNumbers());
        // console.log(images[1]);
    }, [images]);

    return (
        <div
            className={`w-full grid grid-cols-12 relative grid-rows-2 z-10 md:min-h-[30rem] lg:min-h-[40rem] gap-2 h-full  ${props.colspan}`}
        >
            {numbers && images && (
                <>
                    <div className="col-span-4 relative group">
                        {images && (
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(images[numbers[0]].image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="group-hover:scale-110 transition-all duration-500"
                                onClick={props.onClick}
                            />
                        )}
                    </div>
                    <motion.div className="col-span-4 relative mt-4 group">
                        {images && (
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(images[numbers[1]].image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="group-hover:scale-110 transition-all duration-500"
                                onClick={props.onClick}
                            />
                        )}
                    </motion.div>
                    <div className="col-span-4 row-span-1 relative group">
                        {images && (
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(images[numbers[2]].image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="group-hover:scale-110 transition-all duration-500"
                                onClick={props.onClick}
                            />
                        )}
                    </div>
                    <div className="col-span-8 row-span-1 relative group">
                        <Image
                            // {...ImagePropsGallery(i)}
                            src={urlFor(images[numbers[3]].image).url()}
                            layout="fill"
                            loading="lazy"
                            objectFit="cover"
                            alt="hero"
                            className="group-hover:scale-110 transition-all duration-500"
                            onClick={props.onClick}
                        />
                    </div>
                    <div className="col-span-4 row-span-1 relative group">
                        <Image
                            // {...ImagePropsGallery(i)}
                            src={urlFor(images[numbers[4]].image).url()}
                            layout="fill"
                            loading="lazy"
                            objectFit="cover"
                            alt="hero"
                            className="group-hover:scale-110 transition-all duration-500"
                            onClick={props.onClick}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageGrid1;
