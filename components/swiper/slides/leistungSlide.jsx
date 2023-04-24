import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import urlFor from "../../functions/urlFor";

const LeistungSlide = (props) => {
    return (
        <div className="slideHolder bg-brightBG p-6 border-r-4">
            <h3 className="font-bold mb-4 underline">{props.data.title}</h3>
            <p className="mb-6 text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum nostrum tenetur, voluptates, dolorem
                officiis quae veritatis rem explicabo maxime architecto qui consequuntur, rerum debitis laborum optio
                vero nam? Expedita, eius?
            </p>
            <div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="h-64 relative block overflow-hidden group "
            >
                <Image
                    // {...ImagePropsGallery(i)}
                    src={urlFor(props.data.featuredImage).url()}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    alt="Leistung"
                    className=" "
                />
            </div>
        </div>
    );
};

export default LeistungSlide;
