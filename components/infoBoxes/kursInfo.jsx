import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { PortableText } from "@portabletext/react";

const KurseInfo = ({ infoText }) => {
    return (
        <div className="flex flex-col my-8 bg-primaryColor-100 p-6 relative">
            <div className="flex justify-end absolute right-4 top- 4">
                <AiOutlineInfoCircle size={24} />
            </div>
            <div className="list-disc text-xs leading-relaxed">
                <PortableText value={infoText} />
            </div>
        </div>
    );
};

export default KurseInfo;
