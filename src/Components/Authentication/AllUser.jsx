import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';


const AllUser = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    console.log(users)

    const handleMakeAdmin = (id) => {
        Swal.fire({
            title: "Would you make this user Admin?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            Swal.fire({
                                title: "Done!",
                                text: "The user is set as Admin.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }


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
                axiosSecure.delete(`/users/${id}`)
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
        <div className='p-10'>
            <div className=' flex justify-evenly'>
                <h2>All Users: </h2>
                <h2>Total User:{users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((na, index) => <>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={na.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </td>
                                    <td>{na.name}</td>
                                    <td>{na.email}</td>
                                    {
                                        na.role == 'admin' ? <p className='px-2 py-3 text-xl'>Admin</p> : <td><button onClick={() => handleMakeAdmin(na._id)} className=' text-2xl bg-red-200 p-2 rounded-full'><MdPeopleAlt /></button></td>
                                    }
                                    <td><button onClick={() => handleDeleteUser(na._id)} className=' bg-slate-300 p-2 text-xl rounded-full text-red-700'><FaTrashAlt /></button></td>
                                </tr></>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;