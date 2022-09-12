import "./HomePage.sass"

import Landing from './components/Landing';
import Courses from './components/Courses';
import TopCategories from "./components/TopCategories";
import { useSearchParams } from "react-router-dom";

export default function HomePage(){

    const [search_params, set_search_params] = useSearchParams();

    return (
        <>
            <Landing />
            <Courses filterString={search_params.get("search") || ""}/>
            <TopCategories />
        </>
    )
}