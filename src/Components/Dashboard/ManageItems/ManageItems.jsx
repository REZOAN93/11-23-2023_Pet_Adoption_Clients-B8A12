import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure()
    const { data: menus = [], refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get('/menu')
            return res.data
        }
    })

    const handleDeleteUser = (id) => {
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
                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount > 0) {
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
            <div className='p-10'>
                <div className=' flex justify-evenly'>
                    <h2>All Menus: </h2>
                    <h2>Total User:{menus.length} </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menus.map((na, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td><img className=' rounded-b-full rounded-r-full w-[70px] h-[70px]' src={na.image} alt="" /></td>
                                        <td>{na.name}</td>
                                        <td>$ {na.price}</td>

                                        <td><Link to={`/dashboard/updateItems/${na._id}`}><button className=' text-2xl bg-red-200 p-2 rounded-full'><FaEdit /></button></Link></td>

                                        <td><button onClick={() => handleDeleteUser(na._id)} className=' bg-slate-300 p-2 text-xl rounded-full text-red-700'><FaTrashAlt /></button></td>
                                    </tr></>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;