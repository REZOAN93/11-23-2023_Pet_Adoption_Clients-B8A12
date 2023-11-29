import React from 'react';
import { FaBookmark, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaVoicemail } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import useAdmin from '../Hooks/useAdmin';
import Header from '../Shared/Header/Header';


const Dashboard = () => {
    //TODO get is admin value from the data Base
    const [isAdmin] = useAdmin();
    // const isAdmin=true;
    return (
        <div>
            <div className=' border-b-2 border-[#adf6fc]'>
                <Header></Header>
            </div>
            <div className='flex'>
                <div className=' w-64 min-h-screen bg-[#adf6fc]'>
                    <ul className='menu p-4 space-y-3'>
                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/addnewpet">Add a pet</NavLink></li>
                                <li><NavLink to="/dashboard/addedpet">My added Pets</NavLink></li>
                                <li><NavLink to="/dashboard/adoptionrequest">Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation">Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns">My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy">My Donations</NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaCalendar></FaCalendar> All Users</NavLink></li>
                                <li><NavLink to="/dashboard/allPets"><FaCalendar></FaCalendar> All Pets</NavLink></li>
                                <li><NavLink to="/dashboard/alldonationcampaigns"><FaCalendar></FaCalendar> All Donation Campaigns</NavLink></li>
                            </> : <>
                                <li><NavLink to="/dashboard/addnewpet">Add a pet</NavLink></li>
                                <li><NavLink to="/dashboard/addedpet">My added Pets</NavLink></li>
                                <li><NavLink to="/dashboard/adoptionrequest">Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation">Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns">My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy">My Donations</NavLink></li>
                            </>
                        }
                        <div className=' divider'></div>
                        {/* Shared NavLink */}
                        <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                        
                    </ul>
                </div>
                <div className=' flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;