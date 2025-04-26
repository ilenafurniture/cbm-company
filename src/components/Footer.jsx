import { BiLogoGmail } from "react-icons/bi";
import { CgFacebook } from "react-icons/cg";
import { FaInstagram, FaPhoneVolume } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="content bg-gelap text-white">
                <div className="atas"></div>
                <div className="bawah py-10">
                    <div
                        className="container mx-auto flex py-5"
                        style={{ gap: "4em" }}
                    >
                        <div>
                            <div className="flex gap-5">
                                <img
                                    src="/img/logo cbm white.png"
                                    className="mt-1"
                                    alt=""
                                />
                                <div>
                                    <h5 className="font-bold mb-1 text-terang">
                                        CV. Catur Bhakti Mandiri
                                    </h5>
                                    <p className="text-biru">
                                        Lingkar Taman Industri Blok A. 3A NO.
                                        5-6 Kel. Jatibarang, Kec. Mijen,
                                        Semarang, Jawa Tengah, Indonesia
                                    </p>
                                </div>
                            </div>
                            <hr
                                className="putih my-5"
                                style={{ opacity: 0.2 }}
                            />
                            <div className="flex gap-3 items-center">
                                <h3>
                                    <FaPhoneVolume />
                                </h3>
                                <div style={{ flex: 1 }}>
                                    <h3>+62 24 76630912</h3>
                                    <p
                                        className="text-terang"
                                        style={{
                                            fontWeight: 500,
                                            marginTop: "-3px",
                                        }}
                                    >
                                        Isi mei
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Link to={"/"}>
                                        <CgFacebook size={15} />
                                    </Link>
                                    <Link to={"/"}>
                                        <TiSocialTwitter size={15} />
                                    </Link>
                                    <Link to={"/"}>
                                        <FaInstagram size={15} />
                                    </Link>
                                    <Link to={"/"}>
                                        <BiLogoGmail size={15} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-3">Menu</h5>
                            <div className="flex flex-col gap-1">
                                <Link to={"/"}>Home</Link>
                                <Link to={"/brands"}>Brands</Link>
                                <Link to={"/about"}>About</Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold mb-3">Projects</h5>
                            <div className="flex flex-col gap-1">
                                <Link to={"https://lunareafurniture.com/"}>
                                    Lunarea
                                </Link>
                                <Link to={"https://ilenafurniture.com/"}>
                                    Ilena
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="gambar">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                />
            </div> */}
        </footer>
    );
};
export default Footer;
