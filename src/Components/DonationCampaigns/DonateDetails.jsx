import Header from '../Shared/Header/Header';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Dashboard/Payment/CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_GATEWAY_KEY);

const DonateDetails = () => {
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData()
    const { user } = useAuth()
    const { image, _id: adoptionID, pet_name, pet_age, pet_category, pet_location, short_description, long_description, adoption_status, date_added, max_donation_amount, donated_amount } = data;
    const dateString = new Date();
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, "0");
    const day = String(dateString.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const navigate = useNavigate()

    const handleSubmitRequest = (event) => {
        event.preventDefault();
        const form = event.target;
        const UserName = form.name.value;
        const email = form.email.value;
        const requestDate = form.requestDate.value;
        const Phone = form.Phone.value;
        const address = form.address.value;

        const requestAdoption = { UserName, email, requestDate, Phone, address, image, adoptionID, pet_name, pet_age, pet_category, pet_location, short_description, long_description, adoption_status, date_added, max_donation_amount, donated_amount }
        console.log(requestAdoption)
        axiosSecure.post(`/requestforadoption/${adoptionID}`, requestAdoption)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    navigate('/')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "The Adoption request is submitted . will advise you soon",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }
    return (
        <div >
            <div className=' border-b-2 border-[#adf6fc]'>
                <Header></Header>
            </div>
            <div className=' max-w-6xl mx-auto grid grid-cols-2 mt-10 gap-5 justify-center mb-10'>
                <div className=' shadow-lg p-5 bg-gradient-to-r from-indigo-100 rounded-lg'>
                    <p className=' text-lg'>Pet Adoption Fund is a private, non-profit, no-kill organization with a 501(c)(3) status and we rely solely on donations. Your generosity is what keeps us alive and able to care for the many abused and abandoned dogs and cats we rescue from various situations in Southern California.  In most cases, extensive medical treatments are required, in addition to the routine spay-neuter, vet care & grooming.</p>
                    <p className=' text-lg mt-5'>Your tax-deductible gift to Pet Adoption Fund will help ensure that many more needy animals will receive our help, and have the chance to be adopted into new forever homes.  Life changing transformations are beautiful to witness, but cannot happen without your help.</p>
                    <p className=' text-lg mt-10 font-bold'>♥ We Thank You so much for your contributions. ♥</p>
                </div>
                <div className=' flex justify-center'>
                    <img className='h-[500px]' src="https://i.ibb.co/3pFjzCR/DONATIONDOG-683x1024.jpg" alt="" />
                </div>
            </div>
            <div className='max-w-6xl mx-auto  gap-4 grid grid-cols-3 mb-20'>
                <div className=''>
                    <img className=' h-[400px] w-full' src="https://i.ibb.co/R4GSnK4/transformation.webp" alt="" />
                </div>
                <div className=' col-span-2'>
                    <div className=' px-5 w-full border-l-2'>
                        <h2 className=" font-bold text-4xl text-teal-600">{pet_name}</h2>
                        <p className=' text-gray-500'>Short-Description: {short_description}</p>
                        {/* <p className=' mt-2 font-bold'>{pet_category}</p> */}
                        <p className=' font-bold text-3xl mt-8'>Donating Online:</p>
                        <p className=' mt-3 text-gray-500 text-justify'>You may make a one-time donation or a recurring monthly donation of a specified amount using Stripe services.  Stripe accepts all credit cards plus electronic checks through a secured online platform. </p>

                        <p className=' mt-5 font-bold text-lg'>To donate using Stripe, press the "Donate" button below.</p>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn focus:outline-none focus:border-none my-6 w-64 text-white text-xl hover:text-white border-none hover:bg-teal-800 font-bold bg-teal-500 btn-primary">Donate Now</button>
                        <p className=' mt-3 text-gray-500 text-justify'>Every dollar counts, and goes for the care of our four legged residents. ♥  So on behalf of PAF management, staff, volunteers and furry residents, we'd like to say THANK YOU SO MUCH for your generosity and support of our cause.  You help us...We help them! ♥</p>
                    </div>

                </div>
            </div>
            {/* Modal Data */}
            <dialog id="my_modal_3" className="modal pl-10 lg:pl-0">
                <div className="modal-box border space-y-4">
                    <p className=' text-center'> Payment Strips</p>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </dialog>
        </div>



    );
};

export default DonateDetails;