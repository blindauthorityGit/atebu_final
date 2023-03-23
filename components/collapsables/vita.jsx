import { useState, useRef } from "react";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";
import { PortableText } from "@portabletext/react";

export default function Vita(props) {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const contentRef = useRef(null);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="w-full col-span-12 z-50 px-8 bg-blackText">
            <div
                onClick={toggleCollapse}
                className=" text-primaryColor-300 py-2 px-4 flex justify-between items-center"
            >
                <h2 className="text-lg font-medium">Vita</h2>
                <button>{isCollapsed ? <HiOutlineChevronDown size={24} /> : <HiOutlineChevronUp size={24} />}</button>
            </div>
            <div
                className={`overflow-hidden bg-blackText text-primaryColor-100 transition-height  duration-500 ${
                    isCollapsed ? "h-0" : "h-[940px]"
                }`}
            >
                <p className="py-4 px-4 list-disc">
                    <PortableText value={props.text} />
                </p>
            </div>
        </div>
    );
}
