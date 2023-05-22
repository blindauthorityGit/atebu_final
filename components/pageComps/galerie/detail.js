import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

// COMPS
import { ContainerStandard } from "../../container";
import { CheckboxContainer1 } from "../../inputs/checkmarks";
import { PaymentIconsContainer } from "../../iconBars";
import { NavButtons, NavButtonsBig } from "../../buttons";
import { InfoBox1 } from "../../collapsables";
import { Anfrage, Kaufen } from "../../modalContent";
import ModalMobile from "../../modal/modalMobile";
import Modal from "../../modal/modal";
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

//FUNCTIONS
import useBreakpoints from "../../functions/useBreakPoints";

//ASSETS
import HugeLogo from "../../../assets/hugeLogo.svg";

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
    const modalRef2 = useRef();
    const imgRef = useRef();

    const disabled = post.sold && original ? true : false;

    // BREAKPOINTS
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

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
        console.log(isMobile, isTablet, isDesktop);
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
                    {isMobile ? (
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
                    ) : (
                        <Modal
                            ref={modalRef2}
                            onClick={(e) => {
                                console.log(modalRef2.current);
                                modalRef2.current.classList.add("slide-out-bottom");
                                setTimeout(() => {
                                    modalRef2.current.classList.remove("slide-out-bottom");
                                }, 300);
                                setTimeout(() => {
                                    setShowModal(false);
                                    setShowPayment(false);
                                }, 301);
                            }}
                        >
                            {" "}
                            {showPayment ? <Kaufen product={post}></Kaufen> : <Anfrage sold={post.sold} />}
                        </Modal>
                    )}

                    <Overlay
                        onClick={(e) => {
                            setShowModal(false);
                            setShowPayment(false);
                        }}
                    ></Overlay>
                </>
            ) : null}
            <NavButtonsBig
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
            ></NavButtonsBig>
            <ContainerStandard klasse="gap-1 sm:gap-2 md:px-6 pt-12 md:pt-20 md:pb-20  lg:min-h-screen">
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
                    className={`col-span-12 lg:col-span-8 flex flex-col justify-center z-30 ${
                        imageLoaded ? "fade-in" : ""
                    }  relative bg-cover aspect-w-16 aspect-h-9 sm:h-64 lg:h-full transition-all duration-300 ease-in-out`}
                    ref={containerRef}
                    style={{ backgroundImage: isDesktop ? "" : `url(${urlFor(post.image).url()})` }}
                >
                    {post.image && (
                        <div {...handlers} className={`absolute top-0 left-0 w-full h-full ${imageLoaded ? "" : ""}`}>
                            <Image // {...ImagePropsGallery(i)}
                                src={urlFor(post.image).url()}
                                layout="fill"
                                objectFit="contain"
                                alt="hero"
                                className={`z-10  ${imageLoaded ? "fade-in  " : ""}`}
                                onLoad={() => {
                                    console.log("LOADED");
                                    setImageLoaded(true);
                                }}
                                ref={imgRef}
                                priority
                                style={{
                                    transform: `translateX(${x}px) scale(${1 - Math.abs(x) / 1000})`,
                                    opacity: `${1 - Math.abs(x) / 10}`,
                                }}
                            />
                        </div>
                    )}{" "}
                </motion.div>
                <div className="fixed right-[-30%] top-0 h-full opacity-[0.6]">
                    <img src={HugeLogo.src} alt="" />
                </div>
                <div
                    data-aos="fade-up"
                    ref={boxRef}
                    className="col-span-12 z-30 flex flex-col justify-center lg:col-span-4 px-4 md:px-0 mt-2 lg:pl-6 xl:pl-10 lg:pt-0"
                >
                    <h2 className="font-thin font-serif  text-3xl md:text-3xl lg:text-5xl xl:text-6xl tracking-wide mb-4">
                        {post.titel_Bild}
                    </h2>
                    <p className=" text-sm xl:text-lg ">{post.year}</p>
                    {/* <p className="font-regular text-sm md:text-lg mt-2 ">{post.description}</p> */}
                    <p className="font-regular text-sm xl:text-lg">{post.technik}</p>
                    <div className="mt-6 lg:mt-0">
                        <CheckboxContainer1
                            onCheckboxClick={(e) => {
                                e.target.value === "original" ? setOriginal(true) : setOriginal(false);
                                e.target.value === "original" ? null : setDruckPreis(post.druckeInfos.titel);
                                console.log(e.target.value);
                            }}
                        ></CheckboxContainer1>
                        {original ? (
                            <div className="details text-xs  xl:text-base mt-6">
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3  lg:mr-4">Dimensionen</div>
                                    <div className="right w-2/3 ">{post.dimensions}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3  lg:mr-4">Location</div>
                                    <div className="right w-2/3">{post.location}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3  lg:mr-4">Verfügbarkeit</div>
                                    <div className="right w-2/3">
                                        {post.sold ? (
                                            <span className=" text-[#FB5012]">Verkauft</span>
                                        ) : (
                                            <span className=" text-[#60b862]">Verfügbar</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="details text-xs xl:text-base mt-6">
                                <hr />
                                <div className="flex py-2 items-center">
                                    <div className="left w-1/3 ">Dimensionen</div>
                                    <div className="right">
                                        <select
                                            id="printSelect"
                                            name="printSelect"
                                            className="bg-white border p-2"
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
                                            <option className="px-8" value="druck1" defaultValue>
                                                {" "}
                                                {post.dimensions} (Originalgröße)
                                            </option>
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
                                    <div className="left w-1/3 ">Lieferzeit</div>
                                    <div className="right">3-5 Werktage</div>
                                </div>
                                <hr />
                            </div>
                        )}
                    </div>
                    <div className="preis mt-6">
                        <div className="original text-xs xl:text-base text-primaryColor-700">
                            {" "}
                            {original ? "ORIGINAL" : "PRINT"}
                        </div>
                        <div className="sum text-lg xl:text-2xl ">
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
                                    isMobile
                                        ? modalRef.current.classList.remove("slide-in-bottom")
                                        : modalRef2.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className="border border-blackText  hover-underline-animation  flex items-center justify-center text-blackText mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full max-w-[100%]  uppercase rounded-md"
                        >
                            <span className=""> Anfragen</span>
                        </button>

                        <button
                            disabled={disabled}
                            onClick={(e) => {
                                setShowModal(true);
                                setShowPayment(true);

                                // modalRef.current.classList.add("slide-in-bottom");
                                setTimeout(() => {
                                    isMobile
                                        ? modalRef.current.classList.remove("slide-in-bottom")
                                        : modalRef2.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className={`bg-blackText hover-underline-animation  flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full max-w-[100%]  uppercase rounded-md ${
                                disabled ? "opacity-30" : ""
                            }`}
                        >
                            <span className=""> Kaufen</span>
                        </button>
                    </div>
                    <div className="mt-6 lg:hidden">
                        <PaymentIconsContainer></PaymentIconsContainer>
                    </div>
                    <div className="mt-8 lg:hidden">
                        <InfoBox1></InfoBox1>
                    </div>
                </div>
            </ContainerStandard>
        </>
    );
}
