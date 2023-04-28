import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

//SANITY
import client from "../client";

//ASSETS
import { Stoerer1 } from "../components/stoerer";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import {
    ContainerVH100,
    ContainerVH100Children,
    ContainerVH100Children2,
    ContainerStandard,
    ContainerFullBG,
} from "../components/container";
import { HeroSlider1, HeroSliderDesktop } from "../components/HeroSlider";
import { FloaterTop, FloaterContact, FloaterBlackFull } from "../components/floaters";
import { ImgText1, ImgText2, ImgText3 } from "../components/imgText";
import { Thumbnail2 } from "../components/imgThumbnails";
import { Contact } from "../components/sections";
import { BlogGrid1 } from "../components/elementGrid";
// import { Vita } from "../components/collapsables";
const Vita = dynamic(() => import("../components/collapsables/vita"), {
    ssr: false,
});

// FUNCTIONS
import shuffleArray from "../components/functions/shuffleArray";
import useBreakpoints from "../components/functions/useBreakPoints";

export default function Home({ dataBilder, dataAkademie, dataChristine, dataBlog, dataLeistungen, dataSetting }) {
    useEffect(() => {
        console.log(dataBilder, dataAkademie, dataChristine, dataBlog, dataLeistungen, dataSetting);
        console.log(Array.from(new Set(dataLeistungen[0].leistungen.map((e) => e.category))));
        AOS.init({
            duration: 1200,
        });
    }, []);

    // BREAKPOINTS
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>

            <ContainerVH100 hFull first>
                {isDesktop ? (
                    <HeroSliderDesktop dataAos="fade-up" data={dataBilder}></HeroSliderDesktop>
                ) : (
                    <HeroSlider1 dataAos="fade-up" data={dataBilder}></HeroSlider1>
                )}
                {/* <HeroSlider1 dataAos="fade-up" data={dataBilder}></HeroSlider1> */}
                <FloaterTop></FloaterTop>
                <FloaterContact></FloaterContact>
            </ContainerVH100>
            <ContainerFullBG>
                <ContainerStandard klasse="bg-brightBG lg:h-auto col-span-12 overflow-hidden" showBG>
                    <ImgText1 colspan="col-span-12 py-16" link="/kurse">
                        <div className="grid grid-cols-12 gap-1 sm:gap-4 h-full">
                            {dataAkademie.map((e, i) => {
                                console.log(e.slug.current);
                                return (
                                    <Thumbnail2
                                        dataAos="fade-in-color grayscale"
                                        motto={e.thema}
                                        link={`/kurse/${e.slug.current}`}
                                        date={e.datum}
                                        image={e.image}
                                        titel={e.akademieTitel}
                                    ></Thumbnail2>
                                );
                            })}
                        </div>
                    </ImgText1>
                </ContainerStandard>
            </ContainerFullBG>
            <ContainerVH100 klasse=" lg:h-auto col-span-12 " showBG>
                <ImgText2 data={dataLeistungen} images={dataLeistungen[0].images}></ImgText2>
            </ContainerVH100>
            <ContainerVH100Children klasse="bg-blackText" showBG center image={dataChristine[0].image}>
                <ImgText3></ImgText3>
            </ContainerVH100Children>
            <Vita text={dataChristine[0].text}></Vita>

            <ContainerVH100 klasse="overflow-hidden" showBG>
                <FloaterBlackFull></FloaterBlackFull>
                <h2
                    data-aos="fade-left"
                    className="font-serif px-8 text-2xl sm:text-4xl text-blackText lg:text-6xl font-semibold mt-0 tracking-widest mb-4 lg:mb-12"
                >
                    BLOG
                </h2>
                <BlogGrid1 data={dataBlog}></BlogGrid1>
            </ContainerVH100>
            <div className="h-10"></div>
            <Stoerer1></Stoerer1>
            <Contact data={dataSetting}></Contact>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resBilder = await client.fetch(`*[_type in ["Bild"]]`);
    const dataBilder = await shuffleArray(resBilder);

    const resLeistungen = await client.fetch(`*[_type in ["leistungen"]]`);
    const dataLeistungen = await resLeistungen;

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

    const resSetting = await client.fetch(`
    *[_type == "settings"][0] 
  `);
    const dataSetting = await resSetting;

    return {
        props: {
            dataBilder,
            dataAkademie,
            dataChristine,
            dataBlog,
            dataLeistungen,
            dataSetting,
        },
        revalidate: 1, // 10 seconds
    };
};
