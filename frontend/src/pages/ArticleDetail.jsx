import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import useUserStore from "../../store/userStore";

const ArticleDetail = () => {
    const { path } = useParams();
    const [article, setArticle] = useState(null);
    const { role } = useUserStore();
    useEffect(() => {
        (async () => {
            const fetchArticle = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/article/${path}`
            );
            const articleJson = await fetchArticle.json();
            setArticle(articleJson);
            console.log(articleJson);
        })();
    }, []);

    const pisahJudul = (judul) => {
        if (judul) {
            const pisah = judul.split(" ");
            const judul1 = pisah.reduce((prev, cur, ind) => {
                if (ind <= 1) {
                    return `${prev}${ind == 0 ? "" : " "}${cur}`;
                } else return prev;
            }, "");
            const judul2 = pisah.reduce((prev, cur, ind) => {
                if (ind > 1) {
                    return `${prev}${ind == 2 ? "" : " "}${cur}`;
                } else return prev;
            }, "");
            return { judul1, judul2 };
        } else {
            return { judul1: "", judul2: "" };
        }
    };

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

    return (
        <>
            <div className="header-article">
                <div className="background">
                    <div
                        className="bg-terang"
                        style={{ width: "40%", height: "100%" }}
                    ></div>
                    <div style={{ flex: 1 }}>
                        <img
                            src={article?.gambar}
                            alt="Article"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
                <div className="content">
                    <div className="container mx-auto">
                        <h2>{pisahJudul(article?.judul).judul1}</h2>
                        <h1 className="mb-3" style={{ maxWidth: "700px" }}>
                            {pisahJudul(article?.judul).judul2}
                        </h1>
                        <div className="flex items-center gap-5">
                            <div
                                style={{ height: "15px", width: "100px" }}
                                className="bg-white"
                            ></div>
                            <h5 style={{ maxWidth: "500px" }}>
                                {article?.kategori}
                            </h5>
                        </div>
                    </div>
                    <div
                        style={{
                            height: "1px",
                            width: "60%",
                            backgroundColor: "rgba(255,255,255,0.5)",
                        }}
                        className="mt-10"
                    ></div>
                </div>
            </div>
            <div className="header-article-mobile">
                <div className="gambar">
                    <img
                        src={article?.gambar}
                        alt="Article"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <div className="overlay"></div>
                </div>
                <div className="content">
                    <div style={{ width: "7.5%" }} className="bg-terang"></div>
                    <div
                        className="bg-terang py-4 pe-8"
                        style={{ width: "85%" }}
                    >
                        <h5
                            style={{ fontWeight: "bold" }}
                            className="text-white"
                        >
                            {pisahJudul(article?.judul).judul1}
                        </h5>
                        <h2 className="text-white mb-1">
                            {pisahJudul(article?.judul).judul2}
                        </h2>
                    </div>
                </div>
            </div>
            {role == "admin" && (
                <div className="container mx-auto pt-10">
                    <Link
                        to={`/admin/article/edit/${article?.id}`}
                        className="btn lonjong terang justify-center"
                    >
                        <p>Edit</p>
                        <AiOutlineEdit />
                    </Link>
                </div>
            )}
            <div className={window.innerWidth > 700 ? "py-10" : "py-8"}>
                <div
                    className={`container mx-auto baris-ke-kolom-reverse gap-${
                        window.innerWidth < 700 ? "7" : "10"
                    }`}
                >
                    <div style={{ flex: 7 }}>
                        <h5>{article?.deskripsi}</h5>
                    </div>
                    <div
                        style={{ flex: 3 }}
                        className={`flex ${
                            window.innerWidth > 700
                                ? "justify-end"
                                : "justify-between"
                        }`}
                    >
                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                {formatReadableDate(article?.createdAt)}
                            </p>
                            <p className="text-sm text-gelap fw-bold">
                                By {article?.penulis}
                            </p>
                        </div>
                        {window.innerWidth <= 700 && (
                            <div
                                className="bg-gray-100 text-gelap py-2 px-5"
                                style={{
                                    width: "fit-content",
                                    borderRadius: "3em",
                                }}
                            >
                                <p style={{ fontWeight: 500 }}>
                                    {article?.kategori}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="container mx-auto my-8">
                    <hr className="terang" />
                </div>
                <div
                    className="container mx-auto container-isi-article"
                    dangerouslySetInnerHTML={{ __html: article?.isi }}
                ></div>
                <div
                    className="container mx-auto mt-5 flex"
                    style={{ flexWrap: "wrap", columnGap: "1em" }}
                >
                    {article?.tag.map((t, ind_t) => (
                        <p
                            className="text-terang"
                            style={{ fontWeight: 500 }}
                            key={ind_t}
                        >
                            #{t}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ArticleDetail;
