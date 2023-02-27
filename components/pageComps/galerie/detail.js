import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// COMPS
import { ContainerStandard } from "../../container";
import { CheckboxContainer1 } from "../../inputs/checkmarks";
import { PaymentIconsContainer } from "../../iconBars";
import { NavButtons } from "../../buttons";
import { InfoBox1 } from "../../collapsables";
import { Anfrage, Kaufen } from "../../modalContent";
import ModalMobile from "../../modal/modalMobile";
import Overlay from "../../modal/overlay";

import client, { getAsset } from "../../../client";
import Image from "next/image";
import Link from "next/link";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// SWIPER
import { useSwipeable } from "react-swipeable";
import Router from "next/router";

// Framer motion
import { motion, useScroll, useAnimation } from "framer-motion";
//ImageBuilder
import myConfiguredSanityClient from "../../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

export default function Detail({
    post,
    containerRef,
    imageLoaded,
    setImageLoaded,
    e,
    setOriginal,
    setDruckPreis,
    original,
    druckPreis,
    rightLink,
    leftLink,
    onLeftClick,
    dataAll,
    currentIndex,
}) {
    const [showModal, setShowModal] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const boxRef = useRef();
    const modalRef = useRef();
    const imgRef = useRef();

    const disabled = post.sold && original ? true : false;

    // INDEX STUFF
    const [currentI, setCurrentI] = useState(null);
    const [prevSlug, setPrevSlug] = useState(null);
    const [nextSlug, setNextSlug] = useState(null);

    const [x, setX] = useState(0);

    const router = useRouter();

    const handlers = useSwipeable({
        onSwiped: (eventData) =>
            console.log(
                "User Swiped!",
                eventData,
                `/galerie/${dataAll[Math.max(0, currentIndex - 1)].slug.current}`,
                `/galerie/${dataAll[Math.min(dataAll.length - 1, currentIndex + 1)].slug.current}`
            ),
        onSwipedLeft: (e) =>
            Router.push(`/galerie/${dataAll[Math.min(dataAll.length - 1, currentIndex + 1)].slug.current}`),
        onSwipedRight: (e) => Router.push(`/galerie/${dataAll[Math.max(0, currentIndex - 1)].slug.current}`),
        onSwiping: ({ deltaX }) => {
            setX(deltaX / 2);
            console.log("test");
        },
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
        });
        setX[0];
        console.log(post, currentI, prevSlug, nextSlug);
    }, []);
    useEffect(() => {
        containerRef.current.children[0].classList.add("fade-in");
        setCurrentI(dataAll.findIndex((e) => e.slug.current === post.slug.current));
        setPrevSlug(currentI > 0 ? dataAll[currentIndex - 1].slug.current : "");
        setNextSlug(currentI < dataAll.length - 1 ? dataAll[currentIndex + 1].slug.current : "");
        setX(0);
    }, [post]);

    useEffect(() => {
        console.log(post, currentI, prevSlug, nextSlug);
    }, [currentI, nextSlug, prevSlug]);

    return (
        <>
            {showModal ? (
                <>
                    <ModalMobile
                        ref={modalRef}
                        onClick={(e) => {
                            console.log(modalRef.current);
                            modalRef.current.classList.add("slide-out-bottom");
                            setTimeout(() => {
                                modalRef.current.classList.remove("slide-out-bottom");
                            }, 300);
                            setTimeout(() => {
                                setShowModal(false);
                                setShowPayment(false);
                            }, 301);
                        }}
                    >
                        {showPayment ? <Kaufen product={post}></Kaufen> : <Anfrage sold={post.sold} />}
                    </ModalMobile>
                    <Overlay
                        onClick={(e) => {
                            setShowModal(false);
                            setShowPayment(false);
                        }}
                    ></Overlay>
                </>
            ) : null}

            <ContainerStandard klasse="gap-1 sm:gap-2 md:px-6 pt-12 md:pt-20">
                <NavButtons
                    onLeftClick={(e) => {
                        console.log(imgRef.current);
                        containerRef.current.children[0].classList.remove("fade-in");
                    }}
                    onRightClick={(e) => {
                        console.log(imgRef.current);
                        containerRef.current.children[0].classList.remove("fade-in");
                    }}
                    currentIndex={currentIndex}
                    dataAll={dataAll}
                />
                <motion.div // layoutId="hero"
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                        ease: "easeInOut",
                    }}
                    className={`col-span-12  ${
                        imageLoaded ? "fade-in" : "invisible"
                    }  relative bg-cover aspect-w-16 aspect-h-9 sm:h-64 transition-all duration-300 ease-in-out`}
                    ref={containerRef}
                    style={{ backgroundImage: `url(${urlFor(post.image).url()})` }}
                >
                    {post.image && (
                        <div
                            {...handlers}
                            className={`absolute top-0 left-0 w-full h-full ${imageLoaded ? "backdrop-blur-lg" : ""}`}
                        >
                            <Image // {...ImagePropsGallery(i)}
                                src={urlFor(post.image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="contain"
                                alt="hero"
                                className={`z-10 opacity-0 ${imageLoaded ? "fade-in  " : "invisible"}`}
                                onLoad={() => setImageLoaded(true)}
                                ref={imgRef}
                                style={{
                                    transform: `translateX(${x}px) scale(${1 - Math.abs(x) / 1000})`,
                                    opacity: `${1 - Math.abs(x) / 10}`,
                                }}
                            />
                        </div>
                    )}{" "}
                </motion.div>
                <div ref={boxRef} className="col-span-12 px-4 md:px-0 mt-2">
                    <h2 className="font-bold uppercase text-xl md:text-3xl tracking-wide">{post.titel_Bild}</h2>
                    <p className="font-semibold text-sm md:text-lg">{post.year}</p>
                    <p className="font-regular text-sm md:text-lg mt-2 md:mt-4">{post.description}</p>
                    <p className="font-regular text-sm md:text-lg mt-2">{post.technik}</p>
                    <div className="mt-8">
                        <CheckboxContainer1
                            onCheckboxClick={(e) => {
                                e.target.value === "original" ? setOriginal(true) : setOriginal(false);
                                e.target.value === "original" ? null : setDruckPreis(post.druckeInfos.titel);
                                console.log(e.target.value);
                            }}
                        ></CheckboxContainer1>
                        {original ? (
                            <div className="details text-xs md:text-sm mt-8">
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Dimensionen</div>
                                    <div className="right">{post.dimensions}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Location</div>
                                    <div className="right">{post.location}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Verfügbarkeit</div>
                                    <div className="right">
                                        {post.sold ? (
                                            <span className="font-semibold text-[#FB5012]">Verkauft</span>
                                        ) : (
                                            <span className="font-semibold text-[#60b862]">Verfügbar</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="details text-xs md:text-base mt-8">
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Dimensionen</div>
                                    <div className="right">
                                        <select
                                            id="printSelect"
                                            name="printSelect"
                                            onChange={(e) => {
                                                console.log(e.target.value);

                                                if (e.target.value === "druck1") {
                                                    setDruckPreis(post.druckeInfos.titel);
                                                } else if (e.target.value === "druck2") {
                                                    setDruckPreis(
                                                        post.druckeInfos.druck1Preis && post.druckeInfos.druck1Preis
                                                    );
                                                } else {
                                                    setDruckPreis(
                                                        post.druckeInfos.druck2Preis && post.druckeInfos.druck2Preis
                                                    );
                                                }
                                            }}
                                        >
                                            <option value="druck1"> {post.dimensions} (Originalgröße)</option>
                                            <option value="druck2">
                                                {" "}
                                                {post.druckeInfos.druck1 && post.druckeInfos.druck1}
                                            </option>
                                            <option value="druck3">
                                                {post.druckeInfos.druck2 && post.druckeInfos.druck2}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Lieferzeit</div>
                                    <div className="right">3-5 Werktage</div>
                                </div>
                                <hr />
                            </div>
                        )}
                    </div>
                    <div className="preis mt-8">
                        <div className="original text-xs md:text-base text-primaryColor-700">
                            {" "}
                            {original ? "ORIGINAL" : "PRINT"}
                        </div>
                        <div className="sum text-lg md:text-2xl font-bold">
                            {original ? (
                                post.sold ? (
                                    <div>
                                        verkauft{" "}
                                        <span className="text-xs text-primaryColor-600 font-regular">
                                            (Prints verfügbar)
                                        </span>{" "}
                                    </div>
                                ) : (
                                    `EUR ${post.price},-`
                                )
                            ) : (
                                `EUR ${druckPreis},-`
                            )}
                        </div>
                    </div>
                    <div className="w-full flex justify-center space-x-4 mt-4">
                        <button
                            onClick={(e) => {
                                setShowModal(true);

                                // modalRef.current.classList.add("slide-in-bottom");
                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className="border border-blackText  hover-underline-animation  flex items-center justify-center text-blackText mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full max-w-[100%]  uppercase rounded-md"
                        >
                            <span className="font-semibold"> Anfragen</span>
                        </button>

                        <button
                            disabled={disabled}
                            onClick={(e) => {
                                setShowModal(true);
                                setShowPayment(true);

                                // modalRef.current.classList.add("slide-in-bottom");
                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className={`bg-blackText hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full max-w-[100%]  uppercase rounded-md ${
                                disabled ? "opacity-30" : ""
                            }`}
                        >
                            <span className="font-semibold"> Kaufen</span>
                        </button>
                    </div>
                    <div className="mt-6">
                        <PaymentIconsContainer></PaymentIconsContainer>
                    </div>
                    <div className="mt-8">
                        <InfoBox1></InfoBox1>
                    </div>
                </div>
            </ContainerStandard>
        </>
    );
}
