import { FaArrowRight, FaPhoneVolume } from "react-icons/fa";
import Tombol from "../components/Tombol";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Article = () => {
    const [article, setArticle] = useState(null);
    const handleSubmitKritik = (e) => {
        e.preventDefault();
        console.log(formKritik);
    };

    useEffect(() => {
        (async () => {
            const fetchArticle = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/article`
            );
            const articleJson = await fetchArticle.json();
            console.log(articleJson);
            setArticle(articleJson);
        })();
    }, []);

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
            <div className="header-article-list">
                <div className="content">
                    <div className="flex justify-between items-end">
                        <p className="judul">Our Releases</p>
                        <div>
                            <h3>Inspiration</h3>
                            <p style={{ maxWidth: "140px" }}>
                                Lorem ipsum dolor sit.Lorem ipsum dolor sit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full">
                <div style={{ width: "50px" }} className="bg-terang"></div>
                <div
                    style={{ flex: 1, paddingInline: "50px" }}
                    className="bg-white"
                >
                    <div
                        style={{ marginTop: "-50px" }}
                        className="container-article"
                    >
                        {article
                            ? article.data.map((item, index) => (
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
                                          {/* <div style={{ flex: 1 }}></div> */}
                                          <p className="mt-3 text-gray-500">
                                              {formatReadableDate(
                                                  item.updatedAt
                                              )}
                                          </p>
                                      </div>
                                  </Link>
                              ))
                            : "Loading ..."}
                    </div>
                </div>
                <div style={{ width: "50px" }}></div>
            </div>
        </>
    );
};

export default Article;
