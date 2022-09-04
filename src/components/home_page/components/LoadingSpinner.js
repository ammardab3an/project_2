import "./LoadingSpinner.sass"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function LoadingSpinner(){

    return (
        <Container>
            <FontAwesomeIcon className="w-100 d-block spinner" icon={solid("gear")} />
        </Container>
    )
}