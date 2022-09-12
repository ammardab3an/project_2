import "./NotFound.sass"
import _404_photo from "./media/404.png"

export default function NotFound(){

    return (
        <img className="w-100" src={_404_photo} alt="404" />
    )
}