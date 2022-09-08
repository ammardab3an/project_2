import "./FloatingCard.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function FloatingCard({ courseData, landingRef }) {

    const [isVisible, setIsVisible] = useState(true);

    const observerCallBack = (entries) =>{
        const [entry] = entries;
        setIsVisible(entry.isIntersecting)
    }
    const options = ({
        root: null,
        rootMargin: "0px",
        threshold: 0
    });

    useEffect(()=>{
        const observer = new IntersectionObserver(observerCallBack, options);
        if(landingRef.current) observer.observe(landingRef.current);
        return () => {
            if(landingRef.current){
                observer.unobserve(landingRef.current);
            }
        }
    }, [landingRef, options])

    return (
        <div className={"fix-pos col-3 d-none d-lg-block " + (isVisible ? "position-absolute" : "position-fixed")}>

            <div className="floating-card">
                <div idx="course-video" className={"course-video " + (isVisible ? "d-block" : "d-none")}>
                    <iframe className="course-video-iframe" height="280" src="https://www.youtube.com/embed/_uQrJ0TkZlc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="course-add-to-cart">
                    <div className="course-current-price">
                        <span className="course-price h1">{courseData.price}</span>
                        <span className="text-decoration-line-through text-secondary">  ${Math.floor(courseData.price_detail.amount * 1.78)+0.99}</span>
                        <span className="text-secondary">  79%off</span>
                    </div>
                    <p className="text-danger">
                        <FontAwesomeIcon className="mx-1" icon={solid("clock")} />
                        <b>1 day</b> left at this price!
                    </p>

                    <button className="add-to-cart-btn">Add to cart</button>
                    <button className="buy-now-btn">Buy now</button>

                    <p className="money-back text-secondary">30-Day Money-Back Guarantee</p>

                    <div className="course-includes">
                        <p className="h6 text-weight-bold">This course includes:</p>
                        <p>
                            <FontAwesomeIcon icon={solid("desktop")} />
                            {courseData.content_info_short}
                            <span> -on-demand video</span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={solid("file")} />
                            {courseData.num_article_assets}
                            <span> {courseData.num_article_assets>1 ? "Articles" : "Article"}</span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={solid("download")} />
                            {courseData.num_additional_assets}
                            <span> downloadable {courseData.num_additional_assets>1 ? "assets" : "asset"}</span>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={solid("infinity")} />
                            Full lifetime access
                        </p>
                        <p>
                            <FontAwesomeIcon icon={solid("mobile-screen")} />
                            Access on mobile and TV
                        </p>
                        <p>
                            <FontAwesomeIcon icon={solid("trophy")} />
                            Certificate of completion
                        </p>
                    </div>

                    <div className="share-gift-coupons">
                        <span className="text-decoration-underline text-weight-bold">Share</span>
                        <span className="text-decoration-underline text-weight-bold">Gift this course</span>
                        <span className="text-decoration-underline text-weight-bold">Apply coupon</span>
                    </div>
                </div>
            </div>
        </div>
    )
}