import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const CheckoutForm = (data) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const { user } = useAuth()
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecure()
    const [transctionId, setTransctionId] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [inputValue, setInputValue] = useState("");

    // const { image, _id: adoptionID, pet_name, pet_age, pet_category, pet_location, short_description, long_description, adoption_status, date_added, max_donation_amount, donated_amount } = data;
    const totalPrice = inputValue

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then((res) => {
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret)
                });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        // confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    },
                },
            })
        if (confirmError) {
            console.log('confirmError', confirmError)
        }
        else {
            console.log(paymentIntent, "confirm payment intent")
            if (paymentIntent.status === 'succeeded') {
                setTransctionId(paymentIntent.id)
                console.log(transctionId)
                // Now save the payment in the DataBase.
                const payment = {
                    paidbyuser: user?.email,
                    transctionId: paymentIntent.id,
                    date: new Date(),
                    CampaignsId: data?.data?._id,
                    image: data?.data?.image,
                    pet_name: data?.data?.pet_name,
                    pet_age: data?.data?.pet_age,
                    pet_category: data?.data?.pet_category,
                    pet_location: data?.data?.pet_location,
                    short_description: data?.data?.short_description,
                    long_description: data?.data?.long_description,
                    adoption_status: data?.data?.adoption_status,
                    date_added: data?.data?.date_added,
                    max_donation_amount: data?.data?.max_donation_amount,
                    donated_amount: totalPrice,
                    status: 'Pending',
                    CampaignAddedby: data?.data?.CampaignAddedby
                }
                console.log(payment)
                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data, "payment saved")
                // refetch()
                if (res?.data) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                }
            }
        }
    }
    return (
        <div className='mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Donate Amount</span>
                    </label>
                    <input onChange={(e) => setInputValue(e.target.value)} type="number" name='amount' placeholder="Enter the donate amount" className="input input-bordered" required />
                </div>
                <div className="form-control mt-5">
                    <label className="label">
                        <span className="label-text">Card Details</span>
                    </label>
                    <CardElement className='input input-bordered px-2 py-3'

                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                    padding: '3px'
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className='mt-5 w-full bg-[#57e3f0] btn-outline btn hover:bg-[#55e4f1] hover:text-black hover:border-none border-none' type="submit" disabled={!stripe || !clientSecret}>
                    Donate
                </button>
                <p className=' text-red-700 font-bold text-lg'>{error}</p>
                {/* {transctionId ? <p>your Transction ID: {transctionId}</p> : ''} */}
            </form>
        </div>
    );
};

export default CheckoutForm;