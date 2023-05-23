import React, { useState, useEffect } from "react";
import Image from "next/image";

//COMPS
import Overlay from "../modal/overlay";

import urlFor from "../functions/urlFor";

const Lightbox = (props) => {
    const [swiper, setSwiper] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        console.log(props.data);
    }, []);

    return (
        <div className="LIGHTBOX w-full h-full fixed top-0 left-0 z-20">
            <div className="w-full relative h-full">
                <Image
                    // {...ImagePropsGallery(i)}
                    src={urlFor(props.data[props.startIndex]).url()}
                    layout="fill"
                    loading="lazy"
                    objectFit="contain"
                    alt="Leistung"
                    className="h-full z-10"
                    onLoad={(e) => {
                        console.log(e);
                    }}
                />
            </div>

            <div onClick={props.closeMe} className="absolute top-0 w-full h-full  opacity-50"></div>
        </div>
    );
};

export default Lightbox;
