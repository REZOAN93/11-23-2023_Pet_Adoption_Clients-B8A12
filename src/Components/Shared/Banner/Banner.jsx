import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.css';

import { useEffect, useState } from 'react';
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const Banner = () => {
    const axiosSecure = useAxiosSecure();
    const [slider, setSlider] = useState([])
    useEffect(() => {
        axiosSecure.get('/slider')
            .then(res => setSlider(res.data))
    }, [axiosSecure])

    // console.log(slider)
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
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
                    slider.map(na => <>
                    <SwiperSlide key={na._id} className=' w-full h-64 lg:h-[500px]' >
                        <div className=''>
                        <img className=' w-full h-64 lg:h-[500px]' src={na.image} alt="" />
                        <div className='w-full bg-gradient-to-r from-slate-400 absolute top-0 text-center space-y-5 lg:space-y-16 pt-20 h-full'>
                                <p className=' font-bold text-white text-xl lg:text-6xl'>{na.title}</p>
                                <p className=' w-2/3 lg:w-1/2 mx-auto lg:font-bold text-white lg:text-xl'>{na.subtitle}</p>
                        </div>
                        </div>
                       </SwiperSlide>
                    </>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;