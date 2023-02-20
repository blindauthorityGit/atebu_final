import client, { getAsset } from "../../client";
import Image from "next/image";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPS
import { Menu1 } from "../../components/menues";
import { ContainerStandard } from "../../components/container";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../../components/menues/config";
import Logo from "../../assets/logoFin.svg";

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
                <Menu1
                    logo={Logo.src}
                    menuItems={menuItems}
                    socialMedia={socialMedia}
                    burgerIcon={<RxHamburgerMenu />}
                    onBurgerClick={(e) => {
                        console.log(e);
                    }}
                ></Menu1>
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
                    <div className="col-span-12 px-4">
                        <h2 className="font-bold uppercase text-2xl tracking-widest">{post.titel_Bild}</h2>
                    </div>
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
