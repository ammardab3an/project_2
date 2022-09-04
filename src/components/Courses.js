import "./Courses.sass";
import Container from "react-bootstrap/Container";
import CoursesSlider from "./CoursesSlider";
import TopCategories from "./TopCategories";

export default function Courses({filterString}){

    return (

        <main id="courses" className="courses">

            <Container>
                <h2>A broad selection of courses</h2>
                <p>Choose from 185,000 online video courses with new additions published every month</p>
            </Container>

            <CoursesSlider filterString={filterString}/>

            <TopCategories />
            
        </main>
    )
}