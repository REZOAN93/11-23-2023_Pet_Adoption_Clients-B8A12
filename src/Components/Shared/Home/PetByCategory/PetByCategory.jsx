import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Header from '../../Header/Header';
import { FaLocationDot } from 'react-icons/fa6';

const PetByCategory = () => {
    const data = useLoaderData()
    console.log(data)
    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div>
            <div className=' border-b-2'>
                <Header></Header>
            </div>
            <div className='grid grid-cols-3 gap-3 max-w-7xl mx-auto mt-5 mb-20'>
                {data.map((na) => (
                    <div key={na._id} className="card bg-base-100 border">

                        <div key={na._id} className="card bg-base-100 shadow-lg">
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
                                <div className=' flex justify-between py-3'>
                                    <Link to={`/petDetails/${na._id}`} className=' bg-[#adf6fc] px-8 rounded-lg text-base btn hover:bg-[#3e9fa8]'>Details</Link>
                                    <div className=' text-right'>
                                        <h2 className=" flex items-center gap-1"><FaLocationDot /> {na.pet_location}</h2>
                                        <p><span className=' font-bold'>Age:</span> {na.pet_age} Year</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetByCategory;