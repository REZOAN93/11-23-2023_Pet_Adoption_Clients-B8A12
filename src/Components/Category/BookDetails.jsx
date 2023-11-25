import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Header from '../Header/Header';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const BookDetails = () => {
    const data=useLoaderData()
    const {user}=useContext(AuthContext)
    const { _id: bookId, bookLink, name, price, category, author, description, photoURL, rating, qty, details } = data;
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const dateString = new Date();
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, "0");
    const day = String(dateString.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    const emailUser = user?.email;
    const userName = user?.displayName;
    

    const [stockQty, setQty] = useState(null);
    const isQtyAvailable = stockQty > 0;

    useEffect(() => {
        axiosSecure.get(`/userBorrowedBooks?email=${user?.email}`)
            .then(res => {
                console.log(res.data)
                const allBooks = res.data
                const thisBook = allBooks.find(na => na.bookId === bookId)
                setQty(thisBook.bookedQty)
            })
    }, [axiosSecure, user.email, bookId])



    const handleSubmitBorrowedRequest = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const returnDate = form.returnDate.value;
        const UserName = form.name.value;
        const currentQty = data.qty
        const OrderDate = formattedDate
        const updateQty = currentQty - 1
        const bookedQty = 1
        const updateBookqty = { qty: updateQty }
        const borrowedBook = { bookId, email, returnDate, OrderDate, UserName, bookedQty, name, price, category, author, description, photoURL, rating, details }
        console.log(borrowedBook)

        axiosSecure.put(`/update/${data._id}`, updateBookqty)
            .then(res => {
                if (res.data) {
                    axiosSecure.post(`/addBorrowedBook/${bookId}`, borrowedBook)
                        .then(res => {
                            if (res.data) {
                                navigate('/userBorrowedBooks')
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Book is added to the Borrowed list Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                }
            })

    }


    const mappedRating = Math.min(Math.max(rating, 1), 10); // Ensure rating is between 1 and 10
    const visualRating = Math.ceil(mappedRating); // Map 1-10 scale to 1-5 scale
    return (
        <div className='max-w-7xl mx-auto'>
            <Header></Header>
            <div className=' grid lg:grid-cols-4 py-10'>
                <div className='border bg-slate-200 rounded-lg mb-5 lg:mb-0 lg:col-span-3'>
                    <div className=' grid lg:grid-cols-3 gap-10'>
                        <div className=' p-2'>
                            <img className=' w-full h-full' src={photoURL} alt="" />
                        </div>
                        <div className='col-span-2 px-3 lg:px-0 py-3 space-y-5'>
                            <div className=' space-y-2'>
                                <div className=' lg:flex justify-between lg:pr-10'>
                                    <p className=' font-bold text-2xl'>{name}</p>
                                    <p className=' lg:bg-white rounded-lg text-black lg:px-2 font-bold text-xl'>Qty: {qty}</p>
                                </div>
                                <p>by <span className=' font-bold'>{author}</span></p>
                                <p>{details}</p>
                            </div>
                            <div>
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
                                    <p className='ml-3 font-bold'>See Customer Reviews</p>
                                </div>
                            </div>
                            <div>
                                <p className='mb-3 font-bold lg:text-xl'>Select Format</p>
                                <div className=' flex gap-3'>
                                    <div className=' bg-green-300 rounded-lg lg:font-bold p-1 lg:p-2 lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Hard Cover</p></div>
                                    <div className=' bg-green-300 rounded-lg lg:font-bold p-1 lg:p-2 lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Paper Back</p></div>
                                    <div className=' bg-green-300 rounded-lg lg:font-bold p-1 lg:p-2 lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Audio CD</p></div>
                                    <div className=' bg-green-300 rounded-lg lg:font-bold p-1 lg:p-2 lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Library Binding</p></div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-3 font-bold lg:text-xl'>Select Condition</p>
                                <div className=' flex gap-3'>
                                    <div className=' bg-green-300 rounded-lg p-1 lg:font-bold lg:p-2 btn-sm lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Like New</p></div>
                                    <div className=' bg-green-300 rounded-lg p-1 lg:font-bold lg:p-2 btn-sm lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Very Good</p></div>
                                    <div className=' bg-green-300 rounded-lg p-1 lg:font-bold lg:p-2 btn-sm lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Good</p></div>
                                    <div className=' bg-green-300 rounded-lg p-1 lg:font-bold lg:p-2 btn-sm lg:btn-outline hover:bg-green-500 cursor-pointer'><p>Acceptable</p></div>
                                    <div className=' bg-green-300 rounded-lg p-1 lg:font-bold lg:p-2 btn-sm lg:btn-outline hover:bg-green-500 cursor-pointer'><p>New</p></div>
                                </div>
                            </div>
                            <div className='lg:pe-10'>
                                <p><span className=' font-bold'>Sumarry:</span> {description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-2'>
                    {/* <h1>Card Part</h1> */}
                    <button
                        onClick={() => document.getElementById('my_modal_3').showModal()}
                        className={`rounded-lg flex items-center justify-center gap-5 text-2xl text-white font-bold py-5 w-full mb-5 p-2 ${isQtyAvailable || qty <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-900'}`}
                        disabled={isQtyAvailable || qty <= 0}
                    > <span><img className=' w-8 h-8 rounded-lg' src="https://i.ibb.co/B6mtsjS/borrow.png" alt="" /></span>Borrow
                    </button>
                    <Link onClick={() => window.open(`${bookLink}`)} className=' flex items-center justify-center gap-5 bg-green-500 hover:bg-green-900 rounded-lg text-2xl font-bold text-white py-5  w-full mb-5 p-2'><span><img className=' w-8 h-8' src="https://i.ibb.co/3vWzY9x/read.png" alt="" /></span> Read</Link>
                    {/* <button >Read</button> */}
                    {/* <BorrowModal data={data} handleSubmitBorrowedRequest={handleSubmitBorrowedRequest}></BorrowModal> */}
                </div>
            </div>
            {/* Modal Data */}
            <dialog id="my_modal_3" className="modal pl-10 lg:pl-0">
                <div className="modal-box border ">
                    <h3 className="font-bold text-center text-xl">Request for Borrow</h3>
                    <div className="modal-action">
                        <form onSubmit={handleSubmitBorrowedRequest} method="dialog">
                            <div className=' grid lg:grid-cols-2 gap-2 pb-3'>
                                <div>
                                    <label htmlFor="">Return Date</label>
                                    <input className="input input-bordered bg-[#DCE8FF] w-full" type="date" name="returnDate" id="" required />
                                </div>
                                <div>
                                    <label htmlFor="">Name</label>
                                    <input name='name' className="input input-bordered w-full   bg-[#DCE8FF]" defaultValue={userName} readOnly />
                                </div>
                                {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                            </div>
                            <div className="form-control mb-5">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" defaultValue={emailUser} name='email' className="input bg-[#DCE8FF] input-bordered" readOnly />
                            </div>
                            <div className=' flex justify-center'>
                                {/* <input className='btn bg-emerald-300 hover:bg-emerald-500 w-full' type="submit" /> */}
                                <button className='btn bg-emerald-300 hover:bg-emerald-500 w-full'>Submit</button>
                            </div>
                            {/* <button>Submit</button> */}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );

};


export default BookDetails;