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

export default function CoursePage(){

    const {courseId} = useParams();
    const [course_db, set_course_db] = React.useState({});
    const [data_is_fetched, set_data_is_fetched] = React.useState(false);

    React.useEffect(()=>{
        fetch("https://api.npoint.io/c6f4ed954b5aad734f00")
            .then(res => res.json())
            .then(res => fetch(`https://api.npoint.io/${res[courseId]}`))
            .then(res => res.json())
            .then(res => {
                set_data_is_fetched(true);
                set_course_db(res);
            });
    }, [courseId]);
    
    return (

        !data_is_fetched ? <LoadingSpinner /> :

        <>
            
            <CourseLanding courseData={course_db}/>
            {/* <FloatingCard courseData={course_db}/> */}

            <Container>
                <Row>
                    <Col lg={1} />
                    <Col xs={12} lg={7}>

                    <WhatToLearn courseData={course_db} />

                    <CourseContent sectionsData={course_db.curriculum_context.data.sections} />
                    
                    <Requirements requirementsData={course_db.requirements_data} />
                    
                    <Description description={course_db.description}/>
                    
                    <Instructors instructorsData={course_db.visible_instructors} />

                    <StudentFeedback courseRating={course_db.rating} numReviews={course_db.num_reviews} feedbackData={course_db.rating_distribution}/>

                    <Reviews reviewsData={course_db.users_reviews} />

                    </Col>
                    
                    <Col lg={4} />
                </Row>
            </Container>
        </>
    )
}