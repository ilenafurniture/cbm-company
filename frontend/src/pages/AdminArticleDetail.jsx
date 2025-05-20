import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { SlPicture } from "react-icons/sl";
import { MdOutlineChangeCircle, MdSaveAlt } from "react-icons/md";
import useMessageStore from "../../store/messageStore";
import useUserStore from "../../store/userStore";
import { Editor } from "@tinymce/tinymce-react";

const categoriesItem = ["Tips & trick", "Olahraga"];

const AdminArticleDetail = () => {
    const editorRef = useRef(null);
    const [formData, setFormData] = useState({
        judul: "",
        penulis: "",
        kategori: categoriesItem[0],
        tag: [""],
        deskripsi: "",
        keyword: "",
        isi: "<p>Semangat berkarya copywriter cbm!</p>",
    });
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const navigator = useNavigate();
    const { setMessage } = useMessageStore();
    const { token } = useUserStore();
    const { article_id } = useParams();

    useEffect(() => {
        if (article_id) {
            (async () => {
                const fetchArticle = await fetch(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/article/admin/${article_id}`,
                    {
                        method: "get",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const productsJson = await fetchArticle.json();
                console.log(productsJson);
                console.log({
                    ...formData,
                    judul: productsJson.judul,
                    penulis: productsJson.penulis,
                    kategori: productsJson.kategori,
                    tag: productsJson.tag,
                    deskripsi: productsJson.deskripsi,
                    keyword: productsJson.keyword,
                    isi: productsJson.isi,
                });
                if (fetchArticle.status == 200) {
                    setFormData({
                        ...formData,
                        judul: productsJson.judul,
                        penulis: productsJson.penulis,
                        kategori: productsJson.kategori,
                        tag: productsJson.tag,
                        deskripsi: productsJson.deskripsi,
                        keyword: productsJson.keyword,
                        isi: productsJson.isi,
                    });
                    setImage(productsJson.gambar);
                }
            })();
        }
    }, []);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editorRef.current) return setError("Editor not initialized");
        if (editorRef.current.getContent() == "")
            return setError("Udah di semangatin, isi artikelnya dong!");
        const form = new FormData();
        const formDataFix = {
            ...formData,
            isi: editorRef.current.getContent(),
        };
        console.log(formDataFix);
        // return;
        for (const key in formDataFix) {
            if (Array.isArray(formDataFix[key])) {
                formDataFix[key].forEach((item) => {
                    form.append(`${key}[]`, item);
                });
            } else {
                form.append(key, formDataFix[key]);
            }
        }
        if (imageFile) {
            form.append("gambar", imageFile);
        }

        (async () => {
            const responseFetch = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/article${
                    article_id ? `/${article_id}` : ""
                }`,
                {
                    method: article_id ? "put" : "post",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: form,
                }
            );
            const productJson = await responseFetch.json();
            console.log(productJson);
            if (responseFetch.status != 200) {
                return setError(productJson.message);
            }
            setMessage(
                `Artikel ${productJson.judul} berhasil di${
                    article_id ? "update" : "tambahkan"
                }`
            );
            navigator("/admin/article");
        })();
    };

    return (
        <>
            <div className="flex justify-between gap-3 items-center">
                <div>
                    <h3 className="text-terang">
                        {article_id ? "Edit" : "Add New"} Article
                    </h3>
                    <p className="text-gray-500">Complete this form</p>
                </div>
            </div>
            <hr className="my-4" />
            {error && (
                <div className="bg-red-100 text-sm text-red-700 py-3 px-5 rounded-lg mb-3">
                    {error}
                </div>
            )}
            <div style={{ flex: 1, position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        overflowY: "auto",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-5 mb-3">
                            <div style={{ flex: 1 }}>
                                <div className="formulir mb-2">
                                    <label>Judul</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.judul}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                judul: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="formulir mb-2">
                                    <label>Penulis</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.penulis}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                penulis: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="formulir mb-2">
                                    <label>Keyword</label>
                                    <input
                                        type="text"
                                        placeholder="keyword, keyword, keyword"
                                        required
                                        value={formData.keyword}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                keyword: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="formulir mb-2">
                                    <label>Deskripsi</label>
                                    <textarea
                                        rows={1}
                                        required
                                        value={formData.deskripsi}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                deskripsi: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                </div>
                                <div className="formulir mb-2">
                                    <label>Kategpri</label>
                                    <select
                                        value={formData.kategori}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                kategori: e.target.value,
                                            });
                                        }}
                                    >
                                        {categoriesItem.map((c, ind_c) => (
                                            <option key={ind_c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p
                                    className="text-ungu mb-2"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    Tags
                                </p>
                                <div className="container-tags-admin">
                                    {formData.tag.map((t, ind_t) => (
                                        <label className="item" key={ind_t}>
                                            <input
                                                type="text"
                                                placeholder="Tag"
                                                value={t}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        tag: formData.tag.map(
                                                            (t1, ind_t1) => {
                                                                if (
                                                                    ind_t1 ==
                                                                    ind_t
                                                                ) {
                                                                    return e
                                                                        .target
                                                                        .value;
                                                                } else
                                                                    return t1;
                                                            }
                                                        ),
                                                    });
                                                }}
                                            />
                                            {ind_t > 0 && (
                                                <span
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            tag: formData.tag.filter(
                                                                (t1, ind_t1) =>
                                                                    ind_t1 !=
                                                                    ind_t
                                                            ),
                                                        });
                                                    }}
                                                >
                                                    <IoClose />
                                                </span>
                                            )}
                                        </label>
                                    ))}
                                    <div
                                        className="btn-tambah"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                tag: [...formData.tag, ""],
                                            });
                                        }}
                                    >
                                        <FaPlus />
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "250px" }}>
                                <p
                                    className="text-ungu mb-2"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 500,
                                    }}
                                >
                                    Image
                                </p>
                                <label
                                    className="input-gambar-admin"
                                    style={{ position: "sticky", top: 0 }}
                                >
                                    <input
                                        style={{
                                            width: "100%",
                                            display: "none",
                                        }}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                    {image ? (
                                        <>
                                            <div className="hover-img">
                                                <MdOutlineChangeCircle
                                                    size={50}
                                                />
                                                <p>Change picture</p>
                                            </div>
                                            <img src={image} alt="Preview" />
                                        </>
                                    ) : (
                                        <>
                                            <SlPicture size={50} />
                                            <p>
                                                Click here to
                                                <br />
                                                choose photo
                                            </p>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_KEY}
                            onInit={(_evt, editor) =>
                                (editorRef.current = editor)
                            }
                            initialValue={formData.isi}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "image",
                                    "link",
                                    "lists",
                                    "media",
                                    "table",
                                    // "advlist",
                                    // "autolink",
                                    // "charmap",
                                    // "preview",
                                    // "anchor",
                                    // "searchreplace",
                                    // "visualblocks",
                                    // "code",
                                    // "fullscreen",
                                    // "insertdatetime",
                                    // "code",
                                    // "help",
                                    // "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="btn lonjong terang mt-5 justify-center"
                                style={{ width: "300px" }}
                            >
                                <p>Save</p>
                                <MdSaveAlt />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminArticleDetail;
