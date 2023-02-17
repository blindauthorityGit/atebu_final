import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const MobileBar = () => {
    return (
        <div className="fixed sm:hidden  z-40 bottom-0 w-full flex justify-center items-center bg-blackText text-sm ">
            <a
                href="tel:+436509444150"
                className="w-1/3 p-4 border-r border-primaryColor-200 border-opacity-30 flex flex-col justify-center items-center text-primaryColor-200 hover:text-gray-800"
            >
                <FaPhone size={18} />
                <span className="text-xs font-base mt-1">CALL</span>
            </a>
            <a
                href="mailto:office@atelierbuchner.at"
                className="w-1/3 p-4 flex border-r border-opacity-30 border-primaryColor-200 flex-col justify-center items-center text-primaryColor-200 hover:text-gray-800"
            >
                <FaEnvelope size={18} />
                <span className="text-xs font-base mt-1">EMAIL</span>
            </a>
            <a
                href="https://wa.link/x69iqk"
                className="w-1/3 p-4 flex flex-col justify-center items-center text-[#6DC593] hover:text-green-600"
            >
                <FaWhatsapp size={18} />
                <span className="text-xs font-base mt-1">WHATSAPP</span>
            </a>
        </div>
    );
};

export default MobileBar;
