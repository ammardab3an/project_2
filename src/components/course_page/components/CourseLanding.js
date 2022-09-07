import "./CourseLanding.sass"
import { Container, Breadcrumb, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import Stars from "./Stars"

export default function CourseLanding({courseData}){

    return (
        <div className="course-landing">
            
            <Container>

                <Row>
                    <Col xs={1}/>
                    <Col xs={7}>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item linkAs={HashLink} linkProps={{to: "/#courses"}}>Courses</Breadcrumb.Item>
                            <Breadcrumb.Item active>{courseData.context_info.label.display_name}</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className="course-title">{courseData.title}</h2>
                        <h4 className="course-headline">{courseData.headline}</h4>
                        <p><Stars color="#f3ca8c" showRating={true} rating={courseData.rating} /> ({courseData.num_reviews} ratings) {courseData.num_subscribers} students</p>
                        
                        <p>Created by {courseData.visible_instructors.map((e, idx) => <span key={idx}> <HashLink to="#">{e.title}</HashLink> </span>)}</p>

                        <p> 
                            <span className="m-2"><FontAwesomeIcon icon={solid("circle-exclamation")}/> Last update {courseData.last_update_date}</span>
                            <span className="m-2"><FontAwesomeIcon icon={solid("globe")}/> {courseData.locale.simple_english_title}</span>
                            <span className="m-2"><FontAwesomeIcon icon={solid("closed-captioning")}/> {courseData.caption_languages[0]}</span>
                        </p>

                    </Col>
                    
                    <Col xs={4} />
                </Row>
            </Container>
        </div>
    )
}