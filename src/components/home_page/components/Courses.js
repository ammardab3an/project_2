import "./Courses.sass";
import React from "react";
import Container from "react-bootstrap/Container";
import CoursesSlider from "./CoursesSlider";
import LoadingSpinner from "./LoadingSpinner";
import { CoursesContext } from "../../CoursesContext";

export default function Courses({filterString}){

    return (

        <main id="courses" className="courses">

            <Container>
                <h2>A broad selection of courses</h2>
                <p>Choose from 185,000 online video courses with new additions published every month</p>
            </Container>
            
            <CoursesContext.Consumer>
                {
                    ({coursesList}) => (
                        coursesList
                            ? <CoursesSlider filterString={filterString} coursesDb={coursesList}/>
                            : <LoadingSpinner />
                    )
                }       
            </CoursesContext.Consumer>
        </main>
    )
}