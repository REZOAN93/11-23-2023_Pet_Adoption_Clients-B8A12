import React, { useState } from 'react';
import Header from '../Shared/Header/Header';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaLocationDot } from 'react-icons/fa6';
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../Shared/New folder/Footer/Footer';

const DonationCampaigns = () => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const { data: petdata = [], fetchNextPage, hasNextPage, status, error } = useQuery({
        queryKey: ['pet'],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const res = await axiosPublic.get(`/allDonation?page=${pageParam}`);
                console.log('API Response:', res.data);
                return res.data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    });
    const sortedPetData = petdata.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const loadMorePets = async () => {
        setLoading(true);
        const currentScrollPosition = window.scrollY;
        setTimeout(async () => {
            await fetchNextPage({ pageParam: page + 1 });
            setPage(page + 1);
            window.scrollTo({
                top: currentScrollPosition + 100,
                behavior: 'smooth',
            });
            setLoading(false);
        }, 5000);
    };

    return (
        <div>
            <div className=''>
                <Header></Header>
            </div>
            <div className=' relative lg:h-[500px] '>
                <div className=' absolute w-full border h-full  bg-gradient-to-t text-center pt-20 text-white from-black'>
                    <h1 className='font-bold mt-5 text-5xl'>Support Our Campaign ,Donate To Our Cause</h1>
                    <p className=' mt-10 text-lg'>We're running a donation campaign to support Pet Adoption. Your contribution can make a real difference! </p>
                    <p className=' px-52 text-lg text-center '>Pet Adoption Fund is a non-profit, no-kill organization, with a 501(c)(3) status, dedicated to saving animals since 1983.  Your donation is tax deductible.  *Fed ID# 95-3842460*</p>
                </div>
                <div>
                    <img className='lg:h-[500px] w-full' src="https://i.ibb.co/QDN160w/image-asset.jpg" alt="" />
                </div>
            </div>
            <div className=' flex gap-5  items-center justify-center py-2'>
                <InfiniteScroll
                    dataLength={sortedPetData.length}
                    next={loadMorePets}
                    hasMore={hasNextPage}
                    loader={<div style={{ textAlign: 'center', marginTop: '20px' }}><h4>Loading...</h4></div>}
                    className='grid p-4 lg:p-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto mt-5 mb-20'
                >
                    {sortedPetData?.map((na) => (
                        <div key={na._id} className="card bg-base-100 shadow-lg">

                            <div key={na._id} className="card bg-base-100">
                                <figure><img src={na.image} className=' h-64 w-full' alt="Shoes" /></figure>
                                <div className=" px-3 py-4">
                                    <div className=' flex justify-between items-baseline'>
                                        <div>
                                            <h2 className="card-title">{na.pet_name}</h2>
                                            <p className=' text-sm'>Date: {formatDateString(na.date_added)}</p>
                                        </div>
                                        <div>
                                            <p className=' px-5 rounded-lg font-bold text-left'>{na.pet_category}</p>
                                        </div>
                                    </div>
                                    <div className=' flex justify-between items-end py-3'>
                                        {/* <Link  className=' bg-[#adf6fc] px-8 rounded-lg text-base btn hover:bg-[#3e9fa8]'>Details</Link> */}
                                        {
                                            na?.donationStatus==="Available" ? <Link to={`/donateDetails/${na._id}`}><button className=' bg-[#adf6fc] px-8 rounded-lg text-base btn hover:bg-[#3e9fa8]'>Details</button></Link> : <button disabled className='btn btn-primary px-8 rounded-lg'>Details</button>
                                        }
                                        <div className=' text-right'>
                                            <h2 className=" flex items-center gap-1">Maximum Donation:  $ {na.max_donation_amount}.00</h2>
                                            <p><span className=' font-bold'>Donated Amount:</span> $ {na.donated_amount}.00</p>
                                            <p className=' font-bold'>Donation Status: {na.donationStatus}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </InfiniteScroll>
                {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}><h4>Loading more...</h4></div>}
            </div>
            <Footer></Footer>
        </div>);
};

export default DonationCampaigns;