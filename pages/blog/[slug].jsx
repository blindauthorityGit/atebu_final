import client, { getAsset } from "../../client";
import { PortableText } from "@portabletext/react";

import Head from "next/head";
import { useState, useEffect, useRef } from "react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";
import { BlogTxt } from "../../components/imgText";
import { KurseInfo, InfoSummary, GoogleMaps } from "../../components/infoBoxes";
import { GallerySlider1 } from "../../components/elementSliders";
import ModalMobile from "../../components/modal/modalMobile";
import Overlay from "../../components/modal/overlay";
import { Stoerer1 } from "../../components/stoerer";
import { Buchen } from "../../components/modalContent";
import MapboxMap from "../../components/map";

// LIGHTBOX

//ImageBuilder
import urlFor from "../../components/functions/urlFor";

const BlogSite = ({ post, dataAll, dataBlog }) => {
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef();

    useEffect(() => {
        console.log(post, dataBlog);
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

                <ContainerStandard klasse="gap-1 sm:gap-2 pt-12 md:pt-16">
                    <BlogTxt image={urlFor(post.featuredImage).url()} data={post} dataBlog={post}></BlogTxt>;
                </ContainerStandard>
                <ContainerStandard klasse="gap-1 sm:gap-2 pt-8 sm:pt-12 ">
                    <div className="col-span-12 px-8">
                        <h2 className="font-bold uppercase text-xl md:text-3xl mb-6">Der Workshop</h2>
                        <div className="einleitung mb-12 text-sm md:mb-12 md:w-3/4">
                            {/* <PortableText value={post.description} /> */}
                        </div>{" "}
                    </div>
                </ContainerStandard>
                <div className="h-10"></div>
                <Stoerer1></Stoerer1>
                {/* <div className="spacer h-32"></div> */}
            </>
        </>
    );
};

export default BlogSite;

export const getStaticPaths = async () => {
    const res = await client.fetch(`*[_type in ["blogPost"] ]`);
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
    const res = await client.fetch(`*[_type == "blogPost" && slug.current == "${slug}"] {
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
    const data = await res;

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
            post: data[0],
            dataSetting,
            dataBlog,
        },
        revalidate: 1, // 10 seconds
    };
};
