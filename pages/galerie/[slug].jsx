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
import { Stoerer1 } from "../../components/stoerer";

// functions
import { useBreakpoints } from "../../components/functions/useBreakPoints";

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
    // BREAKPOINTS
    const { isMobile, isTablet, isDesktop } = useBreakpoints();

    const containerRef = useRef(null);

    useEffect(() => {
        console.log(isMobile, isTablet, isDesktop);
    }, [isMobile, isTablet, isDesktop]);

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
                console.log(container.children[0]);
                if (isTablet && ratio > 100) {
                    container.style.paddingBottom = "100%";
                    container.children[0].classList.add("backdrop-blur-lg");
                } else if (ratio > 123) {
                    container.style.paddingBottom = "123%";
                    container.children[0].classList.add("backdrop-blur-lg");
                } else {
                    container.style.paddingBottom = ratio + "%";
                    container.children[0].classList.add("backdrop-blur-lg");
                }
                if (!image.complete) {
                    const handleLoad = () => {
                        const aspectRatio = image.naturalWidth / image.naturalHeight;
                        container.style.paddingBottom = `${100 / aspectRatio}%`;
                        const ratio = 100 / aspectRatio;
                        if (isTablet && ratio > 100) {
                            container.style.paddingBottom = "100%";
                        } else if (ratio > 123) {
                            container.style.paddingBottom = "123%";
                        } else {
                            container.style.paddingBottom = ratio + "%";
                        }
                        image.removeEventListener("load", handleLoad);
                    };
                    image.addEventListener("load", handleLoad);
                }
            }
        }, 50);
    }, [post, isTablet, isMobile]);

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
                <ContainerStandard klasse="gap-1 lg:gap-2 pt-12 md:px-6">
                    {dataAll.map((e, i) => {
                        return (
                            <div className="col-span-6 sm:col-span-4 relative h-36 sm:h-64 md:h-48">
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
                <div className="h-10"></div>
                <Stoerer1></Stoerer1>
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

    return {
        props: {
            post: data[0],
            dataAll,
        },
        revalidate: 1, // 10 seconds
    };
};
