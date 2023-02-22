import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
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
import { ContainerVH100, ContainerVH100Children, ContainerVH100Children2 } from "../components/container";
import { HeroSlider1 } from "../components/HeroSlider";
import { FloaterTop, FloaterContact, FloaterBlackFull } from "../components/floaters";
import { ImgText1, ImgText2, ImgText3 } from "../components/imgText";
import { Thumbnail1 } from "../components/imgThumbnails";
import { EventSlider1 } from "../components/elementSliders";

export default function Home({ dataBilder, dataAkademie, dataChristine, dataBlog }) {
    useEffect(() => {
        console.log(dataBilder, dataAkademie, dataChristine, dataBlog);
        AOS.init({
            duration: 1200,
        });
    }, []);
    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>

            <ContainerVH100 hFull first>
                <HeroSlider1 dataAos="fade-up" data={dataBilder}></HeroSlider1>
                <FloaterTop></FloaterTop>
                <FloaterContact></FloaterContact>
            </ContainerVH100>
            <ContainerVH100 klasse="bg-blackText" showBG center>
                <ImgText1 link="/kurse">
                    <div className="grid grid-cols-12 gap-1 sm:gap-4 h-full">
                        {dataAkademie.map((e, i) => {
                            console.log(e.slug.current);
                            return (
                                <Thumbnail1
                                    dataAos="fade-in-color grayscale"
                                    motto={e.thema}
                                    link={`/kurse/${e.slug.current}`}
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
            <ContainerVH100 klasse="" showBG center>
                <FloaterBlackFull></FloaterBlackFull>

                <EventSlider1 data={dataBlog}></EventSlider1>
            </ContainerVH100>
            <ContainerVH100Children2
                klasse="bg-blackText"
                showBG
                center
                image={dataChristine[0].image}
            ></ContainerVH100Children2>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resBilder = await client.fetch(`*[_type in ["Bild"]]`);
    const dataBilder = await resBilder;

    const resAkademie = await client.fetch(`*[_type in ["akademie"]] `);
    const dataAkademie = await resAkademie.sort((a, b) => {
        const aMonth = Number(a.datum.split(".")[1]);
        const bMonth = Number(b.datum.split(".")[1]);
        return aMonth - bMonth;
    });

    const resChristine = await client.fetch(`*[_type in ["christine"]]`);
    const dataChristine = await resChristine;

    const resBlog = await client.fetch(`*[_type == "blogPost"] {
        title,
        slug,
        body,
        date,
        featuredImage,
        author-> {
          name,
          email,
          bio,
          "avatarUrl": avatar.asset->url
        }
      }`);
    const dataBlog = await resBlog;

    return {
        props: {
            dataBilder,
            dataAkademie,
            dataChristine,
            dataBlog,
        },
        revalidate: 1, // 10 seconds
    };
};
