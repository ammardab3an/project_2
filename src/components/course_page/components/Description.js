import "./Description.sass"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


export default function Description({description}){

    const [show_more, set_show_more] = React.useState(0);

    return (
        <div className="description">
            <h4>Description</h4>
            <div className={!show_more ? "description-html_show_more" : "description-html"} dangerouslySetInnerHTML={{ __html: description }} />
            <div className="show-more-less-desc-btn" onClick={()=>set_show_more(!show_more)}>
                {
                    show_more 
                            ? <span>Show less <FontAwesomeIcon icon={solid("angle-up")} /></span>
                            : <span>Show more <FontAwesomeIcon icon={solid("angle-down")} /></span>
                }
            </div>
        </div>
    )
}