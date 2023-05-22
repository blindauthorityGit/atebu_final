import Head from "next/head";
import { useState, useEffect } from "react";

//SANITY
import client from "../../client";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// COMPONENTS
import { ContainerStandard } from "../../components/container";
import { KurseTxtImg } from "../../components/imgText";
import { Stoerer1 } from "../../components/stoerer";
import Modal from "../../components/modal/modal";
import ModalMobile from "../../components/modal/modalMobile";
import Overlay from "../../components/modal/overlay";
import { Buchen } from "../../components/modalContent";

//FUNCTIONS
import urlFor from "../../components/functions/urlFor";

export default function Kurse({ dataBilder, dataAkademie, dataChristine, dataBlog }) {
    const [showModal, setShowModal] = useState(false);
    const [kursIndex, setKursIndex] = useState(0);

    const handleClick = () => {
        setShowModal(!showModal);
    };

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
            {showModal && (
                <>
                    <Modal onClick={handleClick}>
                        <Buchen
                            image={dataAkademie[kursIndex].image}
                            title={dataAkademie[kursIndex].akademieTitel}
                            datum={dataAkademie[kursIndex].datum}
                        ></Buchen>
                    </Modal>{" "}
                    <Overlay onClick={handleClick}></Overlay>
                </>
            )}

            <ContainerStandard klasse="lg:mt-16 gap-1 sm:gap-2 lg:gap-12 pt-12 bg-brightBG lg:bg-transparent">
                <div className="right hidden lg:flex overflow-hidden px-8 sm:px-0 col-span-12 lg:col-span-16  flex-col justify-center ">
                    <h2
                        data-aos="fade-left"
                        className="font-serif uppercase text-4xl sm:text-4xl text-darkText lg:text-6xl font-thin mt-8 tracking-wider mb-2 lg:mb-12"
                    >
                        Mal Akademien
                    </h2>
                    <div
                        data-aos="fade-up"
                        className="font-montserrat lg:w-2/4  mt-4 lg:mt-0 lg:mb-12 tracking-wide leading-relaxed sm:leading-relaxed lg:leading-relaxed text-sm sm:text-sm lg:text-regular text-darkText mb-4"
                    >
                        Unser Mal-Kursangebot ist der perfekte Ort, um Farben fließen zu lassen und kreative Visionen
                        zum Leben zu erwecken. Ob Sie ein Anfänger oder ein fortgeschrittener Künstler sind, hier gibt
                        es Schwerpunkte für alle Stile und Interessen.
                    </div>
                </div>
                {dataAkademie.map((e, i) => {
                    console.log(e);
                    return (
                        <KurseTxtImg
                            showImage
                            image={urlFor(e.image).url()}
                            data={e}
                            buchenClick={(e) => {
                                console.log(e.currentTarget.id);
                                handleClick();
                                setKursIndex(i);
                            }}
                            button
                            id={i}
                            link={`/kurse/${e.slug.current}`}
                            order={i % 2 === 0 ? "lg:order-first" : "lg:order-last"}
                        ></KurseTxtImg>
                    );
                })}
            </ContainerStandard>
            <Stoerer1></Stoerer1>
        </>
    );
}

export const getStaticProps = async (context) => {
    const resBilder = await client.fetch(`*[_type in ["Bild"]]`);
    const dataBilder = await resBilder;

    const resAkademie = await client.fetch(`*[_type in ["akademie"]]`);
    const dataAkademie = await resAkademie.sort((a, b) => {
        const aMonth = Number(a.datum.split(".")[1]);
        const bMonth = Number(b.datum.split(".")[1]);
        return aMonth - bMonth;
    });

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
