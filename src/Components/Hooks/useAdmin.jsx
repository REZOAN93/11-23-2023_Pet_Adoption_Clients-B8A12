import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: AreYouAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            // console.log(res.data)
            return res.data?.isAdmin;
        }
    })
    return [AreYouAdmin, isAdminLoading]
};

export default useAdmin;