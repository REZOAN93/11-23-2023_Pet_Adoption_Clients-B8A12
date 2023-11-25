import { FaCross, FaRemoveFormat } from 'react-icons/fa';

import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useCards from '../../Hooks/useCards';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const Cart = () => {
    const [cart, refetch] = useCards()
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((total, items) => total + items.price, 0)
    console.log(cart, totalPrice)
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
        <div>
            <div className=' p-8 flex justify-evenly'>
                <p className=' text-5xl'>Total Orders: {cart.length}</p>
                <p className=' text-5xl'>Total Price:{totalPrice}</p>
                {
                    cart.length ? <Link to={'/dashboard/payment'}><button className='btn btn-primary'>Pay</button></Link> : <button disabled className='btn btn-primary'>Pay</button>
                }

            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((na, index) => <>
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
                                                <div className="font-bold">{na.name}</div>
                                                <div className="text-sm opacity-50">{na.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        $ {na.price}
                                    </td>
                                    <td>Purple</td>
                                    <th>
                                        <button onClick={() => handleDelete(na._id)} className="btn btn-ghost text-xl text-red-600"><RiDeleteBin5Line /></button>
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