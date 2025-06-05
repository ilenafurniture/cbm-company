import { FaArrowRight, FaPhoneVolume } from "react-icons/fa";
import Tombol from "../components/Tombol";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const categoriesItem = [
    "Semua",
    "Rekomendasi",
    "Tips & Trik",
    "Edukasi",
    "Fun Fact",
];

const Article = () => {
    const { category } = useParams();
    const [article, setArticle] = useState(null);
    const [categoryState, setCategoryState] = useState(category);

    useEffect(() => {
        setCategoryState(category);
        (async () => {
            const fetchArticle = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/article?${
                    category ? `kategori=${category}` : ""
                }`
            );
            const articleJson = await fetchArticle.json();
            console.log(articleJson);
            setArticle(articleJson);
        })();
    }, [category]);

    function formatReadableDate(dateString) {
        const date = new Date(dateString);
        return date
            .toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            .replace("pukul", "|");
    }

    useEffect(() => {
        console.log("Kategori", categoryState);
    }, [categoryState]);

    return (
        <>
            <Helmet>
                <title>Article | CV.CBM</title>
            </Helmet>

            <div className="header-article-list">
                <div className="content">
                    <div className="baris-ke-kolom justify-between items-end">
                        <p className="judul">Our Releases</p>
                        <div>
                            <h3>Inspirasi</h3>
                            <p style={{ maxWidth: "140px" }}>
                                Kumpulan informasi terbaru dan seru
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full" style={{ flex: 1 }}>
                <div
                    style={{
                        width: window.innerWidth < 700 ? "20px" : "50px",
                    }}
                    className="bg-terang"
                ></div>
                <div
                    style={{
                        flex: 1,
                        paddingInline:
                            window.innerWidth < 700 ? "20px" : "50px",
                    }}
                    className="bg-white"
                >
                    <div style={{ marginTop: "-25px", marginBottom: "30px" }}>
                        <div
                            className="bg-white mb-7 rounded-lg hidden-scrollbar"
                            style={{
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                width: "100%",
                                display: "block",
                                position: "relative",
                                overflowX: "auto",
                                height: "50px",
                            }}
                        >
                            <div
                                className="flex gap-7 justify-center items-center px-8"
                                style={{
                                    width: "100%",
                                    minWidth: "fit-content",
                                    position: "absolute",
                                    height: "100%",
                                }}
                            >
                                {categoriesItem.map((c, ind_c) => (
                                    <Link
                                        to={
                                            c == "Semua"
                                                ? "/article"
                                                : `/article/category/${c
                                                      .toLowerCase()
                                                      .replaceAll(" ", "-")}`
                                        }
                                        key={ind_c}
                                        style={{
                                            display: "block",
                                            textWrap: "nowrap",
                                        }}
                                        className={`hover:text-amber-700`}
                                    >
                                        <p
                                            className={`hover:text-amber-700 ${
                                                categoryState
                                                    ? c
                                                          .toLowerCase()
                                                          .replaceAll(
                                                              " ",
                                                              "-"
                                                          ) == categoryState
                                                        ? "text-amber-500"
                                                        : ""
                                                    : c == "Semua"
                                                    ? "text-amber-500"
                                                    : ""
                                            }`}
                                            style={{
                                                fontWeight: categoryState
                                                    ? c
                                                          .toLowerCase()
                                                          .replaceAll(
                                                              " ",
                                                              "-"
                                                          ) == categoryState
                                                        ? "bold"
                                                        : ""
                                                    : c == "Semua"
                                                    ? "bold"
                                                    : "",
                                            }}
                                        >
                                            {c}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="container-article">
                            {article ? (
                                article.data.map((item, index) => (
                                    <Link
                                        to={`/article/${item.path}`}
                                        className={`item ${
                                            index % 2 ? "gelap" : ""
                                        }`}
                                        key={index}
                                    >
                                        <div className="gambar">
                                            <img src={item.gambar} alt="" />
                                        </div>
                                        <div className="content">
                                            <div>
                                                <h3 className="mb-1">
                                                    {item.judul}
                                                </h3>
                                                <div className="deskripsi">
                                                    <p>{item.deskripsi}</p>
                                                </div>
                                            </div>
                                            <p
                                                className={`mt-${
                                                    window.innerWidth > 700
                                                        ? "3"
                                                        : "1"
                                                } text-gray-500`}
                                            >
                                                {formatReadableDate(
                                                    item.updatedAt
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div>
                                    <p className="text-white">Loading ..</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: window.innerWidth < 700 ? "20px" : "50px",
                    }}
                ></div>
            </div>
        </>
    );
};

export default Article;
