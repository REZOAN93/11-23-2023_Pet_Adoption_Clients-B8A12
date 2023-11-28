import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useDonation = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { refetch, isPending, error, data: campaigns = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaigns?email=${user?.email}`)
            return res.data
        }
    })
    return [campaigns, refetch]
};

export default useDonation;