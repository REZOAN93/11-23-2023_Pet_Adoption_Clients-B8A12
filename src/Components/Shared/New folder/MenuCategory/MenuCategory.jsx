import React, { useEffect, useState } from 'react';
import MenuItem from '../../MenuItem/MenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({ arrayDAta,title }) => {
    return (
        <div>
            <section className=' grid grid-cols-2 gap-10 justify-between max-w-6xl mx-auto'>
                {
                    arrayDAta?.map(na => <MenuItem items={na} key={na._id}></MenuItem>)
                }
            </section>
            <div className=' text-white flex justify-center my-5'>
                <Link to={`/order/${title}`}><p className=' btn btn-outline  border-0 py-2 px-5 text-center border-b-2 rounded-lg'>ORDER YOUR FAVOURITE FOOD</p></Link>
            </div>
        </div>
    );
};

export default MenuCategory;