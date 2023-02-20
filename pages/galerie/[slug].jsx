import client, { getAsset } from "../../client";
import Image from "next/image";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPS
import { ContainerStandard } from "../../components/container";
import { CheckboxContainer1 } from "../../components/inputs/checkmarks";

// Framer motion
import { motion, useScroll, useAnimation } from "framer-motion";
//ImageBuilder
import myConfiguredSanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
import { spanToPlainText } from "@portabletext/toolkit";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
    return builder.image(source);
}

const ImageSite = ({ post, dataAll }) => {
    const [url, setUrl] = useState("");
    const [imageLoaded, setImageLoaded] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = container.querySelector("img");

        if (image) {
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            container.style.paddingBottom = `${100 / aspectRatio}%`;

            if (!image.complete) {
                const handleLoad = () => {
                    const aspectRatio = image.naturalWidth / image.naturalHeight;
                    container.style.paddingBottom = `${100 / aspectRatio}%`;
                    image.removeEventListener("load", handleLoad);
                };
                image.addEventListener("load", handleLoad);
            }
        }
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

                <ContainerStandard klasse="gap-1 sm:gap-2 pt-12">
                    <motion.div
                        // layoutId="hero"
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
                        className="col-span-12 relative aspect-w-16 aspect-h-9 sm:h-64"
                        ref={containerRef}
                    >
                        {post.image && (
                            <Image
                                // {...ImagePropsGallery(i)}
                                src={urlFor(post.image).url()}
                                layout="fill"
                                loading="lazy"
                                objectFit="contain"
                                alt="hero"
                                className={`z-10 ${imageLoaded ? "fade-in-fwd" : "hidden"}`}
                                onLoad={() => setImageLoaded(true)}
                            />
                        )}{" "}
                    </motion.div>
                    <div className="col-span-12 px-4 mt-2">
                        <h2 className="font-bold uppercase text-xl tracking-wide">{post.titel_Bild}</h2>
                        <p className="font-semibold text-sm mt-2">{post.year}</p>
                        <p className="font-regular text-sm mt-2">{post.description}</p>
                        <p className="font-regular text-sm mt-2">{post.technik}</p>
                        <div className="mt-4">
                            <CheckboxContainer1
                                onCheckboxClick={(e) => {
                                    console.log(e);
                                }}
                            ></CheckboxContainer1>
                            <div className="details text-xs mt-4">
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Dimensionen</div>
                                    <div className="right">{post.dimensions}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Location</div>
                                    <div className="right">{post.location}</div>
                                </div>
                                <hr />
                                <div className="flex py-2">
                                    <div className="left w-1/3 font-semibold">Verfügbarkeit</div>
                                    <div className="right">
                                        {post.sold ? (
                                            <span className="font-semibold text-[#FB5012]">Verkauft</span>
                                        ) : (
                                            <span className="font-semibold text-[#60b862]">Verfügbar</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerStandard>
                <ContainerStandard klasse="gap-1 sm:gap-2 pt-20">
                    {dataAll.map((e, i) => {
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
