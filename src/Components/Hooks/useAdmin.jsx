import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            if (!user || !user.email) {
                // If user or user.email is not available, return default values.
                return
            }
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            // console.log(res.data)
            return res.data?.isAdmin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;