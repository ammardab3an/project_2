import "./FloatingCard.sass"

export default function FloatingCard({courseData}) {

    return (
        <div className="fix-pos">
            <div className="floating-card">
                <iframe className="course-video" width="560" height="315" src="https://www.youtube.com/embed/_uQrJ0TkZlc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    )
}