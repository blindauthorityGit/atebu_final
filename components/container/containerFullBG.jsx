import React, { useRef } from "react";
import { FloaterBlackFull } from "../floaters";
//Framer Motion
import { motion, useScroll, useAnimation } from "framer-motion";

const ContainerFullBG = (props) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"],
    });

    return (
        <div ref={ref} className="w-full relative bg-brightBG grid grid-cols-12">
            <FloaterBlackFull style={{ opacity: scrollYProgress }}></FloaterBlackFull>

            {props.children}
        </div>
    );
};

export default ContainerFullBG;
