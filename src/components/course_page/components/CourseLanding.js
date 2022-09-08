import "./CourseLanding.sass"
import { Container, Breadcrumb, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import Stars from "./Stars"

export default function CourseLanding({courseData, landingRef}){

    return (
        <div ref={landingRef} className="course-landing">
            
            <Container>
                
                <div className="course-landing-video d-block d-lg-none">
                    <iframe className="course-landing-video-iframe" src="https://www.youtube.com/embed/_uQrJ0TkZlc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <Row>
                    <Col lg={1}/>
                    <Col xs={12} lg={7}>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: "/"}}>Home</Breadcrumb.Item>
                            <Breadcrumb.Item linkAs={HashLink} linkProps={{to: "/#courses"}}>Courses</Breadcrumb.Item>
                            <Breadcrumb.Item active>{courseData.context_info.label.display_name}</Breadcrumb.Item>
                        </Breadcrumb>

                        <h2 className="course-title">{courseData.title}</h2>
                        <h4 className="course-headline">{courseData.headline}</h4>
                        <p><Stars color="#f3ca8c" showRating rating={courseData.rating} /> ({courseData.num_reviews} ratings) {courseData.num_subscribers} students</p>
                        
                        <p>Created by {courseData.visible_instructors.map((e, idx) => <span key={idx}> <HashLink to="#">{e.title}</HashLink> </span>)}</p>

                        <p> 
                            <span className="m-2"><FontAwesomeIcon icon={solid("circle-exclamation")}/> Last update {courseData.last_update_date}</span>
                            <span className="m-2"><FontAwesomeIcon icon={solid("globe")}/> {courseData.locale.simple_english_title}</span>
                            <span className="m-2"><FontAwesomeIcon icon={solid("closed-captioning")}/> {courseData.caption_languages[0]}</span>
                        </p>

                    </Col>
                    
                    <Col lg={4} />
                </Row>
            </Container>
        </div>
    )
}