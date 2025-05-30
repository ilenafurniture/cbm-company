import { FaArrowRight, FaPhoneVolume } from "react-icons/fa";
import Tombol from "../components/Tombol";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const About = () => {
    const [formKritik, setFormKritik] = useState({
        email: "",
        kritik: "",
    });
    const handleSubmitKritik = (e) => {
        e.preventDefault();
        console.log(formKritik);
    };

    return (
        <>
            <Helmet>
                <title>About | CV.CBM</title>
            </Helmet>
            <div className="header-page">
                <div className="content">
                    <div className="flex flex-col items-center">
                        <p className="judul mb-2">Tentang Kami</p>
                        <p className="sub-judul">Catur Bhakti Mandiri</p>
                    </div>
                </div>
                <div className="gambar">
                    <img
                        src="https://images.unsplash.com/photo-1547895749-888a559fc2a7?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </div>
            </div>
            <div className="bg-gelap" style={{ paddingBlock: "5vw" }}>
                <div
                    className="container mx-auto text-biru"
                    style={{ marginBottom: "5vw" }}
                >
                    <p className="mb-4">
                        Perusahaan bidang industri manufaktur yang berlokasi di
                        Lingkar Taman Industri Blok A. 3A NO. 5-6 Kel.
                        Jatibarang, Kec. Mijen, Semarang, Jawa Tengah,
                        Indonesia. Mulai memasarkan karya seni dalam wujud
                        furniture yang diperuntukan untuk indoor maupun outdoor
                        sejak tahun 1998. Sudah lebih dari 2 dekade kami terus
                        eksis di industri ini dan memiliki banyak pengalaman
                        sebagai supplier vendor produk ke mancanegara seperti
                        Amerika Serikat, Australia, Belanda, Jepang, hingga
                        Belgia.
                    </p>
                    <p className="mb-4">
                        Perusahaan kami menyediakan berbagai produk furniture
                        rumah tangga, kantor, dan proyek komersil lainnya dengan
                        material kayu kualitas premium. Keterlibatan langsung
                        dari pemilihan material hingga distribusi merupakan
                        upaya untuk terus menjaga kualitas produk furniture.
                    </p>
                    <p>
                        Bersama 166 karyawan, kami berkomitmen untuk terus
                        bertumbuh dan berkembang menjadi perusahaan manufaktur
                        yang menyediakan furniture serta layanan terbaik bagi
                        konsumen. Kepercayaan kami untuk terus bergerak menjadi
                        yang lebih baik dan terbaik memenuhi kebutuhan konsumen.
                    </p>
                </div>
                <div className="container1 bg-terang">
                    <div
                        className="container mx-auto baris-ke-kolom gap-5"
                        style={{ paddingBlock: "5vw" }}
                    >
                        <div style={{ flex: 4 }}>
                            <h3 className="text-white mb-1">Hubungi kami</h3>
                            <p className="text-terang2 mb-3">
                                Sampaikan pesan Anda di sini
                            </p>
                            <form onSubmit={handleSubmitKritik}>
                                <div className="formulir mb-3">
                                    <label className="mb-1 text-terang2">
                                        Email
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setFormKritik({
                                                ...formKritik,
                                                email: e.target.value,
                                            })
                                        }
                                        value={formKritik.email}
                                        type="email"
                                        className="bggelap text-terang2"
                                        placeholder="Alamat email"
                                    />
                                </div>
                                <div className="formulir mb-4">
                                    <label className="mb-1 text-terang2">
                                        Kritik & Saran
                                    </label>
                                    <textarea
                                        onChange={(e) =>
                                            setFormKritik({
                                                ...formKritik,
                                                kritik: e.target.value,
                                            })
                                        }
                                        value={formKritik.kritik}
                                        className="bggelap text-terang2"
                                        placeholder="Tulis disini ..."
                                    ></textarea>
                                </div>
                                <Tombol
                                    varian="lonjong outline-putih"
                                    styleText={{ fontWeight: "bold" }}
                                    type="submit"
                                    teks="KIRIM"
                                />
                            </form>
                        </div>
                        <div
                            style={{ flex: 3 }}
                            className="flex flex-col gap-3"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7919.374577907106!2d110.32331893701715!3d-7.0459857999999915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7061e23055c8ed%3A0xa875b119e04372d4!2sCV.Catur%20Bhakti%20Mandiri!5e0!3m2!1sen!2sid!4v1745976690055!5m2!1sen!2sid"
                                width={600}
                                height={450}
                                style={{
                                    border: 0,
                                    width: "100%",
                                    // filter: "saturate(0)",
                                    borderRadius: "10px",
                                    flex: 1,
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div>
                                {/* <h3 className="text-white mb-2">
                                    Temukan kami
                                </h3> */}
                                <div className="flex gap-3 text-terang2">
                                    <h5>
                                        <FaLocationDot />
                                    </h5>
                                    <p>
                                        Lingkar Taman Industri Blok A. 3A NO.
                                        5-6 Kel. Jatibarang, Kec. Mijen,
                                        Semarang, Jawa Tengah, Indonesia.
                                    </p>
                                </div>
                                {/* <div className="flex gap-3 text-terang2">
                                    <h5>
                                        <FaPhoneVolume />
                                    </h5>
                                    <p>+62 813 2602 5685</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
