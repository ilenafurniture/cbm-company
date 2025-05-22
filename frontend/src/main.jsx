import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AdminArticle from "./pages/AdminArticle.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppAdmin from "./AppAdmin.jsx";
import AdminArticleDetail from "./pages/AdminArticleDetail.jsx";
import Article from "./pages/Article.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="article">
                    <Route index element={<Article />} />
                    <Route path=":path" element={<ArticleDetail />} />
                </Route>
            </Route>
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedFilter={{
                            user: true,
                            roles: ["admin"],
                        }}
                    >
                        <AppAdmin />
                    </ProtectedRoute>
                }
            >
                <Route path="article">
                    <Route index element={<AdminArticle />} />
                    <Route path="add" element={<AdminArticleDetail />} />
                    <Route path="edit">
                        <Route
                            path=":article_id"
                            element={<AdminArticleDetail />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
