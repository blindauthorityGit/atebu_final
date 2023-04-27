import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import urlFor from "../functions/urlFor";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

// import urlFor from "../functions/urlFor";

//SLIDER

const BigChoiceBox = (props) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [categories, setCategories] = useState(null);
    const [categoryLeistung, setCategoryLeistung] = useState(null);

    const handleClick = (i) => {};

    const onCategoryChange = () => {};

    useEffect(() => {
        console.log(Array.from(new Set(props.data.leistungen.map((e) => e.category))));
        setCategories(Array.from(new Set(props.data.leistungen.map((e) => e.category))));
    }, []);

    useEffect(() => {
        if (categories !== null) {
            setCategoryLeistung(categories[0]);
        }
    }, [categories]);

    return (
        <div className="col-span-12 grid grid-cols-12 z-30">
            {categories &&
                categories.map((e, i) => {
                    return (
                        <div
                            onClick={() => {
                                console.log(e);
                                setCategoryLeistung(e);
                            }}
                            className="col-span-4"
                        >
                            {e}
                        </div>
                    );
                })}
            <div className="col-span-4">
                {props.data.leistungen
                    .filter((e) => e.category === categoryLeistung)
                    .map((e, i) => {
                        return (
                            <div
                                onClick={() => {
                                    console.log(i);
                                    setCategoryIndex(i);
                                }}
                                className="w-full"
                            >
                                {e.title}
                            </div>
                        );
                    })}
            </div>
            <div className="col-span-8">
                <img src={urlFor(props.data.leistungen[categoryIndex].featuredImage)} alt="" />
            </div>
            {/*         
                <div className="text-sm leading-relaxed col-span-12 mt-6">
                    <PortableText value={props.data.leistungElementFull[textIndex].richText} />
            
                <Link href={`./leistungen/${props.data.slug.current}`}>
                    <span className="text-black font-bold mt-4 block col-span-12"> Mehr lesen</span>
                </Link> */}
        </div>
    );
};

export default BigChoiceBox;
