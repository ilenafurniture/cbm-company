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
    target = "_self",
}) => {
    const navigator = useNavigate(to);
    const handleClick = () => {
        if (type == "button") {
            navigator(to);
        }
    };
    return (
        <>
            {to ? (
                <Link
                    target={target}
                    to={to}
                    className={`btn ${varian}`}
                    style={style}
                >
                    <p style={styleText} className={varianText}>
                        {teks}
                    </p>
                    {icon}
                </Link>
            ) : (
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
            )}
        </>
    );
};

export default Tombol;
