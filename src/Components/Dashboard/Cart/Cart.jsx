import { FaCross, FaEdit, FaRemoveFormat } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCards from '../../Hooks/useCards';
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import './Cart.css'
import { useEffect } from 'react';


const Cart = () => {
    const [cart, refetch] = useCards()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [addedPet, setPetAdded] = useState([])
    const [itemPerPage, setItemPerPage] = useState(10);
    const numberOfPages = Math.ceil(cart?.length / itemPerPage);
    const [currentpage, setCurrentPage] = useState(0);
    const pages = [...Array(numberOfPages).keys()];
    console.log(currentpage + 1, "currentPage", itemPerPage, "Item Per Page")

    const handleItemPerPage = (event) => {
        const value = parseInt(event.target.value);
        setItemPerPage(value);
        setCurrentPage(0);
    };

    const handlepreviousbtn = () => {
        if (currentpage > 0) {
            setCurrentPage(currentpage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentpage < pages.length - 1) {
            setCurrentPage(currentpage + 1);
        }
    };

    useEffect(() => {
        axiosSecure.get(`/userAddedpet?email=${user?.email}&page=${currentpage + 1}&size=${itemPerPage}`)
            .then(res => {
                console.log(res.data)
                setPetAdded(res.data)
            })
    }, [currentpage, itemPerPage, axiosSecure, user?.email])
    console.log(addedPet)


    // const { refetch: reload, isPending, error, data: addPetByUser = [] } = useQuery({
    //     queryKey: ['addedPet', user?.email],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/userAddedpet?email=${user?.email}&page=${currentpage+1}&size=${itemPerPage}`)
    //         return res.data
    //     }
    // })






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
                            addedPet?.data?.map((na, index) => <>

                                <tr>
                                    <th>
                                        <label>
                                            {/* {index + 1} */}
                                            {index + 1 + currentpage * itemPerPage}
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
                                            <button disabled className='btn bg-red-200 hover:bg-red-500'>
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
            <div className=' flex items-center justify-center mb-5'>
                {
                    cart?.length > 10 ? <>
                        <div className="pagination border px-20 py-1 rounded-lg bg-emerald-200">
                            {/* <p>Current page :{currentpage + 1}</p> */}
                            <button className=' hover:bg-[#50d7e4] btn bg-[#adf6fc] border-none' onClick={handlepreviousbtn} style={{ marginRight: "10px" }}>
                                Previous
                            </button>
                            {pages.map((na) => (
                                <button
                                    id="btnstyle"
                                    onClick={() => setCurrentPage(na)}
                                    className={currentpage === na ? "selectedstyle" : ""}
                                    key={na}
                                >
                                    {na + 1}
                                </button>
                            ))}
                            <button className=' hover:bg-[#50d7e4] btn bg-[#adf6fc] border-none' onClick={handleNextPage}>Next</button>
                            <select
                                className="selectOption border-none focus:outline-none"
                                value={itemPerPage}
                                onChange={handleItemPerPage}
                                name=""
                                id=""
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <p> </p>
                        </div>
                    </> : ''
                }
            </div >
        </div >
    );
};

export default Cart;