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
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        payment: "",
    });

    const [valid, setIsValid] = useState(false);

    // STEPS
    const [showFirst, setShowFirst] = useState(true);
    const [showBar, setShowBar] = useState(false);
    const [showOnline, setShowOnline] = useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        const { firstName, lastName, email, phone, payment } = {
            ...formState,
            [name]: value,
        };
        setIsValid(firstName && lastName && email && phone && payment);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const { firstName, lastName, email, phone, payment } = formState;
        console.log(formState);
        // Perform validation here
        const isValid =
            formState.firstName && formState.lastName && formState.email && formState.phone && formState.payment;
        if (isValid) {
            console.log(formState);
            if (formState.payment == "online") {
                setShowOnline(true);
                setShowFirst(false);
            }
            if (formState.payment == "cash") {
                setShowBar(true);
                setShowFirst(false);
            }
        } else {
            alert("Please fill out all fields before submitting");
        }
    };

    return (
        <>
            {showFirst && (
                <form className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="relative h-24 hidden">
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
                    <div className="col-span-12 grid grid-cols-12 mt-4 mb-5">
                        <label className="col-span-4 flex text-sm font-semibold" htmlFor="firstname">
                            Vorname:
                        </label>
                        <input
                            className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                            type="text"
                            id="name"
                            name="firstName"
                            onChange={(e) => {
                                handleFormChange(e);
                            }}
                        />
                    </div>
                    <div className="col-span-12 grid grid-cols-12 mb-5">
                        <label className="col-span-4 flex text-sm font-semibold" htmlFor="lastname">
                            Nachname:
                        </label>
                        <input
                            className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                            type="text"
                            id="name"
                            name="lastName"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="col-span-12 grid grid-cols-12 mb-5">
                        <label className="col-span-4 text-sm flex font-semibold" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="col-span-12 grid grid-cols-12 mb-5">
                        <label className="col-span-4 text-sm flex font-semibold" htmlFor="phone">
                            Telefon:
                        </label>
                        <input
                            className="col-span-8 text-sm border-b bg-transparent border-blackText text-blackText"
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="col-span-12 grid grid-cols-12 mb-5">
                        <label className="col-span-4 text-sm flex font-semibold" htmlFor="payment">
                            Bezahlung:
                        </label>
                        <label className="col-span-4 text-sm">
                            <input type="radio" name="payment" value="online" onChange={handleFormChange} /> Online
                        </label>
                        <label className="col-span-4 text-sm">
                            <input type="radio" name="payment" value="cash" onChange={handleFormChange} /> Bar
                        </label>
                    </div>
                    <div className="mt-2 col-span-12">
                        <PaymentIconsContainer></PaymentIconsContainer>
                    </div>

                    <div className="col-span-12 mt-4">
                        <p className="text-xs">
                            <strong>Wichtig:</strong> Bei Barzahlung 3 Wochen vor Kursbeginn eine Anzahl von € 100,-
                            notwendig um zu reservieren.
                        </p>
                    </div>
                    <button
                        type="submit"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                        disabled={!valid}
                        className={`${
                            valid ? "opacity-100" : "opacity-30"
                        } bg-blackText col-span-12 relative mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8 `}
                    >
                        <span className="">Weiter</span>
                    </button>
                </form>
            )}
            {showBar && (
                <div className="bar grid grid-cols-12">
                    <div className="col-span-12">
                        <h3 className="text-xl font-bold">Bar Zahlung</h3>
                        <h4 className="text-base font-semibold">{props.datum}</h4>
                    </div>
                </div>
            )}
            {showOnline && <div className="online">ICH ZAHLE ONLINE</div>}
        </>
    );
};

export default Buchen;
