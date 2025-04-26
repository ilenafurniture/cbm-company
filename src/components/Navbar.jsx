import { FaBlenderPhone, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
    return (
        <nav>
            <div className="atas">
                <div className="container mx-auto flex justify-between">
                    <div className="flex gap-3 items-center">
                        <TiSocialFacebook />
                        <FaTwitter />
                        <FaInstagram />
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center">
                            <MdOutlineEmail />
                            <p>Email : cbmandiri87@yahoo.com</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaBlenderPhone />
                            <p>Call in : +62-24-76630912</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bawah">
                <div className="container gap-7 mx-auto flex items-center">
                    <div className="flex gap-3 items-center">
                        <img src="/img/logo cbm white.png" alt="" />
                        <p>CV. Catur Bhakti Mandiri</p>
                    </div>
                    <div className="icons">
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
    );
};

export default Navbar;
