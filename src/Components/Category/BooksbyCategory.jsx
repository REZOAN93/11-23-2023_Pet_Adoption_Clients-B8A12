import React from 'react';
import Header from '../Header/Header';
import { useLoaderData } from 'react-router-dom';
import BooksList from './BooksList';

const BooksbyCategory = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Header></Header>
            <div>
                <div>
                    {/* <div className="carousel lg:h-[500px] w-full">
                        <div id="slide1" className="carousel-item relative w-full">
                            <img
                                src="https://i.ibb.co/jz9QnNv/ian-dooley-TT-ROx-Wj9n-A-unsplash.jpg"
                                className="w-full"
                            />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide2" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <img
                                src="https://i.ibb.co/zx0z5Y3/burgess-milner-OYYE4g-I5-ZQ-unsplash.jpg"
                                className="w-full"
                            />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide3" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <img
                                src="https://i.ibb.co/Wt3nYQT/xiaolong-wong-pdx1-LH-TMJM-unsplash.jpg"
                                className="w-full"
                            />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide4" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                        <div id="slide4" className="carousel-item relative w-full">
                            <img
                                src="https://i.ibb.co/NWzKVZ1/brooke-cagle-z1-B9f48-F5dc-unsplash.jpg"
                                className="w-full"
                            />
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide1" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div>
                    <div className="max-w-7xl py-10 mx-auto">
                        {/* <h1 className=" lg:text-3xl text-xl px-2 lg:px-0 underline underline-offset-2 font-titleFont font-bold lg:py-10">
                            Book List:
                        </h1> */}
                        <div className=" grid grid-cols-1 px-2 lg:px-0 lg:grid-cols-3 mb-10  gap-4">
                            {data.length > 0 ? (
                                <>
                                    {data.map((na) => (
                                        <BooksList key={na._id} data={na}></BooksList>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <p className=" w-full rounded-lg text-5xl text-red-700 bg-red-300 p-20">
                                        The Book is comming Soon
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksbyCategory;