import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;

// import "../styles/globals.css";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";

// function MyApp({ Component, pageProps }) {
//     const router = useRouter();
//     const animationVariants = {
//         initial: { opacity: 0 },
//         animate: { opacity: 1 },
//         exit: { opacity: 0, transition: { duration: 0.5 } },
//     };

//     return (
//         <motion.div key={router.route} variants={animationVariants} initial="initial" animate="animate" exit="exit">
//             {" "}
//             <Component {...pageProps} />
//         </motion.div>
//     );
// }

// export default MyApp;
