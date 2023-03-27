import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import urlFor from "../functions/urlFor";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

const ChoiceBox1 = (props) => {
    const [textIndex, setTextIndex] = useState(0);

    const handleClick = (i) => {
        setTextIndex(i);
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
                    <Image
                        src={urlFor(props.data.leistungElementFull[textIndex].image).url()}
                        layout="fill"
                        loading="lazy"
                        objectFit="cover"
                        alt="hero"
                        className="z-10"
                    />
                </div>
                <div className="choiceBtns col-span-12 flex mt-2">
                    {props.data.leistungElementFull.map((e, i) => {
                        const isActive = textIndex === i;

                        return (
                            <div
                                className={`button mr-8  ${
                                    isActive ? "active underline font-bold" : "font-semibold opacity-40"
                                }`}
                                onClick={() => handleClick(i)}
                            >
                                {e.title}
                            </div>
                        );
                    })}
                </div>
                <div className="text-sm leading-relaxed col-span-12 mt-6">
                    <PortableText value={props.data.leistungElementFull[textIndex].richText} />
                </div>
            </div>
        </div>
    );
};

export default ChoiceBox1;
