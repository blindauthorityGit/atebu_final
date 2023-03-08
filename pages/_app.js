// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />;
// }

// export default MyApp;

// import { AnimatePresence, motion } from "framer-motion";
// import "../styles/globals.css";

// function MyApp({ Component, pageProps, router }) {
//     return (
//         <>
//             <AnimatePresence exitBeforeEnter>
//                 <motion.div
//                     key={router.route}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     style={router.route === "/" ? { height: "100%" } : { height: "auto" }}
//                 >
//                     <Component {...pageProps} />
//                 </motion.div>
//             </AnimatePresence>
//         </>
//     );
// }

// export default MyApp;

import "../styles/globals.css";

import { useState, useEffect } from "react";

import { motion, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

import { Menu1 } from "../components/menues";
import { MobileBar1 } from "../components/mobileBar";
import Footer from "../components/footer";
import { Popup1, NewsletterSub } from "../components/popups";

//ASSETS
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItems, socialMedia } from "../components/menues/config";
import Logo from "../assets/logoFin.svg";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Menu1
                logo={Logo.src}
                menuItems={menuItems}
                socialMedia={socialMedia}
                burgerIcon={<RxHamburgerMenu />}
                onBurgerClick={(e) => {
                    console.log(e);
                }}
                onClick={() => {
                    console.log("IS CLICKED");
                    setIsOpen(true);
                }}
            ></Menu1>
            <MobileBar1
                onClick={() => {
                    console.log("IS CLICKED");
                    setIsOpen(true);
                }}
            ></MobileBar1>
            <Popup1 isOpen={isOpen} onClose={handleClose}>
                <NewsletterSub></NewsletterSub>
            </Popup1>

            <AnimateSharedLayout type="crossfade">
                <motion.div
                    key={router.route}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={router.route === "/" ? { height: "100%" } : { height: "auto" }}
                >
                    <Component {...pageProps} /> <Footer></Footer>
                </motion.div>
            </AnimateSharedLayout>
        </>
    );
}

export default MyApp;
