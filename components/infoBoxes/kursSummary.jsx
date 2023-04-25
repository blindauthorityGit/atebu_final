import { FaRegClock, FaMapMarkerAlt, FaMoneyBillAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import Kurs from "../../assets/kurs.jpg";
import Image from "next/image";

function InfoSummary(props) {
    return (
        <div className="bg-primaryColor-50 grid grid-cols-12 p-6 rounded-lg ">
            <div className="col-span-12 md:col-span-6">
                <div className="flex items-center mb-4">
                    <FaRegClock size={24} className="text-primaryColor mr-4" />
                    <p className="text-gray-700 font-bold">{props.datum}</p>
                </div>
                <div className="flex items-center mb-4">
                    <FaMapMarkerAlt size={24} className="text-primaryColor mr-4" />
                    <p className="text-gray-700">{props.address}</p>
                </div>
                <div className="flex items-center mb-4">
                    <FaMoneyBillAlt size={24} className="text-primaryColor mr-4" />
                    <p className="text-gray-700">
                        {props.price} <span className="text-xs">* Preis exkl. Essen und Material</span>{" "}
                    </p>
                </div>
                <div className="flex items-center mb-4">
                    <FaPhoneAlt size={24} className="text-primaryColor mr-4" />
                    <p className="text-gray-700">+43 650 / 944 51 40</p>
                </div>
                <div className="flex items-center mb-4">
                    <IoMdMail size={24} className="text-primaryColor mr-4" />
                    <p className="text-gray-700">christine@atelierbuchner.at</p>
                </div>
                {/* <div className="text-sm text-gray-600">
                    <FiInfo size={18} className="inline-block text-primaryColor mr-1" />
                    <p className="inline-block">Some small print goes here.</p>
                </div> */}
            </div>
            <div className="col-span-12 md:col-span-6">
                <div
                    data-aos="fade-right"
                    className={`left hidden sm:block col-span-12 lg:col-span-5 relative h-64 lg:h-auto ${props.order}`}
                >
                    <Image
                        // {...ImagePropsGallery(i)}
                        src={Kurs.src}
                        layout="fill"
                        loading="lazy"
                        objectFit="cover"
                        alt="hero"
                        className="z-10"
                    />
                </div>
            </div>
        </div>
    );
}

export default InfoSummary;
