import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payments } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })
    console.log(payments)
    return (
        <div className='p-10'>
            <div className=' flex justify-evenly'>
                {/* <h2>Total Payments:{payments?.length} </h2> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Transction Id</th>
                            <th>date</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((na, index) => <>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{na?.email}</td>
                                    <td>{na?.transctionId}</td>
                                    <td>{na?.date}</td>
                                    <td>{na?.status}</td>
                                </tr></>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;