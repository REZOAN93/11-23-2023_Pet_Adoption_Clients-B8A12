import React, { useEffect, useState } from 'react';
import useDonation from '../Hooks/useDonation';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import ProgressBar from '@ramonak/react-progress-bar';
import Swal from 'sweetalert2';


const MyDonationCampaigns = () => {
    const [campaigns, refetch] = useDonation()
    const axiosSecure = useAxiosSecure()
    const [pause, setPause] = useState(false)
    const [donators, setDonators] = useState([])

    const handlePause = (id, donationStatus) => {
        const newStatus = donationStatus === 'Available' ? 'Unavailable' : 'Available';
        const dataupdate = { status: newStatus };

        axiosSecure.patch(`/updateDonationActive/${id}`, dataupdate)
            .then(res => {
                refetch();
                console.log(res.data);
                const successMessage = newStatus === 'Available' ? 'The Campaign is Available' : 'The Campaign is Unavailable';
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: successMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const showDonator = async (id) => {
        const res = await axiosSecure.get(`/dontatorsdata/${id}`)
        setDonators(res.data)
    }

    return (
        <div className=' py-5 px-5'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pet Details</th>
                            <th>Progress Bar</th>
                            <th>Pause the Donation ?</th>
                            <th>Edit the Donation</th>
                            <th>View Donators List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            campaigns?.map((na, index) => <>
                                <tr>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={na.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{na.pet_name}</div>
                                                <div className=""> Maximum Donation Amount: <span className=' font-bold'>${na.max_donation_amount}.00</span></div>
                                                <div className="text-sm opacity-50">{na.pet_category}</div>
                                                {na.donationStatus == 'Available' ? <div className="text-sm ">The Donation Campaigns is <span className=' font-bold text-emerald-800'>active.</span></div> : <div className="text-sm opacity-50">The Donation Campaigns is <span className=' font-bold text-red-800'>Inactive.</span></div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <ProgressBar completed={na.donated_amount} maxCompleted={na.max_donation_amount} />
                                    </td>

                                    <th>
                                        {
                                            na?.donationStatus == 'Available' ? <> <td><button onClick={() => handlePause(na._id, na.donationStatus)} className=' btn bg-[#adf6fc] hover:bg-red-400'>Pause Campaigns</button></td></> : <td><button onClick={() => handlePause(na._id, na.donationStatus)} className=' btn bg-[#adf6fc] hover:bg-[#51dce9]'>UnPaused Campaigns</button></td>
                                        }
                                    </th>
                                    <th>
                                        <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateCampaigns/${na._id}`}><FaEdit /></Link></td>
                                    </th>
                                    <th>
                                        <button onClick={() => {
                                            document.getElementById('my_modal_4').showModal();
                                            showDonator(na._id);
                                        }} className="btn focus:outline-none focus:border-none text-white hover:text-white border-none hover:bg-teal-800 bg-teal-500 btn-primary">
                                            View Donators
                                        </button>
                                    </th>
                                </tr>
                            </>)
                        }
                    </tbody>

                </table>
            </div>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-4xl">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Sl#</th>
                                    <th>Name</th>
                                    <th>Donated Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donators?.map((na, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{na.paidbyuser}</td>
                                        <td>$ {na.donated_amount}.00</td>
                                    </tr>
                                </>)}

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyDonationCampaigns;