import React, { useState, useEffect } from "react";
import Image from "next/image";

const Lightbox = () => {
    const [show, setShow] = useState(false);

    const [images, setImages] = useState([]);
    const [length, setLength] = useState(0);

    useEffect(() => {
        setImages(props.images);
        setLength(props.images.length);
    }, []);

    return (
        <>
            {show && (
                <div className="container absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center bg-slate-500 z-50">
                    <div className="relative">
                        {images.map((e, i) => {
                            return (
                                <Image
                                    // {...ImagePropsGallery(i)}
                                    src={props.image}
                                    layout="fill"
                                    loading="lazy"
                                    objectFit="cover"
                                    alt="hero"
                                    className="z-10"
                                />
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Lightbox;
