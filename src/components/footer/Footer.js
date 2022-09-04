import "./Footer.sass";
import udemy_logo_inv from "./media/logo-udemy-inverted.svg";

export default function Footer(){
    return (
        <footer>
            <img className="logo" src={udemy_logo_inv} alt="logo" />
        </footer>
    )
}