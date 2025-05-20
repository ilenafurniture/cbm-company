import { FaBlenderPhone, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import {
    MdOutlineContactSupport,
    MdOutlineEmail,
    MdOutlineMail,
    MdOutlinePhone,
} from "react-icons/md";
import { TiSocialFacebook, TiUserOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { CgMenu } from "react-icons/cg";
import useUserStore from "../../store/userStore";

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });
    const [menu, setMenu] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [modalLogin, setModalLogin] = useState(false);
    const { token, setUser } = useUserStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setFormLogin({ email: "", password: "" });
        setMessage("");
    }, [modalLogin]);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setMessage("");
        (async () => {
            const fetchLogin = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/user/login`,
                {
                    method: "post",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(formLogin),
                }
            );
            const resLogin = await fetchLogin.json();
            if (fetchLogin.status != 200) {
                setMessage(resLogin.message);
                return;
            }
            setUser({
                email: resLogin.email,
                role: resLogin.role,
                token: resLogin.token,
            });
            console.log(resLogin);
            navigate("/admin/article");
        })();
    };

    const handleLogout = () => {};

    return (
        <>
            {modalLogin && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100svh",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: "102",
                    }}
                    className="flex justify-center items-center"
                >
                    <div
                        className="flex"
                        style={{
                            maxWidth: "700px",
                            width: "80%",
                            height: "70%",
                            minHeight: "500px",
                        }}
                    >
                        {window.innerWidth > 700 && (
                            <div style={{ width: "100%" }}>
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                />
                            </div>
                        )}
                        <div
                            style={{ width: "100%" }}
                            className="bg-white p-10 flex flex-col justify-center"
                        >
                            <h1 className="text-terang mb-1">Login</h1>
                            <p className="text-biru mb-4">
                                Login sebagai member kami
                            </p>
                            {message && (
                                <div className="message-form bg-red-100 text-red-700 mb-4">
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmitLogin}>
                                <div className="formulir mb-3">
                                    <label className="mb-1 text-gelap">
                                        Email
                                    </label>
                                    <input
                                        value={formLogin.email}
                                        onChange={(e) => {
                                            setFormLogin({
                                                ...formLogin,
                                                email: e.target.value,
                                            });
                                        }}
                                        type="email"
                                        className="bggelap"
                                        placeholder="Alamat email"
                                        required
                                    />
                                </div>
                                <div className="formulir mb-5">
                                    <label className="mb-1 text-gelap">
                                        Password
                                    </label>
                                    <input
                                        value={formLogin.password}
                                        onChange={(e) => {
                                            setFormLogin({
                                                ...formLogin,
                                                password: e.target.value,
                                            });
                                        }}
                                        type="password"
                                        className="bggelap"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <button
                                        type="submit"
                                        className="btn lonjong terang"
                                    >
                                        Masuk
                                    </button>
                                    <button
                                        type="button"
                                        className="btn lonjong outline-terang"
                                        onClick={() => {
                                            setModalLogin(false);
                                        }}
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <nav
                style={{ position: "absolute" }}
                className={`transparent ${scrollY > 50 ? "hide" : ""}`}
            >
                <div className="atas">
                    <div className="container mx-auto flex justify-between">
                        <div className="flex gap-2 items-center">
                            <MdOutlineEmail />
                            <p>Email : cbmandiri87@yahoo.com</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaBlenderPhone />
                            <p>Call in : +62 813 2602 5685</p>
                        </div>
                    </div>
                </div>
                <div className="bawah">
                    <div className="container gap-7 mx-auto flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <img src="/img/logo cbm white.png" alt="" />
                            <p style={{ fontWeight: "bold", fontSize: "15px" }}>
                                CV. CBM
                            </p>
                        </div>
                        <div className={`icons gap-4 ${menu ? "show" : ""}`}>
                            {window.innerWidth <= 700 && (
                                <>
                                    <div
                                        style={{ flex: 1, width: "100%" }}
                                        className="flex justify-end items-start"
                                    >
                                        <button
                                            onClick={() => {
                                                setMenu(false);
                                            }}
                                            className="text-biru"
                                        >
                                            <IoClose size={30} />
                                        </button>
                                    </div>
                                    <div className="flex gap-3 items-center mb-2">
                                        <img
                                            src="/img/logo cbm white.png"
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "15px",
                                            }}
                                        >
                                            CV. CBM
                                        </p>
                                    </div>
                                    <hr
                                        style={{
                                            width: "100%",
                                            borderTop: "1px solid white",
                                        }}
                                    />
                                </>
                            )}
                            <Link to={"/"}>HOME</Link>
                            <Link to={"/brand"}>BRANDS</Link>
                            <Link to={"/article"}>ARTICLES</Link>
                            {window.innerWidth <= 700 && (
                                <div style={{ flex: 1 }}></div>
                            )}
                        </div>
                        {window.innerWidth <= 700 ? (
                            <div
                                className=""
                                onClick={() => {
                                    setMenu(true);
                                }}
                            >
                                <CgMenu size={20} />
                            </div>
                        ) : (
                            <div className="flex gap-1 items-center">
                                <div className="btn icon">
                                    <IoSearch />
                                </div>
                                <div
                                    className="btn icon"
                                    onClick={() => {
                                        setModalLogin(true);
                                    }}
                                >
                                    <TiUserOutline />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <nav
                className={`gelap ${scrollY > 50 ? "show" : ""}`}
                style={{ position: "fixed" }}
            >
                <div className="bawah">
                    <div className="container gap-7 mx-auto flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                            <img src="/img/logo cbm white.png" alt="" />
                            <p style={{ fontWeight: "bold", fontSize: "15px" }}>
                                CV. CBM
                            </p>
                        </div>
                        <div className={`icons gap-4 ${menu ? "show" : ""}`}>
                            {window.innerWidth <= 700 && (
                                <>
                                    <div
                                        style={{ flex: 1, width: "100%" }}
                                        className="flex justify-end items-start"
                                    >
                                        <button
                                            onClick={() => {
                                                setMenu(false);
                                            }}
                                            className="text-biru"
                                        >
                                            <IoClose size={30} />
                                        </button>
                                    </div>
                                    <div className="flex gap-3 items-center mb-2">
                                        <img
                                            src="/img/logo cbm white.png"
                                            alt=""
                                        />
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "15px",
                                            }}
                                        >
                                            CV. CBM
                                        </p>
                                    </div>
                                    <hr
                                        style={{
                                            width: "100%",
                                            borderTop: "1px solid white",
                                        }}
                                    />
                                </>
                            )}
                            <Link to={"/"}>HOME</Link>
                            <Link to={"/brand"}>BRANDS</Link>
                            <Link to={"/article"}>ARTICLE</Link>
                            {window.innerWidth <= 700 && (
                                <div style={{ flex: 1 }}></div>
                            )}
                        </div>
                        {window.innerWidth <= 700 ? (
                            <div
                                className=""
                                onClick={() => {
                                    setMenu(true);
                                }}
                            >
                                <CgMenu size={20} />
                            </div>
                        ) : (
                            <div className="flex gap-1 items-center">
                                <div className="btn icon">
                                    <IoSearch />
                                </div>
                                <div
                                    className="btn icon"
                                    onClick={() => {
                                        setModalLogin(true);
                                    }}
                                >
                                    <TiUserOutline />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="float-btn">
                <Link
                    to={"https://api.whatsapp.com/send?phone=6281326025685"}
                    className="expand"
                >
                    <MdOutlinePhone size={30} />
                </Link>
                <Link to={"mailto:cbmandiri87@yahoo.com"} className="expand">
                    <MdOutlineMail size={30} />
                </Link>
                <button>
                    <MdOutlineContactSupport size={30} />
                </button>
            </div>
        </>
    );
};

export default Navbar;
