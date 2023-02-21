import { FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";

const ContactInfo = (props) => {
    return (
        <div className="col-span-12">
            <div className="text">
                <h2 className="text-3xl font-semibold">Haben Sie weitere Fragen?</h2>
                <p className="text-sm mt-4">Kontaktieren Sie uns unter:</p>
            </div>
            <div className="bg-primaryColor-100 p-4 rounded-md  mt-8">
                <div className="flex items-center mb-2">
                    <FaPhone className="mr-2 text-primaryColor-500" size={18} />
                    <p className="text-gray-700">
                        <a href="tel:+436509445140">+43 650 / 944 51 40</a>
                    </p>
                </div>
                <div className="flex items-center mb-2">
                    <FaEnvelope className="mr-2 text-primaryColor-500" size={18} />
                    <p className="text-gray-700">office@atelierbuchner.at</p>
                </div>
                <div className="flex items-center">
                    <FaMapMarker className="mr-2 text-primaryColor-500" size={18} />
                    <p className="text-gray-700">
                        Prof. Sepp Buchner-Straße 528<br></br>2823 Pitten
                    </p>
                </div>
            </div>
            <div className="verfuegbar mt-6">
                {props.sold ? (
                    <div>
                        Dieses Bild können Sie als Druck in unterschiedlichen Größen erwerbe. <br></br>
                    </div>
                ) : (
                    <div>
                        Dieses Bild können Sie in der Galerie Buchner besichtigen. <br></br>
                        <br></br>
                        <strong>Termine auf Anfrage</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;
