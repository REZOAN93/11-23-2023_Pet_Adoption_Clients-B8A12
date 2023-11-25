import { useQuery } from "@tanstack/react-query";

import { FaCreativeCommonsSa, FaDollarSign, FaJediOrder, FaPeopleArrows, FaUser, FaUsersCog } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: state } = useQuery({
        queryKey: ['admin-state'],
        queryFn: async () => {
            const res =  await axiosSecure.get('/admin-state')
            return res.data
        }
    })
    console.log(state)

    return (
        <div>
            <h2 className=" text-3xl"> <span>Hi, Welcome</span>
                {
                    user?.displayName ? user.displayName : "Back"
                }
            </h2>
            <div>
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className=" text-5xl"></FaDollarSign>
                        </div>
                        <div className="stat-title">REVENUE</div>
                        <div className="stat-value">{state?.revenue}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                          <FaUsersCog className=" text-5xl"></FaUsersCog>
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">{state?.users}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaJediOrder className=" text-6xl"></FaJediOrder>
                        </div>
                        <div className="stat-title">Orders</div>
                        <div className="stat-value">{state?.orders}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCreativeCommonsSa className=" text-6xl"></FaCreativeCommonsSa>
                        </div>
                        <div className="stat-title">Menu Items</div>
                        <div className="stat-value">{state?.menuItems}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;