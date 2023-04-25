import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { config } from "./config";
import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";

//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

//COMPS
import { MainButtonNOLink, GhostButton } from "../buttons";

const KurseTxtImg = (props) => {
    const ref = useRef(null);
    const floaterRef = useRef(null);

    // const { scrollYProgress } = useScroll();
    const { scrollY } = useScroll();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    // BREADCRUMBS
    const [linkList, setLinkList] = useState([
        {
            title: "Home",
            link: "/",
        },
        {
            title: "Kurse",
            link: "/kurse",
        },
    ]);

    useEffect(() => {
        setLinkList((prev) => [...prev, { title: props.data.akademieTitel, link: props.data.slug.current }]);
        // setUrl(window.location.href);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
        console.log(props.images);
    }, []);

    return (
        <div ref={ref} className={`col-span-12   ${props.colspan}`}>
            {" "}
            <motion.div
                style={{ opacity: scrollYProgress }}
                data-aos="fade-right"
                className={`left h-64 sm:h-auto md:h-[20rem] sm:block mb-8 lg:mb-0 col-span-12 order-first lg:order-last lg:col-span-7 relative   lg:h-auto ${props.order}`}
            >
                <Image
                    // {...ImagePropsGallery(i)}
                    src={props.image}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    alt="hero"
                    className="z-10"
                />
                <div
                    style={{ left: scrollYProgress }}
                    className="bgOverlay absolute md:hidden bg-primaryColor opacity-20 w-full h-full md:left-[1.85rem] lg:left-[-2rem] top-[-2rem]"
                ></div>
            </motion.div>
            <div className="right px-8 sm:px-0 md:px-12 col-span-12 lg:col-span-5 flex flex-col justify-center ">
                <div
                    data-aos="fade-up"
                    className="font-montserrat md:max-w-[80%]  text-blackText mt-4 lg:mt-0 sm:font-semibold tracking-wide leading-relaxed sm:leading-loose lg:leading-relaxed text-sm sm:text-base lg:text-2xl text-textBlack-100 mb-4"
                >
                    <div className="datum bg-primaryColor-300 py-2 text-center md:text-lg font-bold text-primaryColor-900 absolute w-full md:w-[60%] rounded-md top-[-4rem] md:top-[-5rem]">
                        {props.data.datum}
                    </div>
                    {props.breadcrumbs ? <Breadcrumbs links={linkList} /> : null}
                    <h2 className="font-thin mt-4 font-serif tracking-wider  text-3xl md:text-3xl mb-2">
                        {props.data.akademieTitel}
                    </h2>
                    <hr className="border-primaryColor mb-4" />
                    <h4 className="mt-2 text-lg font-bold">{props.data.thema}</h4>
                    <h4 className="font-regular mb-8 leading-normal mt-2">{props.data.headline}</h4>{" "}
                    <div className="ablaufTop flex mt-4 mb-4 md:mb-4">
                        <div className="left text-xs font-bold w-1/4">Ablauf:</div>
                        <div className="right border-b border-primaryColor w-full "></div>
                    </div>
                    {props.data.ablauf.map((e, i) => {
                        return (
                            <div key={`kurskey${i}`}>
                                <div key={`kurskey${i}`} className="ablaufTop flex text-xs font-regular mb-2 md:mb-3">
                                    <div className="left text-xs font-bold w-1/4">{e.TAG}</div>
                                    <div className="right  w-full pl-4">{e.Beschreibung}</div>
                                </div>
                            </div>
                        );
                    })}
                    <hr className="border-primaryColor mt-4 md:mt-4" />
                    <div className="kosten mt-8">
                        <div className="top text-primaryColor-700">KOSTEN</div>
                        <div className="sum font-bold text-xl md:text-3xl">{props.data.price}*</div>
                        <div className="text-xs text-primaryColor-800 font-thin">
                            *Preis exkl. Mittagsessen und Material
                        </div>
                    </div>
                </div>

                {props.children}
                {/* <div className="text font-serif">{parse(config.text)}</div> */}
                {props.button ? (
                    <div className="grid grid-cols-12 w-full gap-2 mb-6">
                        {" "}
                        {/* <Link href={props.link}>
                            <button className="hover-underline-animation col-span-12 md:col-span-6 border font-bold border-primaryColor-300 flex items-center justify-center text-primaryColor-300 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-8">
                                <span className="text-primaryColor-300"> MEHR</span>
                            </button>
                        </Link> */}
                        <GhostButton link={props.link}>Mehr Infos</GhostButton>
                        <MainButtonNOLink onClick={props.buchenClick} id={props.id}>
                            Buchen
                        </MainButtonNOLink>
                        {/* <button
                            onClick={props.buchenClick}
                            id={props.id}
                            className="hover-underline-animation col-span-12 md:col-span-6  bg-primaryColor-500 font-bold flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6  uppercase rounded-md md:mt-8"
                        >
                            <span className="text-primaryColor-50"> Buchen</span>
                        </button> */}
                    </div>
                ) : null}
            </div>
            <style jsx>{`
                .hover-underline-animation span {
                    display: inline-block;
                    position: relative;
                  
                }

                .hover-underline-animation span::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: black;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                }

                .hover-underline-animation:hover span::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
          
            `}</style>
        </div>
    );
};

export default KurseTxtImg;
