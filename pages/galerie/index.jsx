import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import MainContainer from "../../components/layout/mainContainer";
import Hero from "../../components/Hero/hero";
import { useNextSanityImage } from "next-sanity-image";

//SANITY
import client from "../../client";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";

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
            <ContainerStandard klasse="gap-1 lg:gap-2 pt-12 md:px-12">
                {dataBilder.map((e, i) => {
                    return (
                        <div className="col-span-6 sm:col-span-4 relative h-32 sm:h-64 md:h-48">
                            <Link href={`/galerie/${e.slug.current}`}>
                                <div className="relative w-full h-full">
                                    <Image
                                        // {...ImagePropsGallery(i)}
                                        src={urlFor(e.image).url()}
                                        layout="fill"
                                        loading="lazy"
                                        objectFit="cover"
                                        alt="hero"
                                        className="z-10 transition duration-300 ease-in-out transform hover:scale-110 focus:scale-110 hover:brightness-105 focus:brightness-105"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out hover:opacity-50 focus:opacity-50"></div>
                                </div>
                            </Link>
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
