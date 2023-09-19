import { useState } from "react";
import Image from "next/image";
import Newsletter from "../../assets/newsletter.jpg";
import { Rings } from "react-loader-spinner"; // Import the Loader component

const NewsletterSub = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({ email }));

        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-12 pt-6">
            <div className="relative col-span-12 h-48">
                <Image
                    // {...ImagePropsGallery(i)}
                    src={Newsletter.src}
                    layout="fill"
                    loading="lazy"
                    objectFit="cover"
                    alt="hero"
                    className=" thumbnail group-hover:grayscale-0 duration-500 ease-in-out transition-all group-hover:scale-110"
                />
            </div>
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
                className="border-b border-blackText text-blackText col-span-10 text-sm"
            />
            {!loading ? (
                <button
                    type="submit"
                    className={`bg-blackText mt-6 font-semibold ${
                        loading ? "opacity-20" : ""
                    } z-20 flex items-center justify-center text-primaryColor-200 lg:mt-8 py-2 text-sm sm:text-base sm:py-3 px-6 min-w-[10rem] w-full uppercase rounded-md md:mt-8`}
                    disabled={loading} // Disable the button while loading
                >
                    Abonnieren
                </button>
            ) : (
                <div className="mt-6 flex">
                    <Rings color="#000000" height={36} width={36} />
                </div>
            )}
            {successMessage && (
                <div className="success-message text-greenColor text-sm mt-4 font-semibold col-span-12">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="error-message text-redColor text-sm font-semibold mt-4 col-span-12">{errorMessage}</div>
            )}
            <p className="col-span-12 text-xs mt-6">
                Durch den Eintrag in unseren Newsletter stimmen Sie zu, Ihre personenbezogenen Daten für den Erhalt von
                Newslettern zu verwenden.
            </p>
        </form>
    );
};

export default NewsletterSub;
