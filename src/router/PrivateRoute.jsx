import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/Context/AuthProvider";
import useAuth from "../Components/Hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (
            <div className="py-32 w-full flex justify-center">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;