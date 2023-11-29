import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Alldonationcampaigns = () => {
    const axiosSecure = useAxiosSecure()
    // const [pause, setPause] = useState(false)

    const { data: allcampaigns = [], refetch } = useQuery({
        queryKey: ['allpets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alldonationcampaigns')
            return res.data
        }
    })
    console.log(allcampaigns)

    const handlePause = (id, donationStatus) => {
        const newStatus = donationStatus === 'Available' ? 'Unavailable' : 'Available';
        const dataupdate = { status: newStatus };

        axiosSecure.patch(`/updateDonationStatus/${id}`, dataupdate)
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


    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The Donation Campaign is Delete ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donationcampaigndelete/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The Donation Campaign has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }



    return (
        <div className=' pb-10'>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL#</th>
                            <th>Pet Details</th>
                            <th>Campaign Added by</th>
                            <th>Changes Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allcampaigns?.map((na, index) => <>
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
                                                    <div className="text-sm">Donation Status: <span className=" font-bold text-emerald-800">{na?.donationStatus}</span></div>
                                                    <div className="text-sm opacity-50">Campaign Add Date: {na?.date_added}</div>
                                                    <div className="text-sm opacity-50">Last Date for Donation: {na?.lastdateforDonation}</div>
                                                    <div className="text-sm opacity-50">Max Donation Amount: {na?.max_donation_amount}</div>
                                                    <div className="text-sm opacity-50">Donated Amount: {na?.donated_amount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td> <p>{na.CampaignAddedby}</p></td>
                                    <th>
                                        {
                                            na?.donationStatus == 'Available' ? <> <td><button onClick={() => handlePause(na._id, na.donationStatus)} className=' btn bg-[#adf6fc] hover:bg-red-400'>Pause Campaigns</button></td></> : <td><button onClick={() => handlePause(na._id, na.donationStatus)} className=' btn bg-[#adf6fc] hover:bg-[#51dce9]'>UnPaused Campaigns</button></td>
                                        }
                                    </th>
                                    {/* <td>
                                        {na?.adoption_status === 'Adopted' ? (
                                            <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn bg-red-200 hover:bg-red-500'>
                                                Click for Cancel Adoption?
                                            </button>
                                        ) : (
                                            <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn w-34 border-none hover:bg-[#54e0ec] bg-[#adf6fc]'>
                                                Click for Adopt
                                            </button>
                                        )}
                                    </td> */}
                                    {/* <td><button className=' btn bg-[#adf6fc] hover:bg-[#4ac6d1]'>Changes the Pet Status</button></td> */}
                                    {/* <th>
                                    {
                                        na?.adoption_status == 'Adopted' ? <> <td><button onClick={() => handlePause(na._id)} className=' btn bg-red-200 hover:bg-red-500'>Click for Cancel Adoption?</button></td></> : <td><button onClick={() => handlePause(na._id)} className=' btn w-34 border-none hover:bg-[#54e0ec] bg-[#adf6fc]'>Click for Adopt </button></td>
                                    }
                                </th> */}
                                    {/* <td><button className=' btn bg-[#adf6fc] hover:bg-[#4ac6d1]'>Update</button></td> */}
                                    <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateCampaigns/${na._id}`}><FaEdit /></Link></td>
                                    <td><button onClick={() => handleDeleteUser(na._id)} className=' bg-slate-300 p-2 text-xl rounded-full text-red-700'><FaTrashAlt /></button></td>
                                </tr></>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Alldonationcampaigns;