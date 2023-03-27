import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import MainContainer from "../../components/layout/mainContainer";
import Hero from "../../components/Hero/hero";
import { useNextSanityImage } from "next-sanity-image";

// COMPS
import { BlogGridFull } from "../../components/elementGrid";
import { Stoerer1 } from "../../components/stoerer";

//SANITY
import client from "../../client";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";

import urlFor from "../../components/functions/urlFor";

export default function Blog({ dataBilder, dataAkademie, dataChristine, dataBlog }) {
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
            <ContainerStandard klasse="gap-1 lg:gap-2 pt-20 md:px-12 ">
                <div className="col-span-12">
                    <h2
                        data-aos="fade-left"
                        className="font-serif px-8 text-2xl sm:text-4xl text-blackText lg:text-6xl font-semibold mt-0 tracking-widest mb-4 lg:mb-12"
                    >
                        NEWS
                    </h2>
                    <BlogGridFull data={dataBlog}></BlogGridFull>
                </div>
            </ContainerStandard>
            <div className="h-10"></div>
            <Stoerer1></Stoerer1>
        </>
    );
}

export const getStaticProps = async (context) => {
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

    const resSetting = await client.fetch(`*[_type in ["settings"] ]`);
    const dataSetting = await resSetting[0];
    // const dataAll = await resAll.sort((a, b) =>
    //     a._createdAt < b._createdAt ? -1 : a._createdAt > b._createdAt ? 1 : 0
    // );

    return {
        props: {
            dataSetting,
            dataBlog,
        },
        revalidate: 1, // 10 seconds
    };
};
