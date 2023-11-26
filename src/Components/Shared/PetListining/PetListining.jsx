import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaLocationDot } from "react-icons/fa6";
import InfiniteScroll from 'react-infinite-scroll-component';


const PetListining = () => {
    const axiosPublic = useAxiosPublic()
    const formatDateString = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const { data: petdata = [], fetchNextPage, hasNextPage, status, error } = useQuery({
        queryKey: ['pet'],
        queryFn: async ({ pageParam = 1 }) => {
            try {
                const res = await axiosPublic.get(`/pet?page=${pageParam}`);
                console.log('API Response:', res.data);
                return res.data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    });

    const [category, setCategories] = useState([])
    useEffect(() => {
        axiosPublic.get('/Category')
            .then(res => setCategories(res.data))
    }, [axiosPublic])

    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(''); // Default is all categories
    const [page, setPage] = useState(1);

    const sortedPetData = petdata
        .filter((pet) =>
            pet.pet_name.toLowerCase().includes(searchName.toLowerCase()) &&
            (selectedCategory === '' || pet.pet_category === selectedCategory)
        )
        .sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

        const loadMorePets = () => {
            // Get the current scroll position
            const currentScrollPosition = window.scrollY;
        
            // Add a delay of 5 seconds (5000 milliseconds) before fetching more pets
            setTimeout(async () => {
                await fetchNextPage({ pageParam: page + 1 });
                setPage(page + 1);
        
                // Scroll to the bottom after adding new items
                window.scrollTo({
                    top: currentScrollPosition + 1000, // Adjust this value based on your needs
                    behavior: 'smooth',
                });
        
                console.log('Loading more pets. Current page:', page + 1, 'Has more pages:', hasNextPage);
            }, 5000);
        };

    return (
        <div>
            <Header></Header>
            <div className=' flex gap-5 border-t-2 border-b-2 items-center justify-center py-2'>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="px-3 py-2 w-80 border rounded"
                    />
                </div>
                <div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border rounded"
                    >
                        <option value="">All Categories</option>
                        {/* Add your category options dynamically here */}
                        {
                            category.map(na => <option key={na._id} value={na.category}>{na.category}</option>)
                        }
                        {/* <option value="category2">Category 2</option> */}
                        {/* Add more options as needed */}
                    </select>
                </div>
            </div>
            <InfiniteScroll
                dataLength={sortedPetData.length}
                next={loadMorePets}
                hasMore={hasNextPage}
                loader={<h4>Loading...</h4>}
                className='grid grid-cols-3 gap-3 max-w-7xl mx-auto mt-5 mb-20'
            >
                {sortedPetData.map((na) => (
                    <div key={na._id} className="card bg-base-100 border">
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
                                <button className=' bg-[#adf6fc] px-8 rounded-lg text-base btn hover:bg-[#3e9fa8]'>Details</button>

                                <div className=' text-right'>
                                    <h2 className=" flex items-center gap-1"><FaLocationDot /> {na.pet_location}</h2>
                                    <p><span className=' font-bold'>Age:</span> {na.pet_age} Year</p>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default PetListining;