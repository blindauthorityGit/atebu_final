import React from "react";
import { Parallax } from "react-scroll-parallax";

const HeroPage = (props) => {
    return (
        <div
            className={`hero-container container mx-auto grid grid-cols-12 w-full ${
                props.fullHeight ? "h-full" : props.height
            } ${props.colspan}`}
        >
            {/* Background Image */}
            <Parallax className="w-full col-span-12" translateY={["-300px", "120px"]}>
                <div
                    className="w-full col-span-12 bg-cover  lg:h-[450px] xl:h-[550px] bg-top"
                    style={{ backgroundImage: `url(${props.bgImage})` }}
                ></div>
            </Parallax>

            <div className="w-full h-full col-span-12 ">{props.children}</div>
        </div>
    );
};

export default HeroPage;
