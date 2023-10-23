import './../css/browserview.css'

import { Link } from "react-router-dom"
import { useStudentsContext } from "./../hooks/useStudentsContext"
import { useEffect } from "react"
import { StudentsContext } from "../context/StudentsContext"

const BrowserView = ({student}) => {
    return (
        <div className="browser-view">
            <div className="student-indicator">
                <i className="fa-solid fa-user fa-2x"></i>  
                <p className="side-title"> / {student.studentName} ({student._id})</p>
            </div>
        </div>
    )
}

export {
    BrowserView
}