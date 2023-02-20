import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import MainContainer from "../../components/layout/mainContainer";
import Hero from "../../components/Hero/hero";
import { useNextSanityImage } from "next-sanity-image";

//SANITY
import client from "../../client";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../../components/menues/config";
import Logo from "../../assets/logoFin.svg";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";
import { Menu1 } from "../../components/menues";
// import { HeroSlider1 } from "../components/HeroSlider";
// import { FloaterTop, FloaterContact, FloaterBlackFull } from "../components/floaters";
// import { ImgText1, ImgText2, ImgText3 } from "../components/imgText";
// import { Thumbnail1 } from "../components/imgThumbnails";
// import { EventSlider1 } from "../components/elementSliders";
// import { MobileBar1 } from "../components/mobileBar";

import urlFor from "../../components/functions/urlFor";

export default function Galerie({ dataBilder, dataAkademie, dataChristine, dataBlog }) {
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
            <Menu1
                logo={Logo.src}
                menuItems={menuItems}
                socialMedia={socialMedia}
                burgerIcon={<RxHamburgerMenu />}
                onBurgerClick={(e) => {
                    console.log(e);
                }}
            ></Menu1>
            <ContainerStandard klasse="gap-1 sm:gap-2 pt-20">
                {dataBilder.map((e, i) => {
                    return (
                        <div className="col-span-6 sm:col-span-3  relative h-32 sm:h-64">
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(e.image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="cover"
                                alt="hero"
                                className="z-10"
                            />
                        </div>
                    );
                })}
            </ContainerStandard>
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
