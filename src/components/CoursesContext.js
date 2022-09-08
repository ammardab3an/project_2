import React, {useState} from "react"
import { createContext, useEffect } from "react"

export const CoursesContext = createContext({});
export const CoursesProvider = (props) => {

    const {children} = props;
    const [coursesDb, setCoursesDb] = useState({});
    const [coursesList, setCoursesList] = useState();
    const [topCategories, setTopCategories] = useState();

    useEffect(()=>{

        fetch("https://api.npoint.io/6890a64db08fb966df1a")
            .then((res) => res.json())
            .then((res) => {
                setCoursesList(res);
            });    
    
        fetch("https://api.npoint.io/5d666b620e2b069620a2")
            .then((res) => res.json())
            .then((res) => {
                setTopCategories(res);
            });
    }, []);
    
    const queryCourse = (courseId) => {
        
        // until we update the database with other courses
        courseId = 394676;

        if(courseId in coursesDb){
            if(coursesDb[courseId].fetching){
                return null;
            }
            else{
                return coursesDb[courseId];
            }
        }
        else{

            setCoursesDb((old) => ({
                ...old,
                [courseId]: {"fetching": true}
            }));

            fetch("https://api.npoint.io/c6f4ed954b5aad734f00")
                .then(res => res.json())
                .then(res => fetch(`https://api.npoint.io/${res[courseId]}`))
                .then(res => res.json())
                .then(res => {
                    setCoursesDb(old => ({
                        ...old, 
                        [courseId] : {...res, 
                            "fetching": false
                        }
                    }));
                })

            return null;
        }
    }

    const coursesContext = {
        coursesDb,
        coursesList,
        topCategories,
        queryCourse
    };

    return <CoursesContext.Provider value={coursesContext}>{children}</CoursesContext.Provider>;
}