import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { motion, useAnimation } from "framer-motion";
import Logo from "../../assets/logoWhite.svg";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";

const Mobile1 = (props) => {
    const [showMenu, setShowMenu] = useState(props.showMenu);
    const { asPath } = useRouter();

    const burgerRef = useRef();

    function clicker(e) {
        console.log("Clicked");
    }

    // useEffect(() => {
    //     props.showMenu(false);
    // }, [asPath]);

    const boxMotion = {
        rest: {
            opacity: 0,
            display: "none",
            ease: "easeOut",
            duration: 0.2,
            type: "spring",
            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeIn",
            },
        },

        end: {
            opacity: 1,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
    };

    const textMotion = {
        rest: {
            x: -50,
            opacity: 0,

            transition: {
                duration: 2.85,
                type: "tween",
                ease: "easeIn",
            },
        },
        end: {
            opacity: 1,
            x: 0,
            display: "block",
            transition: {
                duration: 0.4,
                type: "spring",
                ease: "easeIn",
            },
        },
        hover: {
            // color: "blue",
            x: 0,
            opacity: 1,

            transition: {
                duration: 0.5,
                type: "tween",
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            <motion.nav
                variants={boxMotion}
                className={`navbar slide-in-right ${props.klasse} 
                 w-full h-screen bg-blackText fixed z-50 top-0 `}
            >
                <div onClick={props.onClick} className="closer absolute right-8 top-16">
                    <GrClose></GrClose>
                </div>
                <div className="container h-screen py-12 px-12 font-europa tracking-wider">
                    <div className="middle flex justify-center">
                        <Link href="/">
                            <a>
                                <img src={Logo.src} width="64" alt="Logo" />
                            </a>
                        </Link>
                    </div>
                    <div className="MenuItems text-2xl sm:text-4xl pt-4 font-oswald ">
                        <motion.ul variants={boxMotion} className="">
                            <motion.li variants={textMotion} className="mb-4">
                                <div className="wrap dropdown   ">
                                    <a className="text-text block my-4 subNav relative hover:text-primaryColor cursor-pointer">
                                        Museum{" "}
                                    </a>
                                    <hr />
                                    <ul className="pl-8 mt-4 mb-4">
                                        <Link href="/about">
                                            <li className="mb-4">Über uns</li>
                                        </Link>
                                        <Link href="/sammlungen">
                                            <li className="mb-4">Sammlungen</li>
                                        </Link>
                                        <Link
                                            href="https://atelierbuchner.at/piz1000/Museumsleitbild.pdf"
                                            target="_blank"
                                        >
                                            <li className="mb-4">Leitbild</li>
                                        </Link>
                                        <Link href="/kontakt">
                                            <li className="mb-4">Kontakt</li>
                                        </Link>
                                    </ul>
                                    <hr />
                                    <Link href="./besuch">
                                        <a className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer">
                                            Besuch
                                        </a>
                                    </Link>
                                </div>
                            </motion.li>
                            <li className="mr-8 hover:text-primaryColor hover:underline mb-4">
                                <Link href="/events">
                                    <a>Programm</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontakt">
                                    <a>Kontakt</a>
                                </Link>
                            </li>
                        </motion.ul>
                        <hr className="mt-6" />
                        <ul className="tracking-widest">
                            <li className="mb-4 mt-8 text-sm">
                                <div className="wrap dropdown bg-white  ">
                                    <Link href="/impressum">
                                        <a className="text-text block my-4 subNav relative hover:text-primaryColor cursor-pointer">
                                            Impressum
                                        </a>
                                    </Link>

                                    <Link href="/datenschutz">
                                        <a className="text-text block my-4 subNav relative mt-4 hover:text-primaryColor cursor-pointer">
                                            Datenschutzerklärung
                                        </a>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* <div className="Kontakt flex mt-10">
                        <div className="left w-1/2">
                            <H4>Kontakt</H4>
                            <div className="content text-xs leading-relaxed">
                                <div> {props.strasse}</div>
                                <div> {props.ort}</div>
                                <div className="mt-4">{props.phone}</div>
                                <div>
                                    {" "}
                                    <a href="mailto:contacts@german-aesthetics.de"> {props.email}</a>
                                </div>
                            </div>
                        </div>
                        <div className="right w-1/2">
                            <H4>Praxiszeiten</H4>

                            <div className="wrapper flex  text-xs leading-relaxed">
                                <div className="left mr-6 text-left ">
                                    Mo
                                    <br />
                                    Di
                                    <br />
                                    Mi
                                    <br />
                                    Do
                                    <br />
                                    Fr
                                    <br />
                                </div>
                                <div className="right text-left">
                                    <PortableText value={props.value} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </motion.nav>
        </>
    );
};

export default Mobile1;
