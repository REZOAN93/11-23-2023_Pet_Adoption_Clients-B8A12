import React from 'react';

const Initiative = () => {
    return (
        <div className=' grid p-4 lg:p-0 lg:grid-cols-2 gap-5 max-w-6xl mx-auto mb-10'>
            <div >
                <p className=' text-xl lg:text-4xl font-bold text-[#4aeaf8] '>Paws For Thought: <br /> Camden Council’s Latest <br /> Initiative</p>
                <p className=' mt-5 text-lg'>Welcoming a furry companion into your life is a commitment that can bring both joy and brand-new experiences. Whether you're a first-time dog guardian or a seasoned pet lover, Camden Council has created their brand new initiative, Paws For Thought!</p>
                <button className=' btn  bg-[#4aeaf8] text-white w-48 mt-10'>Read More</button>
            </div>
            <div>
                <img className=' w-full rounded-e-lg' src="https://res.cloudinary.com/petrescue/image/upload/c_crop,g_custom/v1698636781/o3l1kd1jlmryg3ujwpmv.jpg" alt="" />
            </div>
        </div>
    );
};

export default Initiative;