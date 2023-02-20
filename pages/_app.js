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

import { motion, AnimateSharedLayout } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            <AnimateSharedLayout type="crossfade">
                <motion.div
                    key={router.route}
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: 1 }}
                    // exit={{ opacity: 0 }}
                    style={router.route === "/" ? { height: "100%" } : { height: "auto" }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimateSharedLayout>
        </>
    );
}

export default MyApp;
