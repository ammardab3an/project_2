import React from "react";
import "./CoursesSlider.sass";
import {db} from "../data/courses_groups";
import Nav from "react-bootstrap/Nav";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const BREAKING_POINTS = {
    _0_xs: 0,
    _1_sm: 576,
    _2_md: 768,
    _3_lg: 992,
    _4_xl: 1200,
    _5_xxl: 1400
};
const CARDS_BP = {
    _0_xs: 1,
    _1_sm: 2,
    _2_md: 3,
    _3_lg: 4,
    _4_xl: 4,
    _5_xxl: 4
};

function calc_cards_per_slide_value() {
    for (const bp of Object.keys(BREAKING_POINTS).reverse()) {
        if (BREAKING_POINTS[bp] <= window.innerWidth) {
            return CARDS_BP[bp];
        }
    }
}

function GroupsNav({groups, selectedGroupSetter}) {

    return (
        <Nav variant="tabs" className="container mb-3" defaultActiveKey={groups[0]}>
            {
                groups.map((group, idx) => (
                    <Nav.Item key={idx} id={group} onClick={()=>selectedGroupSetter(group)}>
                        <Nav.Link className="text-secondary" eventKey={group}>{db[group].name}</Nav.Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    );
}

function GroupInfo({groupName}) {

    const group = db[groupName];

    return (
        <>
            <h2 className="course_title">{group.header}</h2>
            <p className="course_desc">{group.description}</p>
            <button className="explore">{"Explore " + group.name}</button>
        </>
    )
}

function Stars({rating}) {

    let ret = [];
    const MAX_NUMBER_OF_STARS = 5;
    for (let i = 1; i <= MAX_NUMBER_OF_STARS; i++) {
        if (rating >= i) {
            ret.push(<FontAwesomeIcon key={i} icon={solid("star")} />)
        }
        else if (rating + 0.5 >= i) {
            ret.push(<FontAwesomeIcon key={i} icon={regular("star-half-stroke")} />)
        }
        else {
            ret.push(<FontAwesomeIcon key={i} icon={regular("star")}/>)
        }
    }

    return (
        <div className="stars">
            {ret}
        </div>
    )
    
}

function CourseCard({idx, course, cardsPerSlide}) {
    return (
        <div key={idx} className={`col-${12 / cardsPerSlide}`}>
            
            <figure>
                <img className="d-block w-100" src={course.image} alt={course.title}></img>
                <figcaption>{course.title}</figcaption>
            </figure>

            {
                course.instructors.map((instructor, idx) =>
                    <h4 key={idx} className="author">{instructor.name}</h4>
                )
            }

            <Stars rating={course.rating} />

            <h3 className="price">${course.price}</h3>
        </div>
    )
}

function CoursesCarousel({groupName, filterString, cardsPerSlide}) {

    const group = db[groupName];
    const courses = group.courses.filter(course => course.title.toLowerCase().includes(filterString));
    const [index, setIndex] = React.useState(0);

    const handelSelect = (selectedIndex, e) => {
        console.log(selectedIndex);
        setIndex(selectedIndex);
    }

    React.useEffect(()=>setIndex(0), [groupName, filterString]);

    let slides = [];
    courses.forEach((course, idx) => {
        if (idx % cardsPerSlide === 0) {
            slides.push([]);
        }
        slides[slides.length - 1].push(course);
    });

    return (
        <Carousel key={filterString} className="courses_carousel" activeIndex={index} onSelect={handelSelect} indicators={false}>
            {
                slides.map((slide, idx) => (
                    <Carousel.Item key={idx} className="carousel-item">
                        <div className="row">
                            {
                                slide.map((course, idx) => 
                                    <CourseCard key={idx} course={course} cardsPerSlide={cardsPerSlide} />
                                )
                            }
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )   
}

function CoursesSlider({filterString}) {

    const groups = Object.keys(db);
    const [selected_group, set_selected_group] = React.useState(groups[0]);
    const [cards_per_slide, set_cards_per_slide] = React.useState(calc_cards_per_slide_value());

    React.useEffect(() => {
        window.addEventListener("resize", (e) => {
            set_cards_per_slide(calc_cards_per_slide_value());
        });
    }, []);

    return (
        <>
            <GroupsNav groups={groups} selectedGroupSetter={set_selected_group} />

            <section className="container mb-4">
                <div className="selected_group">
                    <GroupInfo groupName={selected_group} />
                    <CoursesCarousel groupName={selected_group} filterString={filterString} cardsPerSlide={cards_per_slide} />
                </div>
            </section>
        </>
    )
}


export default CoursesSlider;