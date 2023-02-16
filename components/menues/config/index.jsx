import { FaFacebook, FaInstagram } from "react-icons/fa";

const menuItems = [
    {
        title: "Museum",
        slug: "about",
        subMenu: true,
        subMenuItems: [
            {
                title: "Über uns",
                slug: "about",
            },
            {
                title: "Sammlung",
                slug: "sammlungen",
            },
            {
                title: "Leitbild",
                slug: "https://cdn.sanity.io/files/7all625u/dev/5a6f73b99aceb4c681ca63eb1b1ac1f447064ae7.pdf",
                external: true,
            },
            {
                title: "News",
                slug: "blog",
            },
            {
                title: "360° Besuch",
                slug: "https://pitten.panaustria.at/index.html?startpano=pano289",
                external: true,
            },
        ],
    },
    {
        title: "Besuch",
        slug: "besuch",
        subMenu: false,
    },
    {
        title: "Programm",
        slug: "events",
        subMenu: false,
    },
    {
        title: "Kontakt",
        slug: "kontakt",
        subMenu: false,
    },
];
const socialMedia = [
    {
        title: "Facebook",
        link: "http://www.facebook.com/piz1000",
        icon: <FaFacebook></FaFacebook>,
    },
    // {
    //     title: "Inbstagram",
    //     link: "http://www.instagram.com",
    //     icon: <FaInstagram></FaInstagram>,
    // },
];

export { menuItems, socialMedia };
