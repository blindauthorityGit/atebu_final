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
import LightBox from "../../components/lightbox";
import { Thumbnail2 } from "../../components/imgThumbnails";
import { MainButtonNOLink } from "../../components/buttons";

// LIGHTBOX

//ImageBuilder
import urlFor from "../../components/functions/urlFor";

const KursSite = ({ post, dataAll, dataSetting, dataAkademie }) => {
    const [showModal, setShowModal] = useState(false);
    const [showLightBox, setShowLightBox] = useState(false);
    const [showBuchen, setShowBuchen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const modalRef = useRef();

    const handleImageClick = (index) => {
        setLightboxIndex(index);
    };

    useEffect(() => {
        console.log(dataAkademie.filter((e) => e.akademieTitel !== post.akademieTitel));
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
                                modalRef.current.classList.remove("slide-in-bottom");

                                modalRef.current.classList.add("slide-out-bottom");
                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-out-bottom");
                                }, 300);
                                setTimeout(() => {
                                    setShowModal(false);
                                    setShowLightBox(false);
                                    setShowBuchen(false);
                                }, 301);
                            }}
                        >
                            {showLightBox && <LightBox startIndex={lightboxIndex} data={post.imageGallery} />}
                            {showBuchen && (
                                <Buchen title={post.akademieTitel} image={post.image} datum={post.datum}></Buchen>
                            )}
                        </ModalMobile>
                        <Overlay
                            onClick={(e) => {
                                setShowModal(false);
                                setShowLightBox(false);
                                setShowBuchen(false);
                            }}
                        ></Overlay>
                    </>
                ) : null}

                <ContainerStandard klasse="gap-1 sm:gap-2 pt-12 md:pt-16 lg:mt-20 bg-brightBG">
                    <KurseTxtImg breadcrumbs image={urlFor(post.image).url()} data={post}></KurseTxtImg>;
                </ContainerStandard>
                <ContainerStandard klasse="gap-1 sm:gap-2 pt-8 sm:pt-12 ">
                    <div className="col-span-12 px-8">
                        <h2 className="font-bold uppercase text-xl md:text-3xl mb-6">Der Workshop</h2>
                        <div className="einleitung mb-12 text-sm md:mb-12 md:w-3/4">
                            <PortableText value={post.description} />
                        </div>{" "}
                        <h2 className="font-bold uppercase text-xl md:text-3xl mb-6">Beispiele / Eindrücke</h2>
                        <GallerySlider1
                            onClick={(e) => {
                                handleImageClick(Number(e.target.id));
                                setShowModal(true);
                                setShowLightBox(true);
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
                        <MainButtonNOLink
                            onClick={(e) => {
                                setShowModal(true);
                                setShowBuchen(true);

                                setTimeout(() => {
                                    modalRef.current.classList.remove("slide-in-bottom");
                                }, 300);
                            }}
                            className="hover-underline-animation  bg-blackText font-bold flex items-center justify-center text-primaryColor-200 mt-4 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 w-full uppercase rounded-md md:mt-10"
                        >
                            Buchen
                        </MainButtonNOLink>
                    </div>
                </ContainerStandard>
                <div className="grid container mx-auto text-center grid-cols-12 gap-1 sm:gap-4 h-full mt-12">
                    <h2 className="font-bold col-span-12 uppercase text-xl md:text-3xl mb-6">Weitere Kurse</h2>

                    {dataAkademie
                        .filter((e) => e.akademieTitel !== post.akademieTitel)
                        .map((e, i) => {
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

    const resAkademie = await client.fetch(`*[_type in ["akademie"]] `);
    const dataAkademie = await resAkademie.sort((a, b) => {
        const aMonth = Number(a.datum.split(".")[1]);
        const bMonth = Number(b.datum.split(".")[1]);
        return aMonth - bMonth;
    });

    return {
        props: {
            post: data[0],
            dataAll,
            dataSetting,
            dataAkademie,
        },
        revalidate: 1, // 10 seconds
    };
};
