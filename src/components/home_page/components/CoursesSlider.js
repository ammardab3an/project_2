import React, {useEffect, useRef, useState} from "react";
import "./CoursesSlider.sass";
import Nav from "react-bootstrap/Nav";
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import Stars from "./Stars"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const CoursesContext = React.createContext({});

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

    const coursesDb = React.useContext(CoursesContext);

    return (
        <Nav variant="tabs" className="container mb-3" defaultActiveKey={groups[0]}>
            {
                groups.map((group, idx) => (
                    <Nav.Item key={idx} id={group} onClick={()=>selectedGroupSetter(group)}>
                        <Nav.Link className="text-secondary" eventKey={group}>{coursesDb[group].name}</Nav.Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    );
}

function GroupInfo({groupName}) {

    const coursesDb = React.useContext(CoursesContext);
    const group = coursesDb[groupName];

    return (
        <>
            <h2 className="course_title">{group.header}</h2>
            <p className="course_desc">{group.description}</p>
            <button className="explore">{"Explore " + group.name}</button>
        </>
    )
}

function CoursePopUp({course, display, leftRight}){

    const st = {
        "display": [display],
        [leftRight]: "100%"
    }

    return (
        <div className="pop-up" style={st}>
            <h5 className="pop-up-title">{course.title}</h5>
            <p className="pop-up-updated">Updated <b>September 2022</b></p>
            <p className="pop-up-hours">31 total hours . All Levels . Subtitles</p>
            <p className="pop-up-headline">{course.headline}</p>
            <div className="pop-up-list">
                <p><FontAwesomeIcon icon={solid("check")} /> Lorem ipsum dolor sit amet consectetur</p>
                <p><FontAwesomeIcon icon={solid("check")} /> Lorem ipsum dolor sit amet consectetur</p>
                <p><FontAwesomeIcon icon={solid("check")} /> Lorem ipsum dolor sit amet consectetur</p>
                <p><FontAwesomeIcon icon={solid("check")} /> Lorem ipsum dolor sit amet consectetur</p>
            </div>

            <button className="add-to-cart-btn">Add to cart</button>
            <div className="favorite d-inline-block">
                <FontAwesomeIcon icon={regular("heart")} />
            </div>
        </div>
    )
}

function CourseCard({idx, course, cardsPerSlide}) {

    const courseRef = useRef();
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(()=>{

        const handelEnter = ()=>setShowPopUp(true);
        const handelLeave = ()=>setShowPopUp(false);

        if(courseRef.current){
            courseRef.current.addEventListener("mouseenter", handelEnter, false);
            courseRef.current.addEventListener("mouseleave", handelLeave, false);
        }

        return ()=>{
            if(courseRef.current){
                courseRef.current.removeEventListener("mouseenter", handelEnter);
                courseRef.current.removeEventListener("mouseleave", handelLeave);
            }
        }

    }, [courseRef])

    return (
        <div ref={courseRef} className={`course-card col-${12 / cardsPerSlide}`}>
            
            <Link className={"d-block text-decoration-none"} to={`course_info/${course.id}`}>
                <figure>
                    <img className="d-block w-100" src={course.image} alt={course.title}></img>
                    <figcaption className="text-dark">{course.title}</figcaption>
                </figure>
            </Link>
            
            <CoursePopUp course={course} display={showPopUp ? "block" : "none"} leftRight={idx<2 ? "left" : "right"}/>

            {
                course.instructors.map((instructor, idx) =>
                    <h5 key={idx} className="author">{instructor.name}</h5>
                )
            }

            <p>
                <Stars showRating rating={course.rating} />

                <small className="text-muted">
                    ({2342*(idx+1)})
                </small>
            </p>

            <p className="price">
                <span className="fs-5">${course.price}  </span> 
                <span className="text-decoration-line-through text-secondary fs-6">${Math.floor(course.price * 1.78)+0.99}</span>
            </p>
            
        </div>
    )
}

function CoursesCarousel({groupName, filterString, cardsPerSlide}) {

    const coursesDb = React.useContext(CoursesContext);
    const group = coursesDb[groupName];
    const courses = group.courses.filter(course => course.title.toLowerCase().includes(filterString));
    const [index, setIndex] = React.useState(0);

    const handelSelect = (selectedIndex, e) => {
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
        <Carousel key={filterString} className="courses_carousel" activeIndex={index} onSelect={handelSelect}
            nextIcon={<FontAwesomeIcon className="carousel-control" icon={solid("circle-arrow-right")} />}
            prevIcon={<FontAwesomeIcon className="carousel-control" icon={solid("circle-arrow-left")} />}
            indicators={true} slide={false}
        >
            {
                slides.map((slide, idx) => (
                    <Carousel.Item key={idx} className="carousel-item">
                        <div className="row">
                            {
                                slide.map((course, idx) => 
                                    <CourseCard key={idx} idx={idx} course={course} cardsPerSlide={cardsPerSlide} />
                                )
                            }
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )   
}

function CoursesSlider({filterString, coursesDb}) {

    const groups = Object.keys(coursesDb);
    const [selected_group, set_selected_group] = React.useState(groups[0]);
    const [cards_per_slide, set_cards_per_slide] = React.useState(calc_cards_per_slide_value());
    
    React.useEffect(() => {
        window.addEventListener("resize", (e) => {
            set_cards_per_slide(calc_cards_per_slide_value());
        });
    }, []);

    return (
        <>
            <CoursesContext.Provider value={coursesDb}>
                <GroupsNav groups={groups} selectedGroupSetter={set_selected_group} />

                <section className="container mb-4">
                    <div className="selected_group">
                        <GroupInfo groupName={selected_group} />
                        <CoursesCarousel groupName={selected_group} filterString={filterString} cardsPerSlide={cards_per_slide} />
                    </div>
                </section>
            </CoursesContext.Provider>
        </>
    )
}


export default CoursesSlider;