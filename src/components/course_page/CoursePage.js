import "./CoursePage.sass"
import React from "react"
import { useParams } from "react-router-dom"
import { Container, Col, Row } from "react-bootstrap";
import CourseLanding from "./components/CourseLanding";
import LoadingSpinner from "./components/LoadingSpinner";
import WhatToLearn from "./components/WhatToLearn";
import CourseContent from "./components/CourseContent";
import Requirements from "./components/Requirements";
import Description from "./components/Description";
import Instructors from "./components/Instructors";
import StudentFeedback from "./components/StudentFeedback";
import Reviews from "./components/Reviews";
import FloatingCard from "./components/FloatingCard";
import { CoursesContext } from "../CoursesContext";

export default function CoursePage(){

    const {courseId} = useParams();
    
    return (
        <CoursesContext.Consumer>
            {
                ({queryCourse}) => {

                    const courseDb = queryCourse(courseId);

                    if(!courseDb){
                        return (<LoadingSpinner />);
                    }
                    else{
                        return (
                            <>
                                <CourseLanding courseData={courseDb}/>
                                {/* <FloatingCard courseData={courseDb}/> */}
            
                                <Container>
                                    <Row>
                                        <Col lg={1} />
                                        <Col xs={12} lg={7}>
                                        <WhatToLearn courseData={courseDb} />
                                        <CourseContent sectionsData={courseDb.curriculum_context.data.sections} />
                                        <Requirements requirementsData={courseDb.requirements_data} />
                                        <Description description={courseDb.description}/>
                                        <Instructors instructorsData={courseDb.visible_instructors} />
                                        <StudentFeedback courseRating={courseDb.rating} numReviews={courseDb.num_reviews} feedbackData={courseDb.rating_distribution}/>
                                        <Reviews reviewsData={courseDb.users_reviews} />
                                        </Col>
                                        <Col lg={4} />
                                    </Row>
                                </Container>
                            </>
                        )
                    }
                }
            }
        </CoursesContext.Consumer>
    )
}