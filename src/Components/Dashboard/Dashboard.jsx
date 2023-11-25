import React from 'react';
import { FaBookmark, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaVoicemail } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import useAdmin from '../Hooks/useAdmin';


const Dashboard = () => {
    //TODO get is admin value from the data Base
    const [isAdmin] = useAdmin();
    // const isAdmin=true;
    return (
        <div className='flex'>
            <div className=' w-64 min-h-screen bg-orange-400'>
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
                            <li><NavLink to="/dashboard/userhome"><FaHome></FaHome> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar> Reservation</NavLink></li>
                            <li><NavLink to="/dashboard/paymentinfo"><FaCalendar></FaCalendar> Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart</NavLink></li>
                            <li><NavLink to="/dashboard/paymenthistroy"><FaShoppingCart></FaShoppingCart> My Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/review"><FaCalendar></FaCalendar> Add Review</NavLink></li>
                            <li><NavLink to="/dashboard/review"><FaList></FaList> My Booking</NavLink></li>
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
    );
};

export default Dashboard;