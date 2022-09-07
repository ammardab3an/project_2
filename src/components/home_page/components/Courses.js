import "./Courses.sass";
import React from "react";
import Container from "react-bootstrap/Container";
import CoursesSlider from "./CoursesSlider";
import LoadingSpinner from "./LoadingSpinner";

export default function Courses({filterString, coursesDb, dataIsFetched}){

    const [data_is_fetched, set_data_is_fetched] = React.useState(false);
    const [courses_db, set_courses_db] = React.useState({});
    
    React.useEffect(()=>{
        fetch("https://api.npoint.io/6890a64db08fb966df1a")
            .then((res) => res.json())
            .then((res) => {
                set_courses_db(res);
                set_data_is_fetched(true);
            });
    }, []);

    return (

        <main id="courses" className="courses">

            <Container>
                <h2>A broad selection of courses</h2>
                <p>Choose from 185,000 online video courses with new additions published every month</p>
            </Container>
            
            {
                data_is_fetched
                    ? <CoursesSlider filterString={filterString} coursesDb={courses_db}/>
                    : <LoadingSpinner />
            }       
        </main>
    )
}