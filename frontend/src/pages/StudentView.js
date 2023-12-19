import "./../css/studentview.css"
import { Link } from "react-router-dom"
import { useStudentsContext } from "./../hooks/useStudentsContext"
import { useEffect } from "react"
import { StudentsContext } from "../context/StudentsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const StudentDetails = ({student}) => {
    return (
        <Link to={"/students/"+student._id} style={{textDecoration: 'none', color: 'black'}}>
            <div className="students-details">
                <h2 className="student-details-name">{student.studentName}</h2>
                <p>{student.studentID}</p>
                <p style={{color: 'var(--uscgreen)', textAlign: 'right'}}>{formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}</p>
            </div>
        </Link>
    )

}
const StudentView = () => {
    const { students, dispatchStudents } = useStudentsContext()

    useEffect(() => {
      const fetchStudents = async () => {
        const response = await fetch('/api/students')
        const json = await response.json()
  
        if (response.ok) {
            console.log("Database Response OK")
          dispatchStudents({type: 'SET_STUDENTS', payload: json})
        } else {
            console.log("Database Response NOT OK")
        }
      }
  
      fetchStudents()
    }, [dispatchStudents])

    return (
        <div className="student-view-wrapper">
            <div className="student-navigation">


                <div className="student-action-buttons">
                    <Link to="/students/add" style={{textDecoration: 'none', color: 'black'}}>
                        <div className="student-action-button" id="students-add-button">
                            <i className="fa-solid fa-plus fa-2x"></i>  
                        </div>
                    </Link>
                    <div className="student-action-button" id="students-sort-button">
                            <i className="fa-solid fa-filter fa-2x"></i>  
                    </div>
                </div>

                <div className="student-list">
                    {students && students.map(student => (
                        <StudentDetails student={student} key={student._id}></StudentDetails>
                    ))}
                </div>
            </div>
            <div className="student-browser">

            </div>
        </div>
    )
}

const AddStudentModal = () => {
    return (
        <div className="add-student-modal">
            <p> Hello World </p>
        </div>
    )
}

export {
    StudentView,
    AddStudentModal
}