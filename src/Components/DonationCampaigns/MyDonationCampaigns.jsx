import React, { useEffect, useState } from 'react';
import useDonation from '../Hooks/useDonation';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
// import { RiDeleteBin5Line } from 'react-icons/ri';
import ProgressBar from '@ramonak/react-progress-bar';
import Swal from 'sweetalert2';
// import DonatorsData from './DonatorsData';

const MyDonationCampaigns = () => {
    const [campaigns, refetch] = useDonation()
    const axiosSecure = useAxiosSecure()
    const [pause, setPause] = useState(false)
    const [donators, setDonators] = useState([])
    // const [Alldonators, setdonationAmountperId] = useState()
    // useEffect(() => {
    //     axiosSecure.get(`/alldontatorsdata`)
    //         .then((res) => {
    //             const allDonators = res.data;
    //             const data = allDonators.filter(na => na.CampaignsId == "id")
    //             const totalDonation = allDonators.reduce((total, payment) => total + parseFloat(payment.donated_amount), 0)
    //             setALLDonators(totalDonation)
    //         })
    // }, [axiosSecure])

    // const handleDonatePrice = async (id) => {
    //     const res = await axiosSecure.get(`/alldontatorsdata`)
    //     const allDonators = res.data;
    //     console.log(allDonators)
    //     console.log(id)
    //     const data = await allDonators.filter(na => na.CampaignsId === id)
    //     console.log(data)
    //     // const totalDonation = data.reduce((total, payment) => total + parseFloat(payment.donated_amount), 0)
    //     // setdonationAmountperId(totalDonation)
    // }

    // console.log(Alldonators)

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

    // const handleAdopt = (id) => {
    //     console.log(id)
    //     axiosSecure.patch(`/users/adopts/${id}`)
    //         .then(res => {
    //             if (res?.data?.modifiedCount > 0) {
    //                 Swal.fire({
    //                     title: "Done!",
    //                     text: "The Pet is Adopted",
    //                     icon: "success"
    //                 });
    //                 refetch()
    //             }
    //         })
    // }
    // const handleDelete = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.delete(`/carts/${id}`)
    //                 .then(res => {
    //                     if (res?.data?.deletedCount) {
    //                         Swal.fire({
    //                             title: "Deleted!",
    //                             text: "Your file has been deleted.",
    //                             icon: "success"
    //                         });
    //                         refetch()
    //                     }
    //                 })

    //         }

    //     });
    // }

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

                                    {/* <th>
                                        {
                                            na?.donationStatus == 'Available' ? <> <td><button onClick={() => handlePause(na._id)} className=' btn'>Pause Campaigns</button></td></> : <td><button onClick={() => handlePause(na._id)} className=' btn'>UnPaused Campaigns</button></td>
                                        }
                                    </th> */}
                                    {/* <th>
                                        <button onClick={() => handleDelete(na._id)} className="btn btn-ghost text-xl text-red-600"><RiDeleteBin5Line /></button>
                                    </th> */}
                                    <th>
                                        <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateCampaigns/${na._id}`}><FaEdit /></Link></td>
                                    </th>
                                    <th>
                                        {/* <td><Link className="btn " to={`/dashboard/updateItems/${na._id}`}></Link></td> */}
                                        {/* <button onClick={() => document.getElementById('my_modal_3').showModal()},{()=> showDonator()} className="btn focus:outline-none focus:border-none text-white hover:text-white border-none hover:bg-teal-800 bg-teal-500 btn-primary">View Donators</button> */}

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

            {/* Modal Data */}
            {/* <dialog id="my_modal_3" className="modal pl-10 lg:pl-0">
                <div className="modal-box border space-y-4">
                    <p className=' text-center font-bold text-3xl'> Donated List</p>
                    {
                        donators.map((na)=><>
                        <p>{na.paidbyuser}</p>
                        <p>{na.donated_amount}</p>
                        </>)
                    }
                </div>
            </dialog> */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
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
                                {/* row 1 */}
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
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyDonationCampaigns;