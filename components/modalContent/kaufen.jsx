import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./payment";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = (product) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm product={product}></PaymentForm>
        </Elements>
    );
};

export default PaymentPage;
