import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const MobileBar = () => {
    return (
        <div className="fixed sm:hidden  z-40 bottom-0 w-full flex justify-center items-center bg-blackText shadow-md">
            <button className="w-1/3 p-4 flex flex-col justify-center items-center text-primaryColor hover:text-gray-800">
                <FaPhone size={24} />
                <span className="text-sm font-medium">CALL</span>
            </button>
            <button className="w-1/3 p-4 flex flex-col justify-center items-center text-primaryColor hover:text-gray-800">
                <FaEnvelope size={24} />
                <span className="text-sm font-medium">EMAIL</span>
            </button>
            <button className="w-1/3 p-4 flex flex-col justify-center items-center text-[#6DC593] hover:text-green-600">
                <FaWhatsapp size={24} />
                <span className="text-sm font-medium">WHATSAPP</span>
            </button>
        </div>
    );
};

export default MobileBar;
