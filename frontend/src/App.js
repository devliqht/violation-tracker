import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useStudentsContext } from './hooks/useStudentsContext';
import { StudentsContext } from './context/StudentsContext';


// Pages and Components
import Home from './pages/home';
import { TopNavbar, SideNavbar } from './components/navbar';
import { StudentView } from './pages/StudentView';
import { BrowserView, AddModalBrowserView } from './pages/browserView';
import { InfoView } from './pages/info';

function App() {
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
              <Route path="/students/add" element={<div className="view"><StudentView/><AddModalBrowserView/></div>}></Route>
              <Route path="/history" element={<div className="view"></div>}></Route>
              <Route path="/info" element={<div className="view"><InfoView></InfoView></div>}></Route>
            </Routes>
          </div>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
