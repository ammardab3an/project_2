import "./Reviews.sass"
import Stars from "./Stars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from "react";

const MAX_SHOWN_COMMENTS = 3;

function Review({review}){

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

                <div className="thumbs-btn">
                    <FontAwesomeIcon icon={regular("thumbs-up")} />
                </div>

                <div className="thumbs-btn">
                    <FontAwesomeIcon icon={regular("thumbs-down")} style={{transform: "scale(-1, 1)"}} />
                </div>

                <a href="#" className="report-user">Report</a>
            </div>
        </div>
    )
}

export default function Reviews({reviewsData}){

    const [show_more, set_show_more] = React.useState(0);

    return (
        <div className="users-reviews">

            {
                reviewsData.map((e, idx) => (   
                    (show_more || idx < MAX_SHOWN_COMMENTS)
                        ? <Review review={e} />
                        : <></>
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