import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://11-23-2023-pet-adoption-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;