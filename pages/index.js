import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MainContainer from "../components/layout/mainContainer";
import Hero from "../components/Hero/hero";
import { useNextSanityImage } from "next-sanity-image";

//SANITY
import client from "../client";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logoFin.svg";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerVH100, ContainerVH100Children } from "../components/container";
import { Menu1 } from "../components/menues";
import { HeroSlider1 } from "../components/HeroSlider";
import { FloaterTop } from "../components/floaters";
import { FloaterContact } from "../components/floaters";
import { ImgText1, ImgText2, ImgText3 } from "../components/imgText";
import { Thumbnail1 } from "../components/imgThumbnails";

export default function Home({ dataBilder, dataAkademie, dataChristine }) {
    useEffect(() => {
        console.log(dataBilder, dataAkademie, dataChristine);
        AOS.init({
            duration: 1200,
        });
    }, []);
    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>
            <Menu1
                logo={Logo.src}
                menuItems={menuItems}
                socialMedia={socialMedia}
                burgerIcon={<RxHamburgerMenu />}
                onBurgerClick={(e) => {
                    console.log(e);
                }}
            ></Menu1>
            <ContainerVH100 hFull>
                <HeroSlider1 dataAos="fade-up" data={dataBilder}></HeroSlider1>

                <FloaterTop></FloaterTop>
                <FloaterContact></FloaterContact>
            </ContainerVH100>
            <ContainerVH100 klasse="bg-blackText" showBG center>
                <ImgText1>
                    <div className="grid grid-cols-12 gap-4 h-full">
                        {dataAkademie.map((e, i) => {
                            return (
                                <Thumbnail1
                                    dataAos="flip-up"
                                    motto={e.thema}
                                    link="#"
                                    date={e.datumShort}
                                    image={e.image}
                                ></Thumbnail1>
                            );
                        })}
                    </div>
                </ImgText1>
            </ContainerVH100>
            <ContainerVH100 klasse="" showBG center>
                <ImgText2 images={dataBilder}></ImgText2>
            </ContainerVH100>
            <ContainerVH100Children klasse="bg-blackText" showBG center image={dataChristine[0].image}>
                <ImgText3></ImgText3>
            </ContainerVH100Children>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resBilder = await client.fetch(`*[_type in ["Bild"]]`);
    const dataBilder = await resBilder;

    const resAkademie = await client.fetch(`*[_type in ["akademie"]]`);
    const dataAkademie = await resAkademie;

    const resChristine = await client.fetch(`*[_type in ["christine"]]`);
    const dataChristine = await resChristine;

    return {
        props: {
            dataBilder,
            dataAkademie,
            dataChristine,
        },
        revalidate: 1, // 10 seconds
    };
};
