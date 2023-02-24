import Image from "next/image";
import { ContainerStandard } from "../container";
import Newsletter from "../../assets/newsletter.jpg";
import { useState } from "react";

const Stoerer1 = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({ email }));
        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            console.log(response.status);
            if (response.status === 200 || response.status === "subscribed") {
                console.log("SUCCESSSSS");
                setEmail("");
                setSuccessMessage("Vielen Dank! Sie sind nun in unserem Email Verteiler.");
                setErrorMessage("");
            } else {
                setSuccessMessage("");
                setErrorMessage("Es gab einen Fehler. Eventuell sind sie schon im Verteiler.");
            }
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage("Es gab einen Fehler. Eventuell sind sie schon im Verteiler.");
        }
    };

    return (
        <div className="w-full bg-primaryColor-200 md:py-6 pb-6 ">
            <ContainerStandard klasse="gap-6">
                <div className="col-span-12 md:col-span-6 h-full">
                    <div className="relative h-full pb-[66%]">
                        <Image
                            src={Newsletter.src}
                            alt="Your Image"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6 px-8 md:px-4">
                    <p className="text-2xl font-bold">Bleiben Sie Up-To-Date!</p>
                    <form onSubmit={handleSubmit} className="grid grid-cols-12 mt-6">
                        <p className="col-span-12 text-xs md:text-sm mt-4 mb-6 font-semibold">
                            Bleiben Sie immer auf dem neuesten Stand über unseren Newsletter!
                        </p>
                        <label className="col-span-2 text-sm" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="border-b bg-transparent border-blackText text-blackText col-span-10 text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-blackText mt-6 font-semibold hover-underline-animation z-20 flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8"
                        >
                            <span className="">Abonnieren</span>
                        </button>
                        {successMessage && (
                            <div className="success-message text-greenColor text-sm mt-4 font-semibold col-span-12">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="error-message text-redColor text-sm font-semibold mt-4 col-span-12">
                                {errorMessage}
                            </div>
                        )}
                        <p className="col-span-12 text-xs mt-6">
                            Durch den Eintrag in unseren Newsletter stimmen Sie zu, Ihre personenbezogenen Daten für den
                            Erhalt von Newslettern zu verwenden.
                        </p>
                    </form>
                </div>
            </ContainerStandard>
        </div>
    );
};

export default Stoerer1;
