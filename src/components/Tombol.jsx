import { Link } from "react-router-dom";

const Tombol = ({
    to = "",
    teks = "isi woi",
    varian = "lonjong putih",
    icon = "",
    style = {},
}) => {
    return (
        <Link to={to} className={`btn ${varian}`} style={style}>
            <p>{teks}</p>
            {icon}
        </Link>
    );
};

export default Tombol;
