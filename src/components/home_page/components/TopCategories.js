import "./TopCategories.sass"
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

function gen_category(idx, category) {
    return (
        <div key={idx} className="col">
            <img className="d-block w-75 m-auto" src={category.img} alt={category.name}></img>
            <h3 className="fs-6 fw-bold">{category.name}</h3>
        </div>
    )
}
export default function TopCategories(){

    const [data_is_fetched, set_data_is_fetched] = React.useState(false);
    const [top_categories, set_top_categories] = React.useState({});
    
    React.useEffect(()=>{
        fetch("https://api.npoint.io/5d666b620e2b069620a2")
            .then((res) => res.json())
            .then((res) => {
                set_top_categories(res);
                set_data_is_fetched(true);
            });
    }, []);

    
    return (
        data_is_fetched
        ? 
            <section id="top_categories" className="container">
                <h2 className="fs-4 fw-bold p-4">Top categories</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 text-center">
                {
                    Object.keys(top_categories).map((category, idx) => gen_category(idx, top_categories[category]))
                }
                </div>
            </section>
        : <LoadingSpinner />
    )
}