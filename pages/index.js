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
import { ContainerVH100, ContainerVH100Children, ContainerVH100Children2 } from "../components/container";
import { HeroSlider1 } from "../components/HeroSlider";
import { FloaterTop, FloaterContact, FloaterBlackFull } from "../components/floaters";
import { ImgText1, ImgText2, ImgText3 } from "../components/imgText";
import { Thumbnail1 } from "../components/imgThumbnails";
import { EventSlider1 } from "../components/elementSliders";
import { BlogGrid1 } from "../components/elementGrid";
// import { Vita } from "../components/collapsables";
const Vita = dynamic(() => import("../components/collapsables/vita"), {
    ssr: false,
});

// FUNCTIONS
import shuffleArray from "../components/functions/shuffleArray";

export default function Home({ dataBilder, dataAkademie, dataChristine, dataBlog, dataLeistungen }) {
    useEffect(() => {
        console.log(dataBilder, dataAkademie, dataChristine, dataBlog, dataLeistungen);
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
                                    date={e.datum}
                                    image={e.image}
                                ></Thumbnail1>
                            );
                        })}
                    </div>
                </ImgText1>
            </ContainerVH100>
            <ContainerVH100 klasse="" showBG center>
                <ImgText2 data={dataLeistungen} images={dataLeistungen[0].images}></ImgText2>
            </ContainerVH100>
            <ContainerVH100Children klasse="bg-blackText" showBG center image={dataChristine[0].image}>
                <ImgText3></ImgText3>
            </ContainerVH100Children>
            <Vita text={dataChristine[0].text}></Vita>

            <ContainerVH100 klasse="" showBG>
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

    return {
        props: {
            dataBilder,
            dataAkademie,
            dataChristine,
            dataBlog,
            dataLeistungen,
        },
        revalidate: 1, // 10 seconds
    };
};
