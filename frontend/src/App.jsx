import "./App.scss";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";

function App() {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: "100svh" }} className="flex flex-col">
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default App;
