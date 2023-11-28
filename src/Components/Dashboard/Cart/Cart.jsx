import { FaCross, FaEdit, FaRemoveFormat } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCards from '../../Hooks/useCards';
import { FaPenToSquare } from "react-icons/fa6";

const Cart = () => {
    const [cart, refetch] = useCards()
    const axiosSecure = useAxiosSecure()

    const handleAdopt = (id) => {
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


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }

        });
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
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Click for Adopt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart?.map((na, index) => <>
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
                                                <div className="text-sm opacity-50">{na.pet_category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {na.adoption_status}
                                    </td>
                                    <th>
                                        <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateItems/${na._id}`}><FaEdit /></Link></td>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDelete(na._id)} className="btn btn-ghost text-xl text-red-600"><RiDeleteBin5Line /></button>
                                    </th>
                                    <th>
                                        {na?.adoption_status === 'Adopted' ? (
                                            <button  className='btn bg-red-200 hover:bg-red-500'>
                                                Adopted
                                            </button>
                                        ) : (
                                            <button onClick={() => handleAdopt(na._id, na.adoption_status)} className='btn w-34 border-none hover:bg-[#54e0ec] bg-[#adf6fc]'>
                                                Click for Adopt
                                            </button>
                                        )}
                                       
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

export default Cart;