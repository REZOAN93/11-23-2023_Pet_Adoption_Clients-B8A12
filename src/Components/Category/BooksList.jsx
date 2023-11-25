import React from 'react';
import { FiDollarSign, FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

const BooksList = ({ data }) => {
    const { _id, name, price, category, author, description, photoURL, rating, qty, details } = data;
    const mappedRating = Math.min(Math.max(rating, 1), 10); // Ensure rating is between 1 and 10
    const visualRating = Math.ceil(mappedRating); // Map 1-10 scale to 1-5 scale

    return (
        <div className="w-full border bg-white p-5 grid grid-cols-3 gap-6 shadow-lg rounded-lg">
            <div className=" w-full h-full flex justify-center">
                <img className="w-full h-full" src={photoURL} alt="" />
            </div>
            <div className=' col-span-2 flex flex-col space-y-2'>
                <h1 style={{ color: "#1C1B1B" }} className=" flex-grow text-lg  font-bold">{name}</h1>
                <div className=" text-emerald-800">
                    <div className=' space-y-2'>
                        
                        <div>
                            <h1 style={{ color: "#1C1B1B" }} className=" text-base ">Available Qty: {qty}</h1>

                        </div>
                        <div>
                            <h1 style={{ color: "#1C1B1B" }} className=" text-base ">Category: {category}</h1>

                        </div>
                        <div>
                            <h1 style={{ color: "#1C1B1B" }} className=" text-base">Author: {author}</h1>
                        </div>
                    </div>
                </div>
                {/* <div style={{ color: "rgba(28, 27, 27, 0.60)" }} className="flex justify-between font-medium text-base">
                    <p className="flex items-center gap-2"><span style={{ color: "rgba(28, 27, 27, 1)" }}><FiDollarSign></FiDollarSign></span>{" "}Price: {price}</p>

                </div> */}
             

                <div className=" flex w-full gap-4">
                    <div className="rating flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                            <input
                                key={index}
                                type="radio"
                                name="rating-2"
                                className={`mask mask-star-2 text-yellow-400 ${index < visualRating ? "bg-yellow-400" : "bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                    <Link
                        to={`/bookdetails/${_id}`}
                        className="btn btn-sm py-2 rounded-lg hover:bg-emerald-900 bg-emerald-800 text-white font-semibold "
                    >
                        Details
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default BooksList;