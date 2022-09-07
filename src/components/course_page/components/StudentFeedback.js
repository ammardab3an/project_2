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
                <Col xs={2} className="feedback-rating">
                    <p className="big-rating">{courseRating.toPrecision(2)}</p>
                    <Stars showRating={false} rating={courseRating} />
                    <p className="big-course-rating">Course Rating</p>
                </Col>

                <Col xs={10}>
                    <Row>
                    {
                        Object.keys(feedbackData).reverse().map((e, idx) => (
                            <>
                                <Col xs={8}>
                                    <Par ratio={100*feedbackData[e].count/numReviews} />
                                </Col>
                                <Col xs={4}>
                                    <p key={idx} className="par-stars"><Stars showRating={false} rating={feedbackData[e].rating}/> {(100*feedbackData[e].count/numReviews).toPrecision(2)}%</p>
                                </Col>
                            </>
                        ))
                    }
                    </Row>
                </Col>
            </Row>
        </div>
    )
}