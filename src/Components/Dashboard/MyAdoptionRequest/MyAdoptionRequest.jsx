import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MyAdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { refetch, isPending, error, data: adoptionRequest = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptionRequest?email=${user?.email}`)
            return res.data
        }
    })

    const [status, setStatus] = useState(false)

    const handleInvitation = (id) => {
        console.log(id)
        setStatus(!status)
        if (status == true) {
            const adoptionRequest = 'Accept'
            const invitation = { adoptionRequest }
            console.log(invitation)
            axiosSecure.patch(`/updateInvitationRequest/${id}`, invitation)
                .then(res => {
                    refetch()
                    console.log(res.data)
                    if (res?.data?.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The Invitation is Accepted",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            const adoptionRequest = 'Reject'
            const invitation = { adoptionRequest }
            console.log(invitation)
            axiosSecure.patch(`/updateInvitationRequest/${id}`, invitation)
                .then(res => {
                    console.log(res.data)
                    refetch()
                    if (res?.data?.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The Invitation is Rejected",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>sl#</th>
                        <th>Pet Details</th>
                        <th>Request For Adopt</th>
                        <th>Request Status</th>
                        <th>Accept/Reject the adoption Request</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        adoptionRequest?.map((na, index) => <>
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
                                            <div className="text-sm opacity-50"><span>{na.pet_location}</span></div>
                                            <div className="text-sm opacity-50">Pet Category: {na.pet_category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{na.UserName}</div>
                                    <div className="text-sm opacity-50"><span>{na.email}</span></div>
                                    <div className="text-sm opacity-50">Request Date: {na.requestDate}</div>
                                    <div className="text-sm opacity-50">Phone: {na.Phone}</div>
                                    <div className="text-sm opacity-50">Address: {na.address}</div>
                                </td>
                                <th>
                                    <td><p>{na.adoptionRequest}</p></td>
                                </th>

                                <th>
                                    {
                                        na?.adoptionRequest === 'Pending' || na?.adoptionRequest === 'Reject' ? (
                                            <td>
                                                <button onClick={() => handleInvitation(na._id)} className='btn'>
                                                    Accept Invitation for Adopt
                                                </button>
                                            </td>
                                        ) : (
                                            <td>
                                                <button onClick={() => handleInvitation(na._id)} className='btn'>
                                                    Reject Invitation for Adopt
                                                </button>
                                            </td>
                                        )
                                    }

                                </th>
                            </tr>
                        </>)
                    }
                </tbody>

            </table>
        </div>
    );
};

export default MyAdoptionRequest;