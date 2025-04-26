import { FaArrowRight, FaPlus } from "react-icons/fa";
import Tombol from "../components/Tombol";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiSchoolLine } from "react-icons/ri";
import { PiBuildingOffice } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const artikelItems = [
    {
        gambar: "https://images.unsplash.com/photo-1630004061679-54db3b65d5ae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Judul: "Country Collection",
        deskripsi:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt placeat dolore dolores?",
        path: "country-collection",
    },
    {
        gambar: "https://images.unsplash.com/photo-1632432978360-8285c2408ecb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Judul: "Kualitas Kayu Internasional",
        deskripsi:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt placeat dolore dolores?",
        path: "country-collection",
    },
    {
        gambar: "https://images.unsplash.com/photo-1642212483481-d4c1bb23e901?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Judul: "Prusahaan Industri",
        deskripsi:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt placeat dolore dolores?",
        path: "country-collection",
    },
    {
        gambar: "https://images.unsplash.com/photo-1661837317792-47854d3b4353?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        Judul: "Perjalanan Pebisnis Sukses",
        deskripsi:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt placeat dolore dolores?",
        path: "country-collection",
    },
];

const Home = () => {
    const [negaraTujuan, setNegaraTujuan] = useState([
        {
            nama: "United States of America",
            gambar: "https://images.unsplash.com/photo-1699354510794-1b2dd019b31d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            active: false,
        },
        {
            nama: "Australia",
            gambar: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            active: true,
        },
        {
            nama: "Dutch",
            gambar: "https://images.unsplash.com/photo-1580996378027-23040f16f157?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            active: false,
        },
        {
            nama: "Japan",
            gambar: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            active: false,
        },
        {
            nama: "Belgium",
            gambar: "https://images.unsplash.com/photo-1629117745748-8bd47ea937c8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            active: false,
        },
    ]);
    const intervalRef = useRef(null);
    const checkIntervalStop = useRef(false);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setNegaraTujuan((prevState) => {
                const currentIndex = prevState.findIndex((item) => item.active);
                const nextIndex = (currentIndex + 1) % prevState.length;

                return prevState.map((item, index) => ({
                    ...item,
                    active: index === nextIndex,
                }));
            });
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);

    const handleClickNegara = (index) => {
        clearInterval(intervalRef.current);
        checkIntervalStop.current = true;
        setNegaraTujuan(
            negaraTujuan.map((n, ind_n) => ({
                ...n,
                active: index == ind_n,
            }))
        );
    };

    const startIntervalNegara = () => {
        if (checkIntervalStop.current) {
            intervalRef.current = setInterval(() => {
                setNegaraTujuan((prevState) => {
                    const currentIndex = prevState.findIndex(
                        (item) => item.active
                    );
                    const nextIndex = (currentIndex + 1) % prevState.length;

                    return prevState.map((item, index) => ({
                        ...item,
                        active: index === nextIndex,
                    }));
                });
            }, 5000);
            checkIntervalStop.current = false;
        }
    };

    return (
        <>
            <div className="header-home">
                <div className="content">
                    <div className="flex flex-col items-center">
                        <p className="judul mb-4">
                            Isi mei isi mei isi mei isi mei isi mei isi mei isi
                            mei
                        </p>
                        <p className="sub-judul mb-5">
                            Isi mei isi mei isi mei
                        </p>
                        <Tombol
                            to={"/about"}
                            teks="ISI MEI"
                            icon={<FaArrowRight />}
                        />
                        <div className="flex gap-2 mt-7">
                            <span className="item-slide active"></span>
                            <span className="item-slide"></span>
                            <span className="item-slide"></span>
                        </div>
                    </div>
                </div>
                <div className="gambar">
                    <img
                        src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </div>
            </div>
            <div className="bg-gelap" style={{ paddingBlock: "5vw" }}>
                <div className="container mx-auto text-white">
                    <h1 className="mb-3">Sekilas</h1>
                    <p className="mb-7 text-biru">
                        Perusahaan kami menyediakan berbagai produk furniture
                        rumah tangga, kantor, dan proyek komersil lainnya dengan
                        material kayu kualitas premium. Keterlibatan langsung
                        dari pemilihan material hingga distribusi merupakan
                        upaya untuk terus menjaga kualitas produk furniture.
                    </p>
                    <div
                        className="flex items-center mb-6"
                        style={{ gap: "3em" }}
                    >
                        <div>
                            <p>Bersama</p>
                            <div className="flex mt-1 items-center gap-2 text-terang">
                                <h1>166</h1>
                                <FaPlus />
                            </div>
                            <p className="font-bold text-terang">Karyawan</p>
                        </div>
                        <div
                            style={{ width: "1px", height: "100px" }}
                            className="bg-biru"
                        ></div>
                        <p className="text-biru">
                            kami berkomitmen untuk terus bertumbuh dan
                            berkembang menjadi perusahaan manufaktur yang
                            menyediakan furniture serta layanan terbaik bagi
                            konsumen. Kepercayaan kami untuk terus bergerak
                            menjadi yang lebih baik dan terbaik memenuhi
                            kebutuhan konsumen.
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <Tombol
                            to={"/about"}
                            teks="ISI MEI"
                            varian="lonjong outline-putih"
                            style={{ width: "fit-content" }}
                            icon={<FaArrowRight />}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-gelap" style={{ paddingBottom: "5vw" }}>
                <div className="container1">
                    <div className="container-slide-artikel gap-3">
                        {artikelItems.map((a, ind_a) => (
                            <div key={ind_a} className="item">
                                <div className="content py-5 px-7">
                                    <p className="judul">{a.Judul}</p>
                                    <div>
                                        <p className="deskripsi mb-3">
                                            {a.deskripsi}
                                        </p>
                                        <Link to={`/article/${a.path}`}>
                                            READ MORE
                                        </Link>
                                    </div>
                                </div>
                                <div className="gambar">
                                    <img src={a.gambar} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="bg-gelap1 text-white"
                style={{ paddingBlock: "5vw" }}
            >
                <div className="container mx-auto">
                    <p
                        className="text-terang mb-1"
                        style={{ fontWeight: "bold" }}
                    >
                        Product Furniture
                    </p>
                    <h2 style={{ maxWidth: "500px" }} className="mb-3">
                        Isi mei Lorem, ipsum dolo t consectetur adipisicing r
                    </h2>
                    <div className="flex gap-5 mt-10 mb-5">
                        <div className="flex flex-col items-center gap-3 px-5">
                            <div
                                className="bg-gelap flex justify-center items-center"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "200px",
                                }}
                            >
                                <IoHomeOutline size={40} />
                            </div>
                            <p
                                className="text-center"
                                style={{ fontWeight: "bold" }}
                            >
                                Rumah Tangga
                            </p>
                            <p className="text-center text-biru">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Magni excepturi laborum optio
                                fuga alias consequatur.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3 px-5">
                            <div
                                className="bg-gelap flex justify-center items-center"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "200px",
                                }}
                            >
                                <HiOutlineOfficeBuilding size={40} />
                            </div>
                            <p
                                className="text-center"
                                style={{ fontWeight: "bold" }}
                            >
                                Kantor
                            </p>
                            <p className="text-center text-biru">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Magni excepturi laborum optio
                                fuga alias consequatur.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3 px-5">
                            <div
                                className="bg-gelap flex justify-center items-center"
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    borderRadius: "200px",
                                }}
                            >
                                <RiSchoolLine size={40} />
                            </div>
                            <p
                                className="text-center"
                                style={{ fontWeight: "bold" }}
                            >
                                Sekolah
                            </p>
                            <p className="text-center text-biru">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Magni excepturi laborum optio
                                fuga alias consequatur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gelap1">
                <div className="container1">
                    <hr className="putih" style={{ opacity: "0.5" }} />
                </div>
            </div>
            <div
                className="bg-gelap1 text-white"
                style={{ paddingBlock: "5vw" }}
            >
                <div className="container1">
                    <div className="w-full">
                        <div
                            className="bg-gelap"
                            style={{
                                width: "55%",
                                borderRadius: "1em 1em 0 1em",
                                padding: "2em 3em",
                            }}
                        >
                            <p
                                className="text-terang mb-1"
                                style={{ fontWeight: "bold" }}
                            >
                                Out Journey
                            </p>
                            <h3>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Unde placeat et qui nostrum
                                esse voluptate quaerat officiis impedit debitis
                                animi?
                            </h3>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <div
                            className="bg-gelap flex"
                            style={{
                                width: "65%",
                                borderRadius: "0em 1em 1em 1em",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    aspectRatio: "1 / 1",
                                    maxHeight: "300px",
                                }}
                            >
                                <div
                                    style={{
                                        padding: "2em 3em",
                                        height: "100%",
                                    }}
                                    className="flex flex-col justify-between"
                                >
                                    <div className="flex justify-end">
                                        <h1>
                                            <PiBuildingOffice />
                                        </h1>
                                    </div>
                                    <div>
                                        <p
                                            className="text-terang mb-1"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Established since
                                        </p>
                                        <h1>1998</h1>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    aspectRatio: "1 / 1",
                                    maxHeight: "300px",
                                }}
                                className="bg-red-500"
                            >
                                <img
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                    src="https://images.unsplash.com/photo-1534268611302-70c57b990514?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div
                            className="bg-gelap flex flex-col justify-between"
                            style={{
                                width: "35%",
                                borderRadius: "1em",
                                padding: "2em 3em",
                                aspectRatio: "1 / 1",
                                maxHeight: "300px",
                            }}
                        >
                            <div className="flex justify-end">
                                <h1>
                                    <FiUsers />
                                </h1>
                            </div>
                            <div>
                                <p
                                    className="text-terang mb-1"
                                    style={{ fontWeight: "bold" }}
                                >
                                    Total employees
                                </p>
                                <h1>166+</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gelap" style={{ paddingBlock: "5vw" }}>
                <div className="container mx-auto mb-10">
                    <p
                        className="text-terang mb-1"
                        style={{ fontWeight: "bold" }}
                    >
                        Export
                    </p>
                    <h1 style={{ maxWidth: "500px" }} className="text-white">
                        Export Destination Country
                    </h1>
                </div>
                <div
                    className="container-negara"
                    onMouseLeave={() => startIntervalNegara()}
                >
                    <div className="content">
                        <div className="anak-content">
                            <div className="slider">
                                <div
                                    className="w-full flex justify-center py-6"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to top, var(--gelap), transparent)",
                                    }}
                                >
                                    <div className="flex gap-2">
                                        {negaraTujuan.map((n, ind_n) => (
                                            <span
                                                key={ind_n}
                                                onClick={() => {
                                                    handleClickNegara(ind_n);
                                                }}
                                                className={
                                                    n.active ? "active" : ""
                                                }
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="isi">
                                <div className="anak-isi">
                                    {negaraTujuan.map((n, ind_n) => (
                                        <div
                                            key={ind_n}
                                            className={`item ${
                                                n.active ? "active" : ""
                                            }`}
                                        >
                                            <p
                                                className="text-white mb-1"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                Country
                                            </p>
                                            <h1
                                                style={{ maxWidth: "500px" }}
                                                className="text-white text-center"
                                            >
                                                {n.nama}
                                            </h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="background">
                                <div className="container mx-auto pt-5">
                                    <hr
                                        className="putih"
                                        style={{ width: "100%", opacity: 0.3 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gambar">
                        {negaraTujuan.map((n, ind_n) => (
                            <img
                                key={ind_n}
                                src={n.gambar}
                                alt=""
                                className={n.active ? "active" : ""}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="bg-gelap text-white"
                style={{ paddingBottom: "5vw" }}
            >
                <div className="container1 py-5">
                    <div
                        className="py-10 px-7"
                        style={{ border: "1px solid var(--gelap1)" }}
                    >
                        <h2 className="text-center mb-2">Our Partner</h2>
                        <p className="text-center mb-6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                        </p>
                        <div className="flex gap-2">
                            <div
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    aspectRatio: "2 / 1",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        backgroundColor: "rgba(0,0,0,0.2)",
                                    }}
                                    className="flex flex-col justify-center items-center"
                                >
                                    <h2 style={{ fontWeight: 500 }}>Ilena</h2>
                                    <p>Furniture</p>
                                </div>
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                    src="https://img.ilenafurniture.com/image/1742973197480.png/?apikey=a7eabf2178bad12d7d795c6fd4a2e935"
                                    alt=""
                                />
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    aspectRatio: "2 / 1",
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        height: "100%",
                                        width: "100%",
                                        backgroundColor: "rgba(0,0,0,0.3)",
                                    }}
                                    className="flex flex-col justify-center items-center"
                                >
                                    <h2 style={{ fontWeight: 500 }}>Lunarea</h2>
                                    <p>Furniture</p>
                                </div>
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                    src="https://img.ilenafurniture.com/image/1742972542166.png/?apikey=a7eabf2178bad12d7d795c6fd4a2e935"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-gelap1">
                <div className="container mx-auto py-5">
                    <div className="flex justify-between items-end mb-6">
                        <hr
                            className="putih mb-3"
                            style={{
                                opacity: 0.2,
                                width: "50%",
                            }}
                        />
                        <div className="flex gap-4 justify-end">
                            <h3
                                className="text-terang mb-0 text-center"
                                style={{ fontWeight: "bold" }}
                            >
                                Our
                            </h3>
                            <h1 className="text-white text-center">Clients</h1>
                        </div>
                    </div>
                    <div className="flex items-center" style={{ gap: "4em" }}>
                        <div style={{ flex: 1 }}>
                            <img src="/img/crate barrel.png" alt="" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <img src="/img/the land of nod.png" alt="" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <img src="/img/west elm.png" alt="" />
                        </div>
                        <div>
                            <img
                                style={{ height: "30px" }}
                                src="/img/william.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
