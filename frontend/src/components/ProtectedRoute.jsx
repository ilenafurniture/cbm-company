// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useUserStore from "../../store/userStore";

const ProtectedRoute = ({ allowedFilter, children }) => {
    const { role } = useUserStore();
    if (allowedFilter.user) {
        if (!role) {
            return <Navigate to="/" replace />;
        }
        if (!allowedFilter.roles.includes(role)) {
            switch (role) {
                case "admin":
                    return <Navigate to="/admin/article" replace />;
                case "user":
                    return <Navigate to="/" replace />;
                default:
                    return <Navigate to="/" replace />;
            }
        }
    } else {
        if (role) {
            switch (role) {
                case "admin":
                    return <Navigate to="/admin/article" replace />;
                case "user":
                    return <Navigate to="/" replace />;
                default:
                    return <Navigate to="/" replace />;
            }
        }
    }
    return children;
};

export default ProtectedRoute;
