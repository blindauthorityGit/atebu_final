import React from "react";
import HugeLogo from "../../assets/hugeLogo.svg";
import Image from "next/image";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ContainerVH100Children = (props) => {
    return (
        <div
            className={`containervh100 min-h-screen relative overflow-hidden ${
                props.center ? "lg:items-center flex" : ""
            }  ${props.hFull ? "h-full" : ""} py-12 sm:py-24 w-full ${props.klasse}`}
        >
            {props.showBG ? (
                <div className="absolute left-[-30%] top-0 h-full opacity-[0.02]">
                    <img src={HugeLogo.src} alt="" />
                </div>
            ) : null}
            <div className="absolute w-full h-2/4 lg:h-full lg:w-2/4 right-0 top-0 h-full bg-red-600">
                <Image
                    // {...ImagePropsGallery(i)}
                    src={urlFor(props.image).url()}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    objectPosition="top"
                    alt="hero"
                    quality="10"
                    onLoad={() => {
                        console.log("LOADING");
                    }}
                    className="grayscale"
                />
            </div>
            {/* Background Image */}
            {props.children}
        </div>
    );
};

export default ContainerVH100Children;
