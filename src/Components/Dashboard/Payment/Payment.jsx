import { Elements } from "@stripe/react-stripe-js";
// import SectionTitle from "../../../SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useCards from "../../../Hooks/useCards";

const stripePromise = loadStripe(import.meta.env.VITE_GATEWAY_KEY);

const Payment = () => {
  
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>

        </div>
    );
};

export default Payment;