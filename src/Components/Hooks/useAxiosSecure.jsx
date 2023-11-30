import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://11-23-2023-pet-adoption-server.vercel.app',
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { userSignOut } = useAuth()
    // Request interceptor to add authorization header for every secure call to the API
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('accessToken')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    // Interceptor 401 & 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('Status Error in the interceptors', status)
        // For 401 &403 Logout the user & move the user to the login page
        if (status === 401 || status === 403) {
            await userSignOut()
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure
};

export default useAxiosSecure;