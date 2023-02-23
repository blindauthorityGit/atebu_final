import Detail from "../../components/pageComps/galerie/detail";
import client, { getAsset } from "../../client";
import Image from "next/image";
import Link from "next/link";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPS
import { ContainerStandard } from "../../components/container";
import { CheckboxContainer1 } from "../../components/inputs/checkmarks";
import { PaymentIconsContainer } from "../../components/iconBars";
import { InfoBox1 } from "../../components/collapsables";

// Framer motion
import { motion, useScroll, useAnimation } from "framer-motion";
//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ImageSite = ({ post, dataAll }) => {
    const [url, setUrl] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);
    // Chjeckbox state
    const [original, setOriginal] = useState(true);
    // Druck Preis State
    const [druckPreis, setDruckPreis] = useState(0);
    // CURRENT INDEX
    const [currentIndex, setCurrentIndex] = useState(null);

    const containerRef = useRef(null);

    useEffect(() => {
        console.log(dataAll.findIndex((e) => e.slug.current === post.slug.current));
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const image = container.querySelector("img");
        setDruckPreis(post.druckeInfos.titel);
        setCurrentIndex(dataAll.findIndex((e) => e.slug.current === post.slug.current));
        setTimeout(() => {
            if (image) {
                const aspectRatio = image.naturalWidth / image.naturalHeight;
                container.style.paddingBottom = `${100 / aspectRatio}%`;
                const ratio = 100 / aspectRatio;
                console.log(ratio);
                ratio > 123 ? (container.style.paddingBottom = "123%") : (container.style.paddingBottom = ratio + "%");

                if (!image.complete) {
                    const handleLoad = () => {
                        const aspectRatio = image.naturalWidth / image.naturalHeight;
                        container.style.paddingBottom = `${100 / aspectRatio}%`;
                        const ratio = 100 / aspectRatio;
                        console.log(ratio);
                        ratio > 123
                            ? (container.style.paddingBottom = "123%")
                            : (container.style.paddingBottom = ratio + "%");

                        image.removeEventListener("load", handleLoad);
                    };
                    image.addEventListener("load", handleLoad);
                }
            }
        }, 50);
    }, [post]);

    useEffect(() => {
        console.log(post, dataAll);
        setUrl(window.location.href);

        AOS.init({
            duration: 800,
        });
    }, [dataAll, post]);

    return (
        <>
            <>
                <Head>
                    {/* <title>{post?.seo?.mainSEO?.title ? post.seo.mainSEO.title : "PIZ 1000"}</title>
                        <meta
                            name="description"
                            content={post?.seo?.mainSEO?.description ? post.seo.mainSEO.description : ""}
                        />
                        <meta
                            name="keywords"
                            content={post?.seo?.mainSEO?.keywords ? post.seo.mainSEO.keywords.map((e) => e) : ""}
                        />
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <link rel="icon" href={Favicon.src} />
                        <meta property="og:type" content="website" />
                        <meta property="og:url" content={url} />
                        <meta
                            property="og:title"
                            content={
                                post.seo && post.seo.advancedSEO && post.seo.advancedSEO.ogTitle
                                    ? post.seo.advancedSEO.ogTitle
                                    : post.seo.mainSEO.title
                            }
                        />
                        <meta
                            property="og:image"
                            content={
                                post.seo && post.seo.advancedSEO && post.seo.advancedSEO.ogImage
                                    ? urlFor(post.seo.advancedSEO.ogImage)
                                    : null
                            }
                        />
                        <meta
                            property="og:description"
                            content={
                                post.seo && post.seo.advancedSEO && post.seo.advancedSEO.ogDescription
                                    ? post.seo.advancedSEO.ogDescription
                                    : null
                            }
                        />
                        <meta property="og:site_name" content="PIZ 1000 - Pittner Regionalmuseum" />
                        <meta property="og:locale" content="de_DE" /> */}
                </Head>

                <Detail
                    post={post}
                    containerRef={containerRef}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                    // e={e}
                    setOriginal={setOriginal}
                    setDruckPreis={setDruckPreis}
                    original={original}
                    druckPreis={druckPreis}
                    currentIndex={currentIndex}
                    dataAll={dataAll}
                />
                <ContainerStandard klasse="gap-1 sm:gap-2 pt-20">
                    {dataAll.map((e, i) => {
                        return (
                            <div className="col-span-6 sm:col-span-4  relative h-32 sm:h-64">
                                <Link href={`/galerie/${e.slug.current}`}>
                                    <Image
                                        // {...ImagePropsGallery(i)}
                                        src={urlFor(e.image).url()}
                                        layout="fill"
                                        loading="lazy"
                                        objectFit="cover"
                                        alt="hero"
                                        className="z-10 kriu"
                                    />
                                </Link>
                            </div>
                        );
                    })}
                </ContainerStandard>
            </>
        </>
    );
};

export default ImageSite;

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["Bild"] ]`);
    const data = await res;

    const paths = data.map((e) => {
        return {
            params: { slug: e.slug.current },
        };
    });
    return {
        paths,
        fallback: false,
        // fallback: process.env.NEXT_DEV === "true" ? false : true,
    };
};

export const getStaticProps = async (context) => {
    const slug = context.params.slug;
    const res = await client.fetch(`*[_type == "Bild" && slug.current == "${slug}"] 
    `);
    const data = await res;

    const resAll = await client.fetch(`*[_type in ["Bild"] ]`);
    const dataAll = await resAll;
    // const dataAll = await resAll.sort((a, b) =>
    //     a._createdAt < b._createdAt ? -1 : a._createdAt > b._createdAt ? 1 : 0
    // );

    return {
        props: {
            post: data[0],
            dataAll,
        },
        revalidate: 1, // 10 seconds
    };
};
