import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const categoriesItem = ["Semua", "Rekomendasi", "Tips & Trik", "Edukasi", "Fun Fact"];
const PAGE_SIZE = 8;

const Article = () => {
  const { category } = useParams(); // slug kategori
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryState, setCategoryState] = useState(category || null);

  const pageFromUrl = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // reset page saat kategori berubah
  useEffect(() => {
    setCategoryState(category || null);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", "1");
      return p;
    });
  }, [category, setSearchParams]);

  // sinkron page ke URL (?page=)
  useEffect(() => {
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
        if (category) qs.set("kategori", category); // backend handle replaceAll("-", " ")
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

  // skeleton 8 kartu
  const skeletons = Array.from({ length: PAGE_SIZE });

  return (
    <>
      <Helmet>
        <title>Article | CV.CBM</title>
      </Helmet>

      {/* Header */}
      <div className="header-article-list">
        <div className="content container1">
          <div className="baris-ke-kolom justify-between items-end" style={{ gap: 16 }}>
            <p className="judul">Our Releases</p>
            <div>
              <h3>Inspirasi</h3>
              <p style={{ maxWidth: 260 }}>Kumpulan informasi terbaru dan seru</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container1" style={{ paddingBlock: "30px" }}>
        {/* Tabs kategori */}
        <div
          className="bg-white mb-7 rounded-lg hidden-scrollbar tabs-kategori"
          style={{ boxShadow: "0 0 10px rgba(0,0,0,.08)" }}
        >
          <div className="tabs-kategori__inner">
            {categoriesItem.map((c, ind) => {
              const slug = c.toLowerCase().replaceAll(" ", "-");
              const isActive = categoryState ? slug === categoryState : c === "Semua";
              const to = c === "Semua" ? "/article" : `/article/category/${slug}`;
              return (
                <Link
                  key={ind}
                  to={to}
                  className={`tab-item ${isActive ? "active" : ""}`}
                  title={c}
                >
                  {c}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Grid artikel / Skeleton */}
        <div className="container-article">
          {loading
            ? skeletons.map((_, i) => (
                <div className="item skeleton-card" key={`sk-${i}`}>
                  <div className="gambar skeleton-rect" />
                  <div className="content">
                    <div>
                      <div className="skeleton-line" style={{ width: "70%" }} />
                      <div className="skeleton-line" style={{ width: "95%", marginTop: 8 }} />
                      <div className="skeleton-line" style={{ width: "85%", marginTop: 6 }} />
                    </div>
                    <div className="skeleton-line" style={{ width: "40%", marginTop: 10 }} />
                  </div>
                </div>
              ))
            : items.length === 0
            ? (
              <div className="item" style={{ gridColumn: "1 / -1", padding: "2em" }}>
                <p className="text-gray-600">Belum ada artikel.</p>
              </div>
            )
            : items.map((item, index) => (
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
                      <h3 className="mb-1" title={item.judul}>
                        {item.judul}
                      </h3>
                      <div className="deskripsi">
                        <p>{item.deskripsi}</p>
                      </div>
                    </div>
                    <p className="text-gray-500">
                      {formatReadableDate(item.updatedAt || item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <p className="text-gray-500" style={{ fontSize: 12 }}>
            Menampilkan {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, totalItems)} dari {totalItems} artikel
          </p>

          <nav className="pagination" aria-label="Pagination">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`item ${currentPage === 1 ? "disabled" : ""}`}
              title="Halaman pertama"
            >
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`item ${currentPage === 1 ? "disabled" : ""}`}
              title="Sebelumnya"
            >
              ‹
            </button>

            {pageNumbers.pages[0] > 1 && (
              <>
                <button onClick={() => goToPage(1)} className="item">1</button>
                <span className="item dots">…</span>
              </>
            )}

            {pageNumbers.pages.map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`item ${p === currentPage ? "active" : ""}`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}

            {pageNumbers.pages.at(-1) < totalPages && (
              <>
                <span className="item dots">…</span>
                <button onClick={() => goToPage(totalPages)} className="item">
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`item ${currentPage === totalPages ? "disabled" : ""}`}
              title="Berikutnya"
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`item ${currentPage === totalPages ? "disabled" : ""}`}
              title="Halaman terakhir"
            >
              »
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Article;
