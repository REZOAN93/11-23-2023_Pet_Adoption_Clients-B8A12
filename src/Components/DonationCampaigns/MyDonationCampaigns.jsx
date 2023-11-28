import React, { useState } from 'react';
import useDonation from '../Hooks/useDonation';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ProgressBar from '@ramonak/react-progress-bar';
import Swal from 'sweetalert2';

const MyDonationCampaigns = () => {
    const [campaigns, refetch] = useDonation()
    const axiosSecure = useAxiosSecure()
    const [pause, setPause] = useState(false)

    const handlePause = (id) => {
        setPause(!pause)
        if (pause == true) {
            const status = 'Available'
            const dataupdate = { status }
            console.log(dataupdate)
            axiosSecure.patch(`/updateDonationActive/${id}`, dataupdate)
                .then(res => {
                    refetch()
                    console.log(res.data)
                    if (res?.data?.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The Donation Campaign is Activated",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            const status = 'Unavailable'
            const dataupdate = { status }
            console.log(dataupdate)
            axiosSecure.patch(`/updateDonationActive/${id}`, dataupdate)
                .then(res => {
                    console.log(res.data)
                    refetch()
                    if (res?.data?.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The Donation Campaign is Paused",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }


    const handleAdopt = (id) => {
        console.log(id)
        axiosSecure.patch(`/users/adopts/${id}`)
            .then(res => {
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: "Done!",
                        text: "The Pet is Adopted",
                        icon: "success"
                    });
                    refetch()
                }
            })
    }
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
                            campaigns.map((na, index) => <>
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
                                                {na.donationStatus == 'Available' ? <div className="text-sm opacity-50">The Donation Campaigns is active.</div> : <div className="text-sm opacity-50">The Donation Campaigns is Inactive.</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <ProgressBar completed={na.donated_amount} maxCompleted={na.max_donation_amount} />
                                    </td>

                                    <th>
                                        {
                                            na?.donationStatus == 'Available' ? <> <td><button onClick={() => handlePause(na._id)} className=' btn'>Pause Campaigns</button></td></> : <td><button onClick={() => handlePause(na._id)} className=' btn'>UnPaused Campaigns</button></td>
                                        }
                                    </th>
                                    {/* <th>
                                        <button onClick={() => handleDelete(na._id)} className="btn btn-ghost text-xl text-red-600"><RiDeleteBin5Line /></button>
                                    </th> */}
                                    <th>
                                        <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateCampaigns/${na._id}`}><FaEdit /></Link></td>
                                    </th>
                                    <th>
                                        <td><Link className="btn " to={`/dashboard/updateItems/${na._id}`}>View Donators</Link></td>
                                    </th>
                                </tr>
                            </>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyDonationCampaigns;