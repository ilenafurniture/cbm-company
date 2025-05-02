import { FaBlenderPhone, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import {
    MdOutlineContactSupport,
    MdOutlineEmail,
    MdOutlineMail,
    MdOutlinePhone,
} from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
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
                    <div className="container gap-7 mx-auto flex items-center">
                        <div className="flex gap-3 items-center">
                            <img src="/img/logo cbm white.png" alt="" />
                        </div>
                        <div className="icons gap-4">
                            <Link to={"/"}>HOME</Link>
                            <Link to={"/brand"}>BRANDS</Link>
                            <Link to={"/about"}>ABOUT</Link>
                        </div>
                        <div className="flex gap-3">
                            <IoSearch />
                        </div>
                    </div>
                </div>
            </nav>
            <nav
                className={`gelap ${scrollY > 50 ? "show" : ""}`}
                style={{ position: "fixed" }}
            >
                <div className="bawah">
                    <div className="container gap-7 mx-auto flex items-center">
                        <div className="flex gap-3 items-center">
                            <img src="/img/logo cbm white.png" alt="" />
                        </div>
                        <div className="icons gap-4">
                            <Link to={"/"}>HOME</Link>
                            <Link to={"/brand"}>BRANDS</Link>
                            <Link to={"/about"}>ABOUT</Link>
                        </div>
                        <div className="flex gap-3">
                            <IoSearch />
                        </div>
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
