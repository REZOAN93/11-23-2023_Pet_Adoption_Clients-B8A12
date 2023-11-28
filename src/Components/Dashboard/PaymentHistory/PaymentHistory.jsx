import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payments, refetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })
    console.log(payments)

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/payments/${id}`)
        console.log(res?.data)
        if (res?.data?.deletedCount > 0) {
            refetch()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Donation Will be Refund to your Account",
                showConfirmButton: false,
                timer: 1500
            });
        }
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
                            <th>Donated Amount</th>
                            <th>Cancel Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments?.map((na, index) => <>
                                <tr>
                                    <th>
                                        <label>
                                            {index + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-24 h-24">
                                                    <img src={na?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">Pet Name: {na?.pet_name}</div>
                                                <div className="text-sm opacity-50"> Pet Category: {na?.pet_category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className=" font-bold"> $ {na?.donated_amount}.00</p>
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(na._id)} className="btn btn-ghost bg-[#adf6fc] hover:bg-red-500 hover:text-white text-red-600">Ask for Refund</button>
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

export default PaymentHistory;