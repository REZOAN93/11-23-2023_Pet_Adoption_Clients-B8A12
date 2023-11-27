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
                                <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/additems"><FaCalendar></FaCalendar> Add Items</NavLink></li>
                                <li><NavLink to="/dashboard/manageItems"><FaCalendar></FaCalendar> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
                                <li><NavLink to="/dashboard/manageBookings"><FaShoppingCart></FaShoppingCart> Manage Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy"><FaShoppingCart></FaShoppingCart> My Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/allusers"><FaCalendar></FaCalendar> All Users</NavLink></li>
                            </> : <>
                                <li><NavLink to="/dashboard/addnewpet"><FaHome></FaHome>Add a pet</NavLink></li>
                                <li><NavLink to="/dashboard/addedpet"><FaCalendar></FaCalendar>My added pets</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>My Donation Campaigns</NavLink></li>
                                {/* <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li> */}
                                <li><NavLink to="/dashboard/paymenthistroy"><FaShoppingCart></FaShoppingCart> My Donations</NavLink></li>
                                {/* <li><NavLink to="/dashboard/review"><FaCalendar></FaCalendar> Add Review</NavLink></li>
                                <li><NavLink to="/dashboard/review"><FaList></FaList> My Booking</NavLink></li> */}
                            </>
                        }
                        <div className=' divider'></div>
                        {/* Shared NavLink */}
                        <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                        <li><NavLink to="/order/salad"><FaSearch></FaSearch>Menu</NavLink></li>
                        <li><NavLink to="/order/contact"><MdEmail />Contact</NavLink></li>
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