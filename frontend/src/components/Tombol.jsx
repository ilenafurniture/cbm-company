import { Link, useNavigate } from "react-router-dom";

const Tombol = ({
    to = "",
    teks = "isi woi",
    varian = "lonjong putih",
    varianText = "",
    icon = "",
    style = {},
    styleText = {},
    type = "button",
}) => {
    const navigator = useNavigate(to);
    const handleClick = () => {
        if (type == "button" && to != "") {
            navigator(to);
        }
    };
    return (
        <button
            type={type}
            onClick={handleClick}
            className={`btn ${varian}`}
            style={style}
        >
            <p style={styleText} className={varianText}>
                {teks}
            </p>
            {icon}
        </button>
    );
};

export default Tombol;
