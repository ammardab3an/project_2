import "./Landing.sass"
import landingImg from "../media/landing.jpg"
import Container from "react-bootstrap/Container"

export default function Landing(){
    return (
        <section className="landing">
            <Container>
                <div className="card">
                    <img src={landingImg} alt="A woman sitting on a chair and looking proud" />
                    <div className="card_info">
                        <h2>Learning that gets you</h2>
                        <p>Skills for your present (and your future). Get started with us.</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}