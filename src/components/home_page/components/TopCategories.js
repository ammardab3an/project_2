import "./TopCategories.sass"
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { CoursesContext } from "../../CoursesContext";

function Category({category}) {
    return (
        <div className="col">
            <img className="d-block w-75 m-auto" src={category.img} alt={category.name}></img>
            <h3 className="fs-6 fw-bold">{category.name}</h3>
        </div>
    )
}
export default function TopCategories(){

    
    return (
        
        <CoursesContext.Consumer>
            {
                ({topCategories}) => (
                    topCategories
                    ? 
                        <section id="top_categories" className="container">
                            <h2 className="fs-4 fw-bold p-4">Top categories</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 text-center">
                            {
                                Object.keys(topCategories).map((e, idx) => <Category key={idx} category={topCategories[e]}/>)
                            }
                            </div>
                        </section>
                    : <LoadingSpinner />
                )
            }
        </CoursesContext.Consumer>
    )
}