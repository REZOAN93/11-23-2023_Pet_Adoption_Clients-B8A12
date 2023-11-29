import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, } from 'swiper/modules';

const Events = () => {
    const axiosPublic = useAxiosPublic();
    const [events, setEvents] = useState([])
    useEffect(() => {
        axiosPublic.get('/events')
            .then(res => setEvents(res.data))
    }, [axiosPublic])
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className=' grid grid-cols-2'>
                <div>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 7500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="swiper"
                    >
                        {
                            events?.map(na => <>
                                <SwiperSlide key={na._id} className=' w-full ' >
                                    <div className='w-full  py-4 text-black rounded-lg top-0 text-center h-full flex justify-center flex-col items-center'>
                                        <p className=' font-bold text-2xl '>Date: {na.date}</p>
                                        <p className=' font-bold  text-xl text-center lg:text-xl'>{na.name}</p>
                                        <p className=' font-bold text-xl lg:text-xl'>Location: {na.location}</p>
                                        <img className='  rounded-full my-5 lg:w-48 lg:h-48 ' src={na.image} alt="" />
                                        <p className=' w-5/6 mt-1 text-justify mx-auto text-base'>{na.description}</p>
                                    </div>
                                </SwiperSlide>
                            </>)
                        }
                    </Swiper>
                </div>
                <div>
                    <div>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Furry Friends Fair: </span>Come join us at Central Park for a magical Furry Friends Fair. Enjoy a day of fun activities, connect with fellow pet lovers, and meet adorable animals looking for their forever homes. Your presence could make it a fairytale day for a furry friend seeking a home! 🐾</p>
                        <p className=' rounded-lg mt-8 shadow-lg p-3'><span className=' font-bold'>New Year, New Paws: </span>Start the year on a positive note at City Park. Discover the joy of adoption, attend pet care workshops, and make 2024 a year filled with love, companionship, and wagging tails. Your new furry friend is waiting! 🐾✨</p>
                    </div>
                    <div className=' mt-8'>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>🐾 Looking for Unconditional Love? Adopt a Pet Today! 🐾 </span>Explore our adoption gallery with adorable pets ready for loving homes. Each one has a unique story and is ready to bring joy into your life. Visit our adoption center, meet our furry friends, and start a journey of unconditional love. Your new best friend is waiting with a wagging tail! 🏡❤️🐶</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;