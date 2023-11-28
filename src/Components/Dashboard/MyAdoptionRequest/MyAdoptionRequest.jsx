import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MyAdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, isPending, error, data: adoptionRequest = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptionRequest?email=${user?.email}`)
            return res.data
        }
    })
    console.log(adoptionRequest)
    return (
        <div>
            <h1> this is my adoption page</h1>
        </div>
    );
};

export default MyAdoptionRequest;