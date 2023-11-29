import React from 'react';
import { VscRequestChanges } from "react-icons/vsc";
import { FaBookmark, FaCalendar, FaDonate, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaVoicemail } from 'react-icons/fa';
import { SiCampaignmonitor } from "react-icons/si";
import { NavLink, Outlet } from 'react-router-dom';
import { MdAdd, MdBookmarkAdded, MdDataset, MdEmail } from "react-icons/md";
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
                    <ul className='menu p-2 pt-5 space-y-1'>
                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/addnewpet"><MdAdd/> Add a pet</NavLink></li>
                                <li><NavLink to="/dashboard/addedpet"><MdBookmarkAdded/>My added Pets</NavLink></li>
                                <li><NavLink to="/dashboard/adoptionrequest"><VscRequestChanges /> Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation"><MdAdd/> Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns"><MdBookmarkAdded/> My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy"><FaDonate/> My Donations</NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaUsers/> All Users</NavLink></li>
                                <li><NavLink to="/dashboard/allPets"><MdDataset/> All Pets</NavLink></li>
                                <li><NavLink to="/dashboard/alldonationcampaigns"><SiCampaignmonitor/> All Donation Campaigns</NavLink></li>
                            </> : <>
                                <li><NavLink to="/dashboard/addnewpet"><MdAdd/> Add a pet</NavLink></li>
                                <li><NavLink to="/dashboard/addedpet"><MdBookmarkAdded/> My added Pets</NavLink></li>
                                <li><NavLink to="/dashboard/adoptionrequest"><VscRequestChanges/> Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation"><MdAdd/> Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns"><MdBookmarkAdded/> My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy"><FaDonate/> My Donations</NavLink></li>
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