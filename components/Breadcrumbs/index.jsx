import React, { useState, useEffect } from "react";
import Link from "next/link";

const Breadcrumbs = (props) => {
    useEffect(() => {}, []);

    return (
        <div
            className={`container m-auto col-span-12  sm:px-24 mt-1 mb-3 sm:mt-8 text-xs ${props.klasse}  ${props.colspan}`}
        >
            <div className="">
                {props.links.map((e, i) => {
                    return (
                        <span key={`brKey${i}`}>
                            <Link href={e.link}>
                                <a
                                    className={`font-sans font-semibold hover:opacity-100 ${
                                        i + 1 < props.links.length ? "opacity-50" : null
                                    }`}
                                >
                                    {e.title}
                                </a>
                            </Link>
                            {i + 1 < props.links.length ? <span className="px-2">/</span> : null}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Breadcrumbs;
