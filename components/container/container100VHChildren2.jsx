import React from "react";
import HugeLogo from "../../assets/hugeLogo.svg";
import Image from "next/image";
import { Form1 } from "../contactForm";
import Link from "next/link";
import Kontakt from "../../assets/kontakt.jpg";

import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ContainerVH100Children2 = (props) => {
    return (
        <div
            className={`containervh100 min-h-screen relative overflow-hidden ${
                props.center ? "lg:items-center flex" : ""
            }  ${props.hFull ? "h-full" : ""}  w-full ${props.klasse}`}
        >
            {props.showBG ? (
                <div className="absolute left-[-30%] top-0 h-full opacity-[0.02]">
                    <img src={HugeLogo.src} alt="" />
                </div>
            ) : null}
            <div className="container m-auto grid grid-cols-12 px-8 lg:px-0 lg:gap-16">
                <div className="col-span-12  lg:col-span-6 relative h-64 lg:h-full">
                    <Image
                        // {...ImagePropsGallery(i)}
                        src={Kontakt}
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
                <div className="col-span-12 lg:col-span-6">
                    <div className="kontakt flex mt-6 md:mt-12 text-primaryColor-500 md:text-3xl lg:w-[100%] items-center justify-end">
                        <div className="left">+43 650 944 4150</div>
                        <div className="left ml-4">
                            <FaPhone></FaPhone>
                        </div>
                    </div>
                    <div className="kontakt flex text-primaryColor-500 mt-4 md:text-3xl lg:w-[100%] items-center justify-end">
                        <div className="left">christine@atelierbuchner.at</div>
                        <div className="left ml-4">
                            <FaEnvelope></FaEnvelope>
                        </div>
                    </div>
                    <div className="kontakt flex text-primaryColor-500 mt-12 md:text-3xl lg:w-[100%] items-center justify-end">
                        <div className="left text-right text-primaryColor-200 text-xl">
                            Atelier Buchner <br></br>
                            Prof. Sepp Buchner - Straße 528 <br />
                            2823 Pitten
                        </div>
                        <div className="left ml-4 text-primaryColor-200">
                            <FaMapMarkerAlt></FaMapMarkerAlt>
                        </div>
                    </div>
                    <Form1></Form1>
                </div>
            </div>
        </div>
    );
};

export default ContainerVH100Children2;
