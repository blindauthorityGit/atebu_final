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
import { ChoiceBox1 } from "../../components/infoBoxes";

import urlFor from "../../components/functions/urlFor";

export default function Leistungen({ dataLeistungen }) {
    useEffect(() => {
        console.log(dataLeistungen, dataLeistungen[0].leistungen);
        AOS.init({
            duration: 1200,
        });
    }, []);
    return (
        <>
            <Head>
                <title>Site title</title>
            </Head>

            <ContainerStandard klasse="gap-1 sm:gap-2 pt-12 ">
                <div className="px-8 col-span-12">
                    <h2 className=" mt-10 font-serif tracking-wider text-3xl md:text-3xl mb-4">LEISTUNGEN</h2>
                </div>
                <p className="col-span-12 px-8 mb-8">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, maxime! Dolores molestiae eaque
                    optio quia voluptas expedita voluptates deserunt. Nisi amet consequuntur officiis, similique labore
                    facilis totam odio esse provident!
                </p>
                {/* <div className="col-span-12 bg-primaryColor-200 py-4 px-8 ">
                    <div className="elem mr-4">Freie Arbeiten | Malerei - Zeichnungen</div>
                    <div className="elem mr-4">Auftragsarbeiten</div>
                    <div className="elem mr-4">Illustration</div>
                    <div className="elem mr-4">Lehrtätigkeit</div>
                    <div className="elem">Projektgestaltung</div>
                </div> */}
                {dataLeistungen[0].leistungen.map((e, i) => {
                    console.log(e);
                    return <ChoiceBox1 data={e}></ChoiceBox1>;
                })}
            </ContainerStandard>

            <Stoerer1></Stoerer1>
        </>
    );
}

export const getStaticProps = async (context) => {
    // const resBilder = await client.fetch(`*[_type in ["Bild"]]`);
    // const dataBilder = await resBilder;

    // const resAkademie = await client.fetch(`*[_type in ["akademie"]]`);
    // const dataAkademie = await resAkademie.sort((a, b) => {
    //     const aMonth = Number(a.datum.split(".")[1]);
    //     const bMonth = Number(b.datum.split(".")[1]);
    //     return aMonth - bMonth;
    // });

    // const resChristine = await client.fetch(`*[_type in ["christine"]]`);
    // const dataChristine = await resChristine;

    const resLeistungen = await client.fetch(`*[_type == "leistungen"]`);
    const dataLeistungen = await resLeistungen;

    return {
        props: {
            dataLeistungen,
        },
        revalidate: 1, // 10 seconds
    };
};
