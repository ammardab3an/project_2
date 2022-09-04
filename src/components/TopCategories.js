import "./TopCategories.sass"
import {top_categories} from "../data/top_categories"

function gen_category(idx, category) {
    return (
        <div key={idx} className="col">
            <img className="d-block w-75 m-auto" src={category.img} alt={category.name}></img>
            <h3 className="fs-6 fw-bold">{category.name}</h3>
        </div>
    )
}
export default function TopCategories(){
    return (
        <section id="top_categories" className="container">
            <h2 className="fs-4 fw-bold p-4">Top categories</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 text-center">
                {
                    Object.keys(top_categories).map((category, idx) => gen_category(idx, top_categories[category]))
                }
            </div>
        </section>
    )
}