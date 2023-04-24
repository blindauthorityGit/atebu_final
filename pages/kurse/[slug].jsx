import client, { getAsset } from "../../client";
import { PortableText } from "@portabletext/react";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";
import { KurseTxtImg } from "../../components/imgText";
import { KurseInfo, InfoSummary, GoogleMaps } from "../../components/infoBoxes";
import { GallerySlider1 } from "../../components/elementSliders";
import ModalMobile from "../../components/modal/modalMobile";
import Overlay from "../../components/modal/overlay";
import { Stoerer1 } from "../../components/stoerer";
import { Buchen } from "../../components/modalContent";
import MapboxMap from "../../components/map";
import Breadcrumbs from "../../components/Breadcrumbs";

// LIGHTBOX

//ImageBuilder
import urlFor from "../../components/functions/urlFor";

const KursSite = ({ post, dataAll, dataSetting }) => {
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef();

    useEffect(() => {
        console.log(dataSetting, post, post.imageGallery);
        console.log(post.imageGallery.map((e) => ({ src: urlFor(e).url() })));
    }, []);

    useEffect(() => {
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

                {showModal ? (
                    <>
                        <ModalMobile
                            ref={modalRef}
                            onClick={(e) => {
                                console.log(modalRef.current);
                                modalRef.current.classList.add("slide-out-bottom");
                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-out-bottom");
                                }, 300);
                                setTimeout(() => {
                                    setShowModal(false);
                                }, 301);
                            }}
                        >
                            <Buchen title={post.akademieTitel} image={post.image} datum={post.datum}></Buchen>
                        </ModalMobile>
                        <Overlay
                            onClick={(e) => {
                                setShowModal(false);
                            }}
                        ></Overlay>
                    </>
                ) : null}

                <ContainerStandard klasse="gap-1 sm:gap-2 pt-12 md:pt-16 bg-blackText">
                    <KurseTxtImg breadcrumbs image={urlFor(post.image).url()} data={post}></KurseTxtImg>;
                </ContainerStandard>
                <ContainerStandard klasse="gap-1 sm:gap-2 pt-8 sm:pt-12 ">
                    <div className="col-span-12 px-8">
                        <h2 className="font-bold uppercase text-xl md:text-3xl mb-6">Der Workshop</h2>
                        <div className="einleitung mb-12 text-sm md:mb-12 md:w-3/4">
                            <PortableText value={post.description} />
                        </div>{" "}
                        <GallerySlider1
                            onClick={(e) => {
                                console.log(Number(e.target.id));
                            }}
                            data={post.imageGallery}
                        ></GallerySlider1>
                        <KurseInfo
                            email="christine@atelierbuchner.at"
                            phone="+43 650 / 944 51 40"
                            address="Prof. Sepp Buchner-Straße 528"
                            infoText={dataSetting.kurseInfos}
                        ></KurseInfo>
                    </div>
                </ContainerStandard>

                {/* <MapboxMap></MapboxMap> */}

                <ContainerStandard klasse="gap-1 sm:gap-2 pt-6  w-full">
                    <div className="col-span-12 px-8">
                        <InfoSummary datum={post.datum} address="Galerie Buchner" price={post.price}></InfoSummary>{" "}
                        <button
                            onClick={(e) => {
                                setShowModal(true);
                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className="hover-underline-animation  bg-blackText font-bold flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 w-full uppercase rounded-md md:mt-10"
                        >
                            <span className="text-white"> Buchen</span>
                        </button>
                    </div>
                </ContainerStandard>
                <div className="h-10"></div>
                <Stoerer1></Stoerer1>
                {/* <div className="spacer h-32"></div> */}
            </>
        </>
    );
};

export default KursSite;

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["akademie"] ]`);
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
    const res = await client.fetch(`*[_type == "akademie" && slug.current == "${slug}"] 
    `);
    const data = await res;

    const resAll = await client.fetch(`*[_type in ["akademie"] ]`);
    const dataAll = await resAll;

    const resSetting = await client.fetch(`*[_type in ["settings"] ]`);
    const dataSetting = await resSetting[0];

    return {
        props: {
            post: data[0],
            dataAll,
            dataSetting,
        },
        revalidate: 1, // 10 seconds
    };
};
