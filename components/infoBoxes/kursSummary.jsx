import { FaRegClock, FaMapMarkerAlt, FaMoneyBillAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiInfo } from "react-icons/fi";

function InfoSummary(props) {
    return (
        <div className="bg-primaryColor-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <FaRegClock size={24} className="text-primaryColor mr-4" />
                <p className="text-gray-700">{props.datum}</p>
            </div>
            <div className="flex items-center mb-4">
                <FaMapMarkerAlt size={24} className="text-primaryColor mr-4" />
                <p className="text-gray-700">{props.address}</p>
            </div>
            <div className="flex items-center mb-4">
                <FaMoneyBillAlt size={24} className="text-primaryColor mr-4" />
                <p className="text-gray-700">{props.price}</p>
            </div>
            <div className="flex items-center mb-4">
                <FaPhoneAlt size={24} className="text-primaryColor mr-4" />
                <p className="text-gray-700">+43 650 / 944 51 40</p>
            </div>
            <div className="flex items-center mb-4">
                <IoMdMail size={24} className="text-primaryColor mr-4" />
                <p className="text-gray-700">christine@atelierbuchner.at</p>
            </div>
            <div className="text-sm text-gray-600">
                <FiInfo size={18} className="inline-block text-primaryColor mr-1" />
                <p className="inline-block">Some small print goes here.</p>
            </div>
        </div>
    );
}

export default InfoSummary;
