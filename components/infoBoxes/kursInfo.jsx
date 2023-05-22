import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { PortableText } from "@portabletext/react";

const KurseInfo = ({ infoText }) => {
    return (
        <div className="flex flex-col my-8 bg-primaryColor-200 p-6 xl:p-20 relative">
            <div className="flex justify-end absolute right-4 top- 4">
                <AiOutlineInfoCircle size={24} />
            </div>
            <div className="list-disc text-xs xl:text-lg leading-relaxed lineHeight">
                <PortableText value={infoText} />
            </div>
        </div>
    );
};

export default KurseInfo;
