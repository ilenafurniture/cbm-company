import { FaArrowRight } from "react-icons/fa";
import Tombol from "../components/Tombol";
import { Helmet } from "react-helmet";
const Brand = () => {
    return (
        <>
            <Helmet>
                <title>Brand | CV.CBM</title>
            </Helmet>
            <div className="header-page">
                <div className="content">
                    <div className="flex flex-col items-center">
                        <p className="judul mb-2">Our Brands</p>
                        {/* <p className="sub-judul">Lorem ipsum</p> */}
                    </div>
                </div>
                <div className="gambar">
                    <img src="/img/cover-brand/header-brand.jpg" alt="" />
                    {/* <img
                        src="https://img.ilenafurniture.com/image/1748239864605.jpg/?apikey=a7eabf2178bad12d7d795c6fd4a2e935"
                        alt=""
                    /> */}
                </div>
            </div>
            <div
                className="bg-white"
                style={{
                    paddingBlock: window.innerWidth > 800 ? "5vw" : "4em",
                }}
            >
                <div
                    className={`container mx-auto text-biru flex items-center justify-center ${
                        window.innerWidth > 700 ? "" : "py-4"
                    }`}
                    style={{
                        flexWrap: "wrap",
                        columnGap: "5em",
                        rowGap: "2em",
                    }}
                >
                    <img
                        style={{
                            height: "20px",
                        }}
                        src="/img/Logo Lunarea.png"
                        alt=""
                        className="item-our-brand"
                    />
                    <img
                        style={{ height: "20px" }}
                        src="/img/LogoIlena.png"
                        alt=""
                        className="item-our-brand"
                    />
                </div>
            </div>
            <div
                className="cover-brand"
                style={{
                    backgroundImage: `url(/img/cover-brand/luna.jpg)`,
                }}
            >
                <div className="overlay">
                    <img
                        className="horizontal"
                        src="/img/logo luna putih.svg"
                        alt=""
                    />
                </div>
            </div>
            <div
                className="bg-terang flex flex-col justify-center items-center"
                style={{
                    minHeight: "35svh",
                    paddingBlock: window.innerWidth > 800 ? "5vw" : "5em",
                }}
            >
                <div className="container mx-auto text-biru flex flex-col justify-center items-center text-center">
                    <p
                        className="mb-4 text-white"
                        style={{ maxWidth: "500px" }}
                    >
                        LUNAREA memberikan keindahan furniture dengan bahan
                        berkualitas dan desain modern minimalis untuk membuat
                        ruangan lebih hidup.
                    </p>
                    <Tombol
                        to={"https://lunareafurniture.com/"}
                        teks="Visit & Shop"
                        varian="lonjong outline-putih"
                        style={{ width: "fit-content" }}
                        icon={<FaArrowRight />}
                    />
                </div>
            </div>
            <div
                className="cover-brand"
                style={{
                    backgroundImage: `url(https://img.ilenafurniture.com/image/1748320128043.jpg/?apikey=a7eabf2178bad12d7d795c6fd4a2e935)`,
                }}
            >
                <div className="overlay">
                    <img
                        className="horizontal"
                        src="/img/logo ilena putih.svg"
                        alt=""
                    />
                </div>
            </div>
            <div
                className="bg-terang flex flex-col justify-center items-center"
                style={{
                    minHeight: "35svh",
                    paddingBlock: window.innerWidth > 800 ? "5vw" : "5em",
                }}
            >
                <div className="container mx-auto text-biru flex flex-col justify-center items-center text-center">
                    <p
                        className="mb-4 text-white"
                        style={{ maxWidth: "500px" }}
                    >
                        ILENA hadir untuk memenuhi kebutuhan masyarakat
                        Indonesia akan pentingnya menciptakan suasana nyaman dan
                        hangat dalam ruangan melalui pemilihan furniture yang
                        tepat dan estetik.
                    </p>
                    <Tombol
                        to={"https://ilenafurniture.com/"}
                        teks="Visit & Shop"
                        varian="lonjong outline-putih"
                        style={{ width: "fit-content" }}
                        icon={<FaArrowRight />}
                    />
                </div>
            </div>
        </>
    );
};

export default Brand;
