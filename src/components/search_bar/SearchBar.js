import "./SearchBar.sass";
import React from "react";
import udemy_logo from "./media/logo-udemy.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function SearchBar({filterStringSetter}) {

    const search_submit_btn_ref = React.createRef();
    const search_input_ref = React.createRef();

    const handel_search_btn_onClick = (e) => {
        e.preventDefault();
        filterStringSetter(search_input_ref.current.value.trim().toLowerCase());
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
                <img className="logo" src={udemy_logo} alt="logo" />

                <a href="/categories" className="nav_link">Categories</a>

                <section id="search_bar">
                    <form className="search_form" action="GET">
                        <button ref={search_submit_btn_ref} id="search_submit_btn" type="submit" className="submit_btn" onClick={handel_search_btn_onClick}>
                            <FontAwesomeIcon icon={solid('search')} />
                        </button>
                        <input ref={search_input_ref} id="search_bar_input" type="text" name="search_text" placeholder="Search for anything" onKeyDown={handel_input_keydown}/>
                    </form>
                </section>

                <a href="/businesses" className="nav_link">Udemy Businesses</a>
                <a href="/teach" className="nav_link">Teach on Udemy</a>

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