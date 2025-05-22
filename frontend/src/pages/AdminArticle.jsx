import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoMdOpen } from "react-icons/io";
import Alert from "../components/Alert";
import useUserStore from "../../store/userStore";
import useMessageStore from "../../store/messageStore";

const AdminArticle = () => {
    const [pagination, setPagination] = useState(1);
    const location = useLocation();
    const queryParmas = new URLSearchParams(location.search);
    const findArticleParams = queryParmas.get("q");
    const [articles, setArticles] = useState({
        data: [],
        count: 0,
    });
    const [numberPag, setNumberPag] = useState([]);
    const [pesan, setPesan] = useState(null);
    const [alert, setAlert] = useState({
        teks: "",
        show: false,
        articleId: "",
    });
    const { token } = useUserStore();
    const { getMessage, setMessage } = useMessageStore();
    const navigator = useNavigate();

    useEffect(() => {
        (async () => {
            let url = `${
                import.meta.env.VITE_BACKEND_URL
            }/article?pag=${pagination}${
                findArticleParams ? `&q=${findArticleParams}` : ""
            }`;
            const fetchProduct = await fetch(url);
            const productsJson = await fetchProduct.json();
            console.log(productsJson);
            if (fetchProduct.status == 200) {
                setArticles(productsJson);
                let angka = [];
                for (let i = 1; i <= Math.ceil(productsJson.count / 10); i++) {
                    angka.push(i);
                }
                setNumberPag(angka);
            }
            setPesan(getMessage());
        })();
    }, [pagination]);

    const handleDelete = () => {
        (async () => {
            const responseFetch = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/article/${
                    alert.articleId
                }`,
                {
                    method: "delete",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const articleJson = await responseFetch.json();
            setAlert({ ...alert, show: false });
            setTimeout(() => {
                setAlert({
                    ...alert,
                    teks: "",
                });
            }, 200);
            if (responseFetch.status == 200) {
                setArticles({
                    ...articles,
                    data: articles.data.filter((a) => a.id != alert.articleId),
                });
            }
            setPesan(articleJson.message);
        })();
    };

    function formatReadableDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) return "";
        return date
            .toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            .replace("pukul", "•");
    }

    return (
        <>
            {alert && (
                <Alert
                    teks={alert.teks}
                    show={alert.show}
                    cancel={() => {
                        setAlert({ ...alert, show: false });
                    }}
                    action={() => {
                        handleDelete();
                    }}
                />
            )}
            <div className="flex justify-between gap-3 items-center">
                <div>
                    <h1 className="text-gelap">Our Articles</h1>
                    <p className="text-gray-500">Article management</p>
                </div>
                <Link to={"/admin/article/add"} className="btn lonjong terang">
                    <p>Add</p>
                    <FaPlus />
                </Link>
            </div>
            <hr className="my-4" />
            <div style={{ flex: 1, position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        // overflowY: "scroll",
                    }}
                >
                    {pesan && (
                        <div className="bg-green-100 text-sm text-green-700 py-3 px-5 rounded-lg mb-3">
                            {pesan}
                        </div>
                    )}
                    <div
                        className="mb-3"
                        style={{ flex: 1, position: "relative" }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                overflowY: "scroll",
                            }}
                        >
                            <table className="table-admin">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>Judul/Kategori/Tags</th>
                                        <th>Updated At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.data.map((p, ind_p) => (
                                        <tr key={ind_p}>
                                            <td>{ind_p + pagination}</td>
                                            <td>
                                                <img src={p.gambar} alt="" />
                                            </td>
                                            <td>
                                                <div>
                                                    <p
                                                        style={{
                                                            fontSize: "10px",
                                                            opacity: 0.5,
                                                        }}
                                                    >
                                                        {p.kategori}
                                                    </p>
                                                    <p
                                                        className="my-1"
                                                        style={{
                                                            fontWeight: 500,
                                                            fontSize: "14px",
                                                            lineHeight: "18px",
                                                            letterSpacing:
                                                                "0px",
                                                        }}
                                                    >
                                                        {p.judul}
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontSize: "10px",
                                                            opacity: 0.5,
                                                        }}
                                                    >
                                                        {p.tag.map(
                                                            (t, ind_t) =>
                                                                `${
                                                                    ind_t != 0
                                                                        ? " | "
                                                                        : ""
                                                                }${t}`
                                                        )}
                                                    </p>
                                                </div>
                                            </td>
                                            <td style={{ textWrap: "nowrap" }}>
                                                {formatReadableDate(
                                                    p.updatedAt
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex">
                                                    <Link
                                                        className="btn"
                                                        to={`/articel/${p.path}`}
                                                    >
                                                        <IoMdOpen />
                                                    </Link>
                                                    <Link
                                                        className="btn"
                                                        to={`/admin/article/edit/${p.id}`}
                                                    >
                                                        <FiEdit3 />
                                                    </Link>
                                                    <button
                                                        className="btn"
                                                        onClick={() => {
                                                            setAlert({
                                                                teks: `Artikel ${p.judul} akan dihapus?`,
                                                                show: true,
                                                                articleId: p.id,
                                                            });
                                                        }}
                                                    >
                                                        <RiDeleteBin2Line />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="pagination gap-3">
                            <span
                                className="item"
                                onClick={() => {
                                    if (pagination > 0) {
                                        setPagination(pagination - 10);
                                    }
                                }}
                            >
                                <FaChevronLeft />
                            </span>
                            {numberPag.map((n, ind_n) => (
                                <span
                                    onClick={() => {
                                        setPagination(10 * ind_n);
                                    }}
                                    className={`item ${
                                        10 * ind_n == pagination ? "active" : ""
                                    }`}
                                    key={ind_n}
                                >
                                    {n}
                                </span>
                            ))}
                            <span
                                className="item"
                                onClick={() => {
                                    if (
                                        pagination <
                                        Math.floor(articles.count / 10) * 10
                                    ) {
                                        console.log(pagination + 10);
                                        setPagination(pagination + 10);
                                    }
                                }}
                            >
                                <FaChevronRight />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminArticle;
