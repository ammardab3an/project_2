import "./WhatToLearn.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function WhatToLearn({courseData}){
    return (
        <div className="what-to-learn-list">
            <h3>What you'll learn</h3>
            <div className="what-to-learn-list-flex">
                {
                    courseData.what_you_will_learn_data.items.map((e, idx) => (
                        <p key={idx}><FontAwesomeIcon icon={solid("check")} /> {e}</p>
                    ))
                }
            </div>
        </div>
    )
}