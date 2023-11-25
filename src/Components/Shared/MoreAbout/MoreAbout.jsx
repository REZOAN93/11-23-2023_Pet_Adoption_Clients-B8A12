import React from 'react';
import ReactPlayer from 'react-player'

const MoreAbout = () => {
    return (
        <div>
            <div>
                <p className=" text-center text-lg font-bold text-black">----  About Us: Connecting Hearts, Creating Homes  ----</p>
                <p className=" mx-auto mt-5 w-5/6 py-2 text-center text-gray-600 border-[#4eecfa] border-b-2 border-t-2">We are born out of a shared love for animals and a commitment to addressing the issue of pet homelessness. Witnessing the countless animals in shelters yearning for a home inspired us to create a platform that connects deserving pets with compassionate individuals and families.</p>
            </div>
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-3 my-10 max-w-6xl mx-auto'>
                <div className=''>
                    <ReactPlayer
                        width='100%'
                        // playing={true}
                        height='100%'
                        url='https://www.youtube.com/watch?v=YQDDm9HLkV4&t=16s' />
                </div>
                <div className='px-3 lg:px-0 text-justify space-y-3 lg:pl-5'>
                    <h1 className=' lg:text-2xl font-bold lg:pb-2'>How It Works</h1>
                    <div>
                        <p> <span className=' font-bold text-lg'>Browse & Connect: </span> Explore our adoption gallery filled with lovable pets waiting for a second chance. Each profile tells a unique story, and we make it easy for you to find your perfect match.</p>
                    </div>
                    <div>
                        <p><span className=' font-bold text-lg'>Application & Approval:</span> Once you've found a furry friend, fill out our adoption application. Our dedicated team reviews each application to ensure a happy and suitable home for both pet and owner.</p>
                    </div>
                    <div>
                        <p> <span className=' font-bold text-lg'>Meet & Greet: </span>Arrange a meeting with your potential new family member. This gives you the opportunity to connect, ensuring a harmonious bond between you and your future pet.</p>
                    </div>
                    <div>
                        <p><span className=' font-bold text-lg'>Home Sweet Home:</span>Once approved, bring your new companion home. Our commitment doesn't end there; we provide resources and support to ensure a seamless transition for both you and your pet.</p>
                    </div>
                    {/* <button className=' btn bg-emerald-700 text-white hover:bg-emerald-800 '>More About Us</button> */}
                </div>
            </div>
            <div className=' grid grid-cols-1 lg:grid-cols-2 gap-3 my-10 max-w-6xl mx-auto'>
                <div className='px-3 lg:px-0 text-justify space-y-3 lg:pr-5'>
                    <h1 className=' lg:text-2xl font-bold lg:pb-2 '>Why We Exist</h1>
                    <div>
                        <p> <span className=' font-bold text-lg'>Ending Pet Homelessness: </span>We envision a world where no pet is left behind. By providing a platform for adoption, we aim to contribute to the reduction of pet homelessness and the creation of loving, forever homes.</p>
                    </div>
                    <div>
                        <p><span className=' font-bold text-lg'>Promoting Responsible Pet Ownership:</span> We believe in the responsibility that comes with pet ownership. Our educational resources empower adopters to provide the best care for their new family members.</p>
                    </div>
                    <div>
                        <p> <span className=' font-bold text-lg'>Building Connections: </span>Beyond adoption, we're here to foster a community of pet lovers. Share your stories, connect with other adopters, and be a part of a network that celebrates the joy that pets bring to our lives.</p>
                    </div>
                    <div>
                        <p><span className=' font-bold text-lg'>Promoting Mutual Healing:</span> We believe in the healing power of the human-animal bond. Many of the pets in our care have faced adversity, and by offering them a chance at a loving home, we not only transform their lives but also provide a source of joy, comfort, and healing for their adoptive families. We see adoption as a two-way street where both pets and humans find solace and companionship, creating a ripple effect of positivity and well-being in our communities.</p>
                    </div>
                    {/* <button className=' btn bg-emerald-700 text-white hover:bg-emerald-800 '>More About Us</button> */}
                </div>
                <div className=' h-full rounded-r-lg'>
                    <img className=' h-full rounded-r-lg' src="https://i.ibb.co/HhLPbK9/61873ad7a25d8.webp" alt="" />
                </div>
            </div>
        </div>
    );
};

export default MoreAbout;