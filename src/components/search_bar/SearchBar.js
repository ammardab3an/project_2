import "./SearchBar.sass";
import React from "react";
import udemy_logo from "./media/logo-udemy.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createSearchParams } from "react-router-dom";

export default function SearchBar() {

    const navigate = useNavigate();
    const search_submit_btn_ref = React.createRef();
    const search_input_ref = React.createRef();

    const handel_search_btn_onClick = (e) => {
        e.preventDefault();
        const search_s = search_input_ref.current.value.trim().toLowerCase();

        navigate({
            pathname: "/",
            search: search_s.length ? `?${createSearchParams({search: search_s})}` : ""
        })
    }
    
    const handel_input_keydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            search_submit_btn_ref.current.click();
        }
    }

    return (
        <header>

            <nav>

                <Link to="/" style={{"marginTop": "auto", "marginBottom": "auto"}}>
                    <img className="logo" src={udemy_logo} alt="logo" />
                </Link>

                <Link to="/categories" className="nav_link">Categories</Link>

                <section id="search_bar">
                    <form className="search_form" action="GET">
                        <button ref={search_submit_btn_ref} id="search_submit_btn" type="submit" className="submit_btn" onClick={handel_search_btn_onClick}>
                            <FontAwesomeIcon icon={solid('search')} />
                        </button>
                        <input ref={search_input_ref} id="search_bar_input" type="text" name="search_text" placeholder="Search for anything" onKeyDown={handel_input_keydown}/>
                    </form>
                </section>

                <Link to="/businesses" className="nav_link">Udemy Businesses</Link>
                <Link to="/teach" className="nav_link">Teach on Udemy</Link>

                <button className="box_button box_sty">Log in</button>
                <button className="box_button box_sty box_inv">Sign up</button>
                <button className="box_button box_sty box_logo"><FontAwesomeIcon icon={solid('globe')} /></button>

                <picture className="three_dashes">
                    <FontAwesomeIcon icon={solid('list-ul')} />
                </picture>
            </nav>
        </header>
    );
}