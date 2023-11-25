import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import ParallaxComponent from 'react-parallax-component';

const CallToAction = () => {
    return (
        <div>
            <div>
                <p className=" text-center text-lg font-bold text-black">----  Give a Home, Give Love  ----</p>
                <p className=" mx-auto mt-5 w-4/6 py-2 text-center text-gray-600 border-[#4eecfa] border-b-2 border-t-2">we believe in the transformative power of adoption. Every pet deserves a loving home, and you can be the hero they've been waiting for. Join us in making a difference—adopt a furry friend today!</p>
            </div>
            <div className=' grid grid-cols-2 text-justify max-w-6xl mx-auto my-5 gap-5 text-base'>
                <div>
                    <div className=' space-y-2'>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Change a Life: </span>By adopting, you're not just bringing home a pet; you're saving a life. Give a shelter animal the chance to thrive in a caring environment.</p>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Unconditional Love: </span>Experience the joy of unconditional love. Pets offer companionship, loyalty, and endless moments of joy.</p>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>End Pet Homelessness: </span>Be a part of the solution. Adopting a pet helps reduce the number of animals in shelters, working towards a world where no pet is left behind.</p>
                    </div>
                    <div className=' mt-5 space-y-3'>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Adopt a Pet: </span>Browse our adoption gallery and find your perfect match. From playful puppies to wise old cats, there's a friend waiting for you.</p>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Foster a Friend: </span>Can't commit long-term? Consider fostering. Provide a temporary home for a pet in need and make a huge impact.</p>
                        <p className=' rounded-lg shadow-lg p-3'><span className=' font-bold'>Spread the Word: </span>Share our mission on social media. The more people know about adoption, the more lives we can save.</p>
                    </div>
                </div>
                <div className=' h-full rounded-r-lg'>
                    <img className=' h-full rounded-r-lg' src="https://i.ibb.co/nfLzQsp/shutterstock-655275841.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default CallToAction;