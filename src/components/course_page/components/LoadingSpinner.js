import "./LoadingSpinner.sass"
import { Container } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function LoadingSpinner(){

    return (
        <Container className="w-100">
            <Container className="w-50-px">
                <FontAwesomeIcon className="spinner" icon={solid("gear")} />
            </Container>
        </Container>
    )
}