import "./HomePage.sass"

import Landing from './components/Landing';
import Courses from './components/Courses';
import TopCategories from "./components/TopCategories";

export default function HomePage({filterString}){
    return (
        <>
            <Landing />
            <Courses filterString={filterString}/>
            <TopCategories />
        </>
    )
}