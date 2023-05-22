import React, { useState, useEffect, useRef } from "react";
import urlFor from "../functions/urlFor";
import { PortableText } from "@portabletext/react";
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

const BigChoiceBox = (props) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [categories, setCategories] = useState(null);
    const [categoryLeistung, setCategoryLeistung] = useState(null);
    const [activeCat, setActiveCat] = useState(0);
    const [activeLeistung, setActiveLeistung] = useState(0);

    useEffect(() => {
        setCategories(Array.from(new Set(props.data.leistungen.map((e) => e.category))));
    }, []);

    useEffect(() => {
        if (categories !== null) {
            setCategoryLeistung(categories[0]);
        }
    }, [categories]);

    return (
        <>
            <div className="col-span-12 grid grid-cols-12 z-20">
                {categories &&
                    categories.map((e, i) => {
                        return (
                            <div
                                onClick={() => {
                                    setCategoryLeistung(e);
                                    setCategoryIndex(0);
                                    setActiveCat(i);
                                    setActiveLeistung(0);
                                }}
                                className={`${i === activeCat ? "bg-blackText text-primaryColor-50" : ""} ${
                                    i % 2 !== 0 ? "mx-1" : null
                                } col-span-4 rounded-t-lg

                                bg-brightBG cursor-pointer text-xl font-semibold hover:text-primaryColor-50 py-4 text-center hover:bg-blackText transition-all duration-500`}
                            >
                                {e}
                            </div>
                        );
                    })}
            </div>
            <div className="col-span-12 grid grid-cols-12 z-20 bg-brightBG min-h-[850px]">
                <div className="col-span-4 p-4">
                    {props.data.leistungen
                        .filter((e) => e.category === categoryLeistung)
                        .map((e, i) => {
                            return (
                                <div
                                    onClick={() => {
                                        setCategoryIndex(i);
                                        setActiveLeistung(i);
                                    }}
                                    className={`${
                                        i === activeLeistung ? "border-4 p-10 border-primaryColor-400" : null
                                    } w-full cursor-pointer hover:bg-primaryColor-300 p-8 bg-white mb-4 `}
                                >
                                    <h4
                                        className={`${
                                            i === activeLeistung ? "underline" : null
                                        } transition-all duration-300 font-semibold mb-4`}
                                    >
                                        {e.title}
                                    </h4>
                                    <p className="text-sm xl:text-base">{e.text}</p>
                                </div>
                            );
                        })}
                </div>
                <div className="col-span-8 p-4 relative">
                    <div
                        style={{ position: "sticky", top: "0" }}
                        className="p-4 h-full w-full border-[1rem] border-white"
                    >
                        {categoryLeistung && (
                            <Image
                                src={urlFor(
                                    props.data.leistungen.filter((e) => e.category === categoryLeistung)[categoryIndex]
                                        .featuredImage
                                ).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="z-10"
                            />
                        )}
                    </div>
                </div>
                {/*         
                <div className="text-sm leading-relaxed col-span-12 mt-6">
                    <PortableText value={props.data.leistungElementFull[textIndex].richText} />
            
                <Link href={`./leistungen/${props.data.slug.current}`}>
                    <span className="text-black font-bold mt-4 block col-span-12"> Mehr lesen</span>
                </Link> */}
            </div>
            <div style={{ position: "sticky", top: "0" }}>This element will be sticky.</div>
        </>
    );
};

export default BigChoiceBox;
