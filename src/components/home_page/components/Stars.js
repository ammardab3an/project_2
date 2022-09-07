import "./Stars.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Stars({showRating, rating, color}) {

    const st = {
        "color" : color || "#f2a83a"
    };

    let ret = [];
    const MAX_NUMBER_OF_STARS = 5;
    for (let i = 1; i <= MAX_NUMBER_OF_STARS; i++) {
        if ((rating+.1) >= i) {
            ret.push(<FontAwesomeIcon key={i} icon={solid("star")} />)
        }
        else if ((rating+.1) + 0.5 >= i) {
            ret.push(<FontAwesomeIcon key={i} icon={regular("star-half-stroke")} />)
        }
        else {
            ret.push(<FontAwesomeIcon key={i} icon={regular("star")}/>)
        }
    }

    return (
        
        showRating 
            ?
            <span className="stars" style={st}>
                {rating.toPrecision(2)} {ret}
            </span>
            :
            <span className="stars" style={st}>
                {ret}
            </span>
    )
}