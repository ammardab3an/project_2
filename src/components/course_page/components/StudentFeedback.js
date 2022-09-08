import "./StudentFeedback.sass"
import { Row, Col } from "react-bootstrap"
import Stars from "./Stars"

function Par({ratio}){

    return (
        <div className="ratio-par">
            <div className="ration-par-filled" style={{width: `${ratio}%`}}>
            </div>
        </div>
    )
}

export default function StudentFeedback({courseRating, numReviews, feedbackData}){

    return (
        <div className="students-feedback">

            <h4>Student feedback</h4>

            <Row>
                <Col md={3} className="feedback-rating">
                    <p className="big-rating">{courseRating.toPrecision(2)}</p>
                    <Stars rating={courseRating} />
                    <p className="big-course-rating">Course Rating</p>
                </Col>

                <Col md={9}>
                    {
                        Object.keys(feedbackData).reverse().map((e, idx) => (
                            <Row key={idx}>
                                <Col md={7}>
                                    <Par ratio={100*feedbackData[e].count/numReviews} />
                                </Col>
                                <Col md={5}>
                                    <p className="par-stars"><Stars rating={feedbackData[e].rating}/> {(100*feedbackData[e].count/numReviews).toPrecision(2)}%</p>
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
            </Row>
        </div>
    )
}