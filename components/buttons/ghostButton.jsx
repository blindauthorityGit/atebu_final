import React from "react";
import Link from "next/link";
const GhostButton = (props) => {
    return (
        <Link href={props.link}>
            <button className="border border-blackText  hover-underline-animation z-20 flex items-center justify-center text-blackText mt-4 lg:mt-8 py-4 text-lg sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-16">
                <span className=""> {props.children}</span>
            </button>
        </Link>
    );
};
export default GhostButton;
