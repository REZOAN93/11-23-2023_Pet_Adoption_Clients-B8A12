import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllPets = () => {
    const axiosSecure = useAxiosSecure()
    // const [pause, setPause] = useState(false)

    const { data: petList = [], refetch } = useQuery({
        queryKey: ['allpets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allpets')
            return res.data
        }
    })
    console.log(petList)

    const handlePause = (id, adoptionStatus) => {
        const newStatus = adoptionStatus === 'Adopted' ? 'Not Adopted' : 'Adopted';
        const dataupdate = { status: newStatus };

        axiosSecure.patch(`/updateadminAdoptionstatus/${id}`, dataupdate)
            .then(res => {
                refetch();
                console.log(res.data);
                const successMessage = newStatus === 'Adopted' ? 'The Pet is Adopted' : 'The Pet Removed from Adoption';
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: successMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };


    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The Pet information is Delete ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/petInformation/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "the Pet has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div className='px-10 py-5'>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL#</th>
                            <th>Pet Details</th>
                            <th>Email of Pet Adder</th>
                            <th>Changes Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            petList?.map((na, index) => <>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-24 h-24">
                                                    <img src={na?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-base">{na?.pet_name}</div>
                                                <div>
                                                    <div className="text-sm opacity-50">Age: {na?.pet_age}</div>
                                                    <div className="text-sm opacity-50">Category: {na?.pet_category}</div>
                                                    <div className="text-sm opacity-50">Location: {na?.pet_location}</div>
                                                    <div className="text-sm">Adoption Status: <span className=" font-bold text-emerald-800">{na?.adoption_status}</span></div>
                                                    <div className="text-sm opacity-50">Date Added: {na?.date_added}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td> <p>{na.petAdderby}</p></td>

                                    <td>
                                        {na?.adoption_status === 'Adopted' ? (
                                            <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn bg-red-200 hover:bg-red-500'>
                                                Click for Cancel Adoption?
                                            </button>
                                        ) : (
                                            <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn w-34 border-none hover:bg-[#54e0ec] bg-[#adf6fc]'>
                                                Click for Adopt
                                            </button>
                                        )}
                                    </td>
                                    <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateItems/${na._id}`}><FaEdit /></Link></td>
                                    <td><button onClick={() => handleDeleteUser(na._id)} className=' bg-slate-300 p-2 text-xl rounded-full text-red-700'><FaTrashAlt /></button></td>
                                </tr></>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPets;