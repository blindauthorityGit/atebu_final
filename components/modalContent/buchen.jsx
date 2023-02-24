import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPaintBrush } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import Image from "next/image";
import urlFor from "../../components/functions/urlFor";

import { PaymentIconsContainer } from "../../components/iconBars";

const courses = [
    { id: "course1", name: "Painting Techniques 101" },
    { id: "course2", name: "Landscape Painting" },
    { id: "course3", name: "Portrait Painting" },
];

const Buchen = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [course, setCourse] = useState(courses[0].id);
    const [payment, setPayment] = useState("online");

    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleCourseChange = (e) => setCourse(e.target.value);
    const handlePaymentChange = (e) => setPayment(e.target.value);

    return (
        <form className="grid grid-cols-12">
            <div className="col-span-12">
                <div className="relative h-24">
                    <Image
                        // {...ImagePropsGallery(i)}
                        src={urlFor(props.image).url()}
                        layout="fill"
                        loading="lazy"
                        objectFit="cover"
                        alt="hero"
                        className="z-10"
                    />
                </div>
                <h3 className="text-xl font-bold">{props.title}</h3>
                <h4 className="text-base font-semibold">{props.datum}</h4>
            </div>
            <div className="col-span-12 grid grid-cols-12 mt-4 mb-2">
                <label className="col-span-4 flex text-sm font-semibold" htmlFor="firstname">
                    Vorname:
                </label>
                <input
                    className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                    type="text"
                    id="name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div className="col-span-12 grid grid-cols-12 mb-2">
                <label className="col-span-4 flex text-sm font-semibold" htmlFor="lastname">
                    Nachname:
                </label>
                <input
                    className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                    type="text"
                    id="name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </div>
            <div className="col-span-12 grid grid-cols-12 mb-2">
                <label className="col-span-4 text-sm flex font-semibold" htmlFor="email">
                    Email:
                </label>
                <input
                    className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className="col-span-12 grid grid-cols-12 mb-4">
                <label className="col-span-4 text-sm flex font-semibold" htmlFor="phone">
                    Telefon:
                </label>
                <input
                    className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </div>
            <div className="col-span-12 grid grid-cols-12 mb-2">
                <label className="col-span-4 text-sm flex font-semibold" htmlFor="payment">
                    Bezahlung:
                </label>
                <label className="col-span-4 text-sm">
                    <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={payment === "online"}
                        onChange={handlePaymentChange}
                    />{" "}
                    Online
                </label>
                <label className="col-span-4 text-sm">
                    <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={payment === "cash"}
                        onChange={handlePaymentChange}
                    />{" "}
                    Bar
                </label>
            </div>
            <div className="mt-2 col-span-12">
                <PaymentIconsContainer></PaymentIconsContainer>
            </div>

            <div className="col-span-12 mt-4">
                <p className="text-sm">
                    <strong>Wichtig:</strong> Bei Barzahlung 3 Wochen vor Kursbeginn eine Anzahl von € 100,- notwendig
                    um zu reservieren.
                </p>
            </div>
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    console.log(firstName, lastName, phone, email, payment);
                }}
                className="bg-blackText col-span-12 relative mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
            >
                <span className="">Weiter</span>
            </button>
        </form>
    );
};

export default Buchen;
