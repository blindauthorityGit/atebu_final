import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import urlFor from "../../components/functions/urlFor";

const Kaufen = ({ product, total }) => {
    useEffect(() => {
        console.log(product.product);
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    const stripe = useStripe();
    const elements = useElements();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (paymentMethod === "credit-card") {
            // Validate form data
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (error) {
                console.log(error);
            } else {
                // Submit payment to your backend server
                console.log(paymentMethod);
            }
        } else {
            // Submit payment to your backend server
        }
    };

    return (
        <div className="col-span-12">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>

                <div className="flex justify-between mb-2">
                    <img src={urlFor(product.product.image).width(80)} alt="" />
                    <span className="ml-4">{product.product.titel_Bild}</span>
                    <span>EUR {product.product.price},-</span>
                </div>

                <hr className="my-4" />

                {/* <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${price.toFixed(2)}</span>
                </div> */}
            </div>

            <h3 className="text-lg font-medium mb-4">Payment Method</h3>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2"
                    />
                    <span>Credit Card</span>
                </div>

                {paymentMethod === "credit-card" && (
                    <div>
                        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                    </div>
                )}

                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={handlePaymentMethodChange}
                        className="mr-2"
                    />
                    <span>PayPal</span>
                </div>
            </div>

            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        </div>
    );
};

export default Kaufen;
