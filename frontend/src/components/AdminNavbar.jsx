import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { MdFastfood } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";

const AdminNavbar = () => {
    const { email: userEmail, token, emptyUser } = useUserStore();
    const navigator = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        (async () => {
            const fetchAuth = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
                {
                    method: "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                }
            );
            const authJson = await fetchAuth.json();
            if (authJson.error) {
                console.error(authJson.message);
                return;
            }
            emptyUser();
            navigator("/");
        })();
    };

    const checkActivePath = (path) => {
        if (location.pathname.includes(path)) return "active";
        else return "";
    };

    return (
        <div className="admin-navbar">
            <h3 className="mb-4">Admin CBM</h3>
            <p>{userEmail}</p>
            <hr className="my-6" />
            <div className="flex flex-col gap-3" style={{ flex: 1 }}>
                <Link
                    to={"/admin/article"}
                    className={`item ${checkActivePath("article")}`}
                >
                    <MdFastfood />
                    <p>Products</p>
                </Link>
            </div>
            <hr className="my-6" />
            <button
                className="btn lonjong putih mt-4"
                onClick={() => {
                    handleLogout();
                }}
            >
                <p>LOGOUT</p>
                <FaArrowRightLong />
            </button>
        </div>
    );
};
export default AdminNavbar;
