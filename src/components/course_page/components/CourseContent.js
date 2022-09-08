import "./CourseContent.sass"
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Row, Col } from "react-bootstrap";

const MAX_SHOWN_SECTIONS = 7;

function CurriculumSection({idx, expand, sectionData}){

    const [is_expanded, set_is_expanded] = React.useState(false);
    useEffect(()=>set_is_expanded(expand), [expand]);
    
    return (
        <div key={idx}>
            <div className="section-header">
                
                <span className="section-header-title" onClick={()=>set_is_expanded(!is_expanded)}>
                    {
                        is_expanded 
                            ? <FontAwesomeIcon icon={solid("angle-up")} />
                            : <FontAwesomeIcon icon={solid("angle-down")} />
                    }
                    {sectionData.title}
                </span>

                <span className="section-header-info">{sectionData.lecture_count} {sectionData.lecture_count>1 ? "lectures" : "lecture"} . {sectionData.content_length_text}</span>
            </div>

            {
                is_expanded ? sectionData.items.map((e, idx) => (
                    <div key={idx} className="section-details">
                        <Row>

                            <Col xs={1}>
                                <FontAwesomeIcon icon={solid("circle-play")}/>
                            </Col>

                            <Col xs={8}>
                                <span>{e.title}</span>
                            </Col>

                            <Col xs={2}>
                                {
                                    e.can_be_previewed 
                                        ? <span>Preview</span>
                                        : <></>
                                }
                            </Col>

                            <Col xs={1}>
                                <span>{e.content_summary}</span>
                            </Col>
                        </Row>
                    </div>
                )) : <></>
            }
            
        </div>
    )
}

export default function CourseContent({sectionsData}){

    const [show_more, set_show_more] = React.useState(0);
    const [expand_all, set_expand_all] = React.useState(false);

    return (
        <div className="course-content">

            <div className="sections-sum">
                <span className="dot">{sectionsData.sections.length} sections</span>
                <span className="dot">{sectionsData.num_of_published_lectures} lectures</span>
                <span>{sectionsData.estimated_content_length_text} total content length</span>
                <span className="show-more-less-desc-btn expand-compress-btn" onClick={()=>set_expand_all(!expand_all)}>{!expand_all ? "Expand all sections" : "Compress all sections"}</span>
            </div>

            {
                sectionsData.sections.map((e, idx) => (

                    (show_more || idx < MAX_SHOWN_SECTIONS)
                        ? <CurriculumSection expand={expand_all} key={idx} sectionData={e} />
                        : <></>
                ))
            }

            <div className="show-more-less-btn" onClick={()=>set_show_more(!show_more)}>
                {
                    show_more 
                            ? <span>Show less sections <FontAwesomeIcon icon={solid("angle-up")} /></span>
                            : <span>Show more sections <FontAwesomeIcon icon={solid("angle-down")} /></span>
                }
            </div>
        </div>
    )
}