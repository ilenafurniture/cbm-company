import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const categoriesItem = ["Semua", "Rekomendasi", "Tips & Trik", "Edukasi", "Fun Fact"];
const PAGE_SIZE = 8;

const Article = () => {
  const { category } = useParams(); // slug kategori (mis: "tips-&-trik")
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryState, setCategoryState] = useState(category || null);

  const pageFromUrl = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // jika kategori berubah, reset page ke 1
    setCategoryState(category || null);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      return p;
    });
  }, [category, setSearchParams]);

  useEffect(() => {
    // sinkron page ke URL
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", String(currentPage));
      return p;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (category) qs.set("kategori", category); // backend akan replaceAll("-", " ")
        qs.set("pag", String(currentPage));
        qs.set("limit", String(PAGE_SIZE));

        const url = `${import.meta.env.VITE_BACKEND_URL}/article?${qs.toString()}`;
        const res = await fetch(url);
        const json = await res.json();

        setItems(Array.isArray(json.data) ? json.data : []);
        setTotalPages(Number(json.totalPages || 1));
        setTotalItems(Number(json.totalItems || 0));
      } catch (e) {
        console.error(e);
        setItems([]);
        setTotalPages(1);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, currentPage]);

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

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // nomor halaman ringkas
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxShown - 1);
    if (end - start + 1 < maxShown) start = Math.max(1, end - maxShown + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return { pages, start, end };
  }, [currentPage, totalPages]);

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
              <p style={{ maxWidth: "140px" }}>Kumpulan informasi terbaru dan seru</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full" style={{ flex: 1 }}>
        <div
          style={{ width: window.innerWidth < 700 ? "20px" : "50px" }}
          className="bg-terang"
        ></div>

        <div
          style={{
            flex: 1,
            paddingInline: window.innerWidth < 700 ? "20px" : "50px",
          }}
          className="bg-white"
        >
          <div style={{ marginTop: "-25px", marginBottom: "30px" }}>
            {/* Tabs kategori */}
            <div
              className="bg-white mb-7 rounded-lg hidden-scrollbar"
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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
                {categoriesItem.map((c, ind_c) => {
                  const slug = c.toLowerCase().replaceAll(" ", "-");
                  const isActive = categoryState ? slug === categoryState : c === "Semua";
                  return (
                    <Link
                      to={c === "Semua" ? "/article" : `/article/category/${slug}`}
                      key={ind_c}
                      style={{ display: "block", textWrap: "nowrap" }}
                      className="hover:text-amber-700"
                    >
                      <p
                        className={`hover:text-amber-700 ${isActive ? "text-terang" : ""}`}
                        style={{ fontWeight: isActive ? "bold" : "" }}
                      >
                        {c}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Grid artikel */}
            <div className="container-article">
              {loading ? (
                <div>
                  <p className="text-terang">Loading ..</p>
                </div>
              ) : items.length === 0 ? (
                <div>
                  <p className="text-gray-600">Belum ada artikel.</p>
                </div>
              ) : (
                <>
                  {items.map((item, index) => (
                    <Link
                      to={`/article/${item.path}`}
                      className={`item ${index % 2 ? "gelap" : ""}`}
                      key={item.id || item.path || index}
                    >
                      <div className="gambar">
                        <img src={item.gambar} alt={item.judul || "thumbnail"} />
                      </div>
                      <div className="content">
                        <div>
                          <h3 className="mb-1">{item.judul}</h3>
                          <div className="deskripsi">
                            <p>{item.deskripsi}</p>
                          </div>
                        </div>
                        <p
                          className={`mt-${window.innerWidth > 700 ? "3" : "1"} text-gray-500`}
                        >
                          {formatReadableDate(item.updatedAt || item.createdAt)}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Pagination */}
                  <div className="mt-6 flex items-center justify-center gap-2 select-none">
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded border ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                      }`}
                    >
                      « First
                    </button>
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded border ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                      }`}
                    >
                      ‹ Prev
                    </button>

                    {pageNumbers.pages[0] > 1 && (
                      <>
                        <button
                          className="px-3 py-2 rounded border hover:bg-gray-100"
                          onClick={() => goToPage(1)}
                        >
                          1
                        </button>
                        <span className="px-1">…</span>
                      </>
                    )}

                    {pageNumbers.pages.map((p) => (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`px-3 py-2 rounded border ${
                          p === currentPage ? "bg-terang text-white border-terang" : "hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    {pageNumbers.pages.at(-1) < totalPages && (
                      <>
                        <span className="px-1">…</span>
                        <button
                          className="px-3 py-2 rounded border hover:bg-gray-100"
                          onClick={() => goToPage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded border ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Next ›
                    </button>
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded border ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Last »
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-2">
                    Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, totalItems)} dari {totalItems} artikel
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ width: window.innerWidth < 700 ? "20px" : "50px" }}></div>
      </div>
    </>
  );
};

export default Article;
