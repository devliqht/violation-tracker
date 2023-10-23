import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useStudentsContext } from './hooks/useStudentsContext';
import { StudentsContext } from './context/StudentsContext';

// Pages and Components
import Home from './pages/home';
import { TopNavbar, SideNavbar } from './components/navbar';
import { StudentView } from './pages/StudentView';
import { BrowserView } from './pages/browserView';

function App() {
  const { students, dispatch } = useStudentsContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students')
      const json = await response.json()

      if (response.ok) {
          console.log("Database Response OK")
        dispatch({type: 'SET_STUDENTS', payload: json})
      } else {
          console.log("Database Response NOT OK")
      }
    }

    fetchStudents()
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
      <TopNavbar />
      <div className="body-wrapper">
        <SideNavbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/students" element={<div className="view"><StudentView/></div>}/>
                  {students && students.map(student => (
                    <Route path={"/students/"+student._id} element={<div className="view"><StudentView/><BrowserView student={student} key={student._id}/></div>}></Route>
                  ))} 
            </Routes>
          </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
