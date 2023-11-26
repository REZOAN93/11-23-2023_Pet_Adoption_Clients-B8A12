import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCards from '../../Hooks/useCards';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const { user } = useAuth()
    const [error, setError] = useState('')
    const axiosSecure = useAxiosSecure()
    const [transctionId, setTransctionId] = useState('')
    const [cart, refetch] = useCards()
    const totalPrice = cart.reduce((total, items) => total + items.price, 0)
    const [clientSecret, setClientSecret] = useState("");

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
                // Now save the payment in the DataBase.
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transctionId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map((na) => na._id),
                    menuItemId: cart.map((na) => na.menuId),
                    status: 'Pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data, "payment saved")
                refetch()
                if (res.data?.paymentresult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Done",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/paymenthistroy')
                }
            }

        }

    }
    return (
        <div className='mx-auto'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='mt-1 btn-sm btn-primary btn' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className=' text-red-700 font-bold text-lg'>{error}</p>
                {transctionId ? <p>your Transction ID: {transctionId}</p> : ''}
            </form>
        </div>
    );
};

export default CheckoutForm;