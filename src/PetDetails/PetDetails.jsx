import Header from '../Components/Shared/Header/Header';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../Components/Hooks/useAuth';
import useAxiosSecure from '../Components/Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PetDetails = () => {
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData()
    const { user } = useAuth()
    const { image, _id: adoptionID, pet_name, pet_age, pet_category, pet_location, short_description, long_description, adoption_status, date_added, max_donation_amount, donated_amount,petAdderby } = data;
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
        const requestAdoption = { UserName, email, requestDate, Phone, address, image, adoptionID, pet_name, pet_age, pet_category, pet_location, short_description, long_description, date_added, max_donation_amount, donated_amount,petAdderby }
        console.log(requestAdoption)
        axiosSecure.post(`/requestforadoption/${adoptionID}`, requestAdoption)
            .then(res => {
                console.log(res?.data)
                navigate('/')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "The Adoption request is submitted . will advise you soon",
                    showConfirmButton: false,
                    timer: 1500
                })

            })

    }

    return (
        <div>
            <div className=' border-b-2 border-[#adf6fc]'>
                <Header></Header>
            </div>
            <div className=" grid grid-cols-3 max-w-7xl mx-auto my-10 bg-base-100">
                <figure><img className=' w-full rounded-lg h-[400px]' src={image} alt="Album" /></figure>
                <div className=' px-5 w-full col-span-2 ml-10 border-l-2'>
                    <h2 className=" font-bold text-4xl text-teal-600">{pet_name}</h2>
                    <p className=' text-gray-500'>Short-Description: {short_description}</p>
                    {/* <p className=' mt-2 font-bold'>{pet_category}</p> */}
                    <p className=' mt-5'><span className=' font-bold'>Location:</span> {pet_location}</p>
                    <p className=' mb-2'><span className=' font-bold'>Age:</span> {pet_age} Year</p>
                    <p>Status: {adoption_status}</p>
                    <p>Date: {date_added}</p>
                    <p className=' w-2/3 mt-5 text-lg text-gray-500 text-justify'>{long_description}</p>
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn focus:outline-none focus:border-none mt-7 w-64 text-white text-xl hover:text-white border-none hover:bg-teal-800 font-bold bg-teal-500 btn-primary">Adopt</button>
                </div>
            </div>
            {/* Modal Data */}
            <dialog id="my_modal_3" className="modal pl-10 lg:pl-0">
                <div className="modal-box border ">
                    <h3 className="font-bold text-center text-xl">Request for Adoption</h3>
                    <div className="modal-action">
                        <form onSubmit={handleSubmitRequest} method="dialog">
                            <div className=' grid lg:grid-cols-2 gap-2 pb-3'>
                                <div>
                                    <label htmlFor="">Request Date</label>
                                    <input defaultValue={formattedDate} className="input input-bordered bg-[#DCE8FF] w-full" type="date" name="requestDate" id="" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="">Name</label>
                                    <input name='name' defaultValue={user?.displayName} className="input input-bordered w-full  bg-[#DCE8FF]" readOnly />
                                </div>
                                {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" defaultValue={user?.email} name='email' className="input bg-[#DCE8FF] input-bordered" readOnly />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Phone number</span>
                                </label>
                                <input type="number" name='Phone' placeholder="Enter Phone number" required className="input bg-[#DCE8FF] input-bordered" />
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <textarea placeholder='Enter Address' name='address' className="textarea textarea-bordered input bg-[#DCE8FF]"></textarea>
                                {/* <input type="email" placeholder="email" defaultValue={user?.email} name='email'  readOnly /> */}
                            </div>
                            <div className=' flex justify-center'>
                                {/* <input className='btn bg-emerald-300 hover:bg-emerald-500 w-full' type="submit" /> */}
                                <button className='btn bg-emerald-300 hover:bg-emerald-500 w-full'>Submit</button>
                            </div>
                            {/* <button>Submit</button> */}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>

    );
};

export default PetDetails;