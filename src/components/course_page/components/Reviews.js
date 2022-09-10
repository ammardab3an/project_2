import "./Reviews.sass"
import Stars from "./Stars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, {useState, useRef} from "react";

const MAX_SHOWN_COMMENTS = 3;

function Review({review}){

    const [like_dislike, set_like_dislike] = useState(0);

    return (
        <div className="user-review">

            <div className="initials-col d-none d-md-block">
                <div className="initials">
                    <span>
                        {review.user.initials}
                    </span>
                </div>
            </div>

            <div>
                <h5 className="user-name">{review.user.public_display_name}</h5>
                <div className="user-stars">
                    <Stars rating={review.rating} />
                </div>
                <p className="user-comment">{review.content}</p>
                <p className="was-review-helpful">Was this review helpful?</p>

                <div className={`thumbs-btn ${like_dislike===1 ? "like-dislike-active" : ""}`} onClick={()=>set_like_dislike((like_dislike!==1) ? 1 : 0)}>
                    <FontAwesomeIcon icon={regular("thumbs-up")} />
                </div>

                <div className={`thumbs-btn ${like_dislike===2 ? "like-dislike-active" : ""}`} onClick={()=>set_like_dislike((like_dislike!==2) ? 2 : 0)}>
                    <FontAwesomeIcon icon={regular("thumbs-down")} style={{transform: "scale(-1, 1)"}} />
                </div>

                <a href="#" className="report-user">Report</a>
            </div>
        </div>
    )
}

export default function Reviews({reviewsData}){

    const [show_more, set_show_more] = useState(0);
    const [search_str, set_search_str] = useState("");
    const [selected_rating, set_selected_rating] = useState(-1);
    const freviewsData = reviewsData.filter(e => e.content.toLowerCase().includes(search_str))
                                    .filter(e => selected_rating===-1 || e.rating===selected_rating);
    const searchRef = useRef();
    const searchBtnRef = useRef();

    const handel_search_btn_onClick = (e) => {
        const search_s = searchRef.current.value.trim().toLowerCase();
        set_search_str(search_s);
    }

    const handel_input_keydown = (e) => {
        if(e.key==="Enter"){
            e.preventDefault();
            searchBtnRef.current.click();
        }
    }

    const handel_select_rating = (e) => {
        set_selected_rating(parseInt(e.target.value));
    }

    return (
        <div className="users-reviews">

            <div className="reviews-filter-bar">

                <div className="reviews-search">
                    <input ref={searchRef} className="search-bar-input" type="text" name="search_text" placeholder="Search in reviews" onKeyDown={handel_input_keydown}/>
                    <button ref={searchBtnRef} className="search-bar-btn" onClick={handel_search_btn_onClick}><FontAwesomeIcon icon={solid('search')}/></button>
                </div> 

                <select className="search-rating-selector" onChange={handel_select_rating}>
                    <option value="-1">All Ratings</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </div>

            {
                freviewsData.slice(0, show_more ? freviewsData.length : MAX_SHOWN_COMMENTS).map((e, idx) => (   
                    <Review key={idx} review={e} />
                ))
            }

            <div className="show-more-less-btn" onClick={()=>set_show_more(!show_more)}>
                {
                    show_more 
                            ? <span>Show less comments <FontAwesomeIcon icon={solid("angle-up")} /></span>
                            : <span>Show more comments <FontAwesomeIcon icon={solid("angle-down")} /></span>
                }
            </div>
        </div>
    )
}