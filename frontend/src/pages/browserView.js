import './../css/browserview.css'

import { Link } from "react-router-dom"
import { useStudentsContext } from "./../hooks/useStudentsContext"
import { useViolationsContext } from '../hooks/useViolationsContext'
import { useState, useEffect } from "react"
import { StudentsContext } from "../context/StudentsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { violationArray } from '../components/violations'

const BrowserView = ({student}) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
  
    // For violations
    const [violationName, setViolationName] = useState('')
    const [violationInfo, setViolationInfo] = useState('')
    const [violationDate, setViolationDate] = useState(currentDate);

    
    const { dispatchStudents } = useStudentsContext()
    const { violations, dispatchViolations } = useViolationsContext()

    const studentDelete = async () => {
        const response = await fetch('/api/students/' + student._id, {
          method: 'DELETE'
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatchStudents({type: 'DELETE_STUDENT', payload: json})
          window.history.go(-1)
        }
    }

    useEffect(() => {
        const fetchViolations = async () => {
          const response = await fetch('/api/students/'+student._id+'/violations')
          const json = await response.json()
    
          if (response.ok) {
              console.log("VIOLATIONS Database Response OK")
                dispatchViolations({type: 'SET_VIOLATIONS', payload: json})
          } else {
              console.log("VIOLATIONS Database Response NOT OK")
          }
        }
    
        fetchViolations()
      }, [dispatchViolations]) 
            
        const violationDelete = async (id) => {
            const response = await fetch('/api/students/' + student._id + '/violations/' + id, {
                method: 'DELETE'
            })
            const json = await response.json()
        
            if (response.ok) {
                dispatchViolations({type: 'DELETE_VIOLATION', payload: json})
            }
        }

        const SaveViolationData = async (event) => {
            event.preventDefault();
            const violationData = { violationName, violationInfo, violationDate }

            let idToBeStored = student._id;
            console.log("")
            const response = await fetch("/api/students/"+idToBeStored+"/violations", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(violationData)
            })
            const json2 = await response.json()
            if (!response.ok) {
                console.log(json2.error)
            }
            if (response.ok) {
                setViolationName('')
                setViolationDate(currentDate)
                setViolationInfo('')
                dispatchViolations({type: 'CREATE_VIOLATION', payload: json2})
            }
        }

        return (
            <div className="browser-view">
                <div className="student-info-wrapper">
                    <div className="student-indicator">
                        <i class="fa-regular fa-circle-question fa-2x"></i>
                        <p className="side-title">{student._id}</p>
                        <button className="b-red button-3" onClick={studentDelete}>Remove</button>
                    </div>

                    <h1 className="student-information-title">Student Information</h1>
                    <div className="student-wrapper">
                        <div className="student-detail-wrapper">
                            <div className="student-detail-container">
                                <h4>STUDENT NAME</h4>
                            </div>
                            <h2 className="student-name">{student.studentName}</h2>
                        </div>

                        <div className="student-detail-wrapper">
                            <div className="student-detail-container">
                                <h4>STUDENT ID</h4>
                            </div>
                            <h2 className="student-name">{student.studentID}</h2>
                        </div>

                        <div className="student-detail-wrapper">                
                            <div className="student-detail-container">
                                <h4>BLOCKSECTION</h4>
                            </div>
                            <h2 className="student-name">{student.studentBlocksection}</h2>
                        </div>
                    </div>
                    <div className="offense-history">
                        <h1>Offense History</h1>
                            <div className="offense-list">
                            {violations && violations.map(violation => (
                                <div className="history-violation" key={violation._id}>
                                    <h3>{violation.violationName}</h3>
                                    <p><strong>Date issued: </strong>{violation.violationDate}</p>
                                </div>
                            ))}
                            </div>
                    </div>

    
                </div>
                <div className="violation-view">
                    <div className="violation-indicator">
                        <i class="fa-solid fa-circle-info fa-2x" style={{color: 'var(--uscred)'}}></i><h2>Violation Info of {student.studentName} </h2>
                    </div>
                    <hr></hr>
                    <div className="violation-detail-wrapper">
                        {violations && violations.map(violation => (
                            <div className="active-violation" key={violation._id}>
                                <h3>{violation.violationName}</h3>
                                <p>{violation._id}</p>
                                <p><strong>Details: </strong>{violation.violationInfo}</p>
                                <p><strong>Date issued: </strong>{violation.violationDate}</p>
                                <p>{formatDistanceToNow(new Date(violation.createdAt), { addSuffix: true })}</p>
                                <button className="b-red button-3" onClick={() => { violationDelete(violation._id) }}>Remove</button>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <form className="add-violation-view" onSubmit={SaveViolationData}>
                    <div className="add-violation-indicator" >
                        <h2>Add Violation</h2>
                    </div>
                    <hr>
                    </hr>

                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    required
                    options={violationArray}
                    inputValue={violationName} 
                    onInputChange={(event, newInputValue) => {setViolationName(newInputValue)}}
                    renderInput={(params) => <TextField {...params} variant="filled" required label="Select Violation" />}
                    />

                    <div className="nice-form-group">
                        <label>Date of Violation/Offense Committed<span style={{color: 'var(--uscred)'}}> *</span></label>
                        <input id="add-violation-date" 
                        type="date" 
                        value={violationDate} 
                        required 
                        onChange={(Event) => {setViolationDate(Event.target.value)}} />
                    </div>

                    <div className="nice-form-group" id="add-details-violation">
                        <label>Details of Violation/Offense<span style={{color: 'var(--uscred)'}}> *</span></label>
                        <textarea id="add-details-violation" 
                        rows={5} 
                        required 
                        value={violationInfo} 
                        onChange={(Event) => {setViolationInfo(Event.target.value)}} />
                    </div> 

                    <button id="submit-button" className="button-3" role="button" type="submit">Submit</button>
                   
                </form>
            </div>
        )
}

const AddModalBrowserView = () => {
    const { dispatchStudents } = useStudentsContext()
    const { dispatchViolations } = useViolationsContext()

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
  
    // For Students
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState(0);
    const [studentBlocksection, setStudentBlockSection] = useState('STEM 11 A');
  
    // For violations
    const [violationName, setViolationName] = useState('')
    const [violationInfo, setViolationInfo] = useState('')
    const [violationDate, setViolationDate] = useState(currentDate);

    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
  
    const SaveData = async (event) => {
        event.preventDefault();
        //JSON.stringify([{violationData}]);
        const studentData = { studentName, studentID, studentBlocksection };
        let violationStudentID = studentID;

        const response = await fetch('/api/students', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData)
        })
        const json = await response.json()
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          setEmptyFields([])
          setError(null)
          setStudentName('')
          setStudentBlockSection('')
          dispatchStudents({type: 'CREATE_STUDENT', payload: json})
            const violationData = { violationName, violationInfo, violationDate, violationStudentID }

            let idToBeStored = json._id;
            console.log("")
            const response = await fetch("/api/students/"+idToBeStored+"/violations", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(violationData)
            })
            const json2 = await response.json()
            if (!response.ok) {
                console.log(json2.error)
            }
            if (response.ok) {
                setViolationName('')
                setViolationDate(currentDate)
                setViolationInfo('')
                dispatchViolations({type: 'CREATE_VIOLATION', payload: json2})
            }
        }
      }
    return (
        <div className="browser-view">
            <div className="add-student-modal" id="add-student-modal">
            <div className="student-modal-content">
                <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2>Add Student Info</h2>
                </span>

                <form className="student-form" id="student-form" onSubmit={SaveData}>

                <TextField 
                id="outlined-basic" 
                required
                value={studentName} 
                onChange={(Event) => setStudentName(Event.target.value)}
                label="Name of Student" 
                variant="outlined" />

                <TextField 
                id="outlined-basic" 
                required
                value={studentID} 
                onChange={(Event) => setStudentID(Event.target.value)}
                label="Student ID" 
                type="number"
                variant="outlined" />

                <div className="nice-form-group">
                    <label>Blocksection<span style={{color: 'var(--uscred)'}}> *</span></label>
                    <select id="add-blocksection" value={studentBlocksection} onChange={(Event) => setStudentBlockSection(Event.target.value)}>
                    <option value="STEM 11 A">STEM 11 A</option>
                    <option value="STEM 11 B">STEM 11 B</option>
                    <option value="STEM 11 C">STEM 11 C</option>
                    <option value="STEM 11 D">STEM 11 D</option>
                    <option value="STEM 11 E">STEM 11 E</option>
                    <option value="STEM 11 F">STEM 11 F</option>
                    <option value="STEM 11 G">STEM 11 G</option>
                    <option value="STEM 11 H">STEM 11 H</option>
                    <option value="STEM 11 J">STEM 11 J</option>
                    <option value="STEM 11 KH">STEM 11 K</option>
                    <option value="STEM 11 L">STEM 11 L</option>
                    <option value="STEM 11 M">STEM 11 M</option>
                    <option value="STEM 11 N">STEM 11 N</option>
                    <option value="STEM 11 O">STEM 11 O</option>
                    <option value="STEM 11 P">STEM 11 P</option>
                    <option value="STEM 11 Q">STEM 11 Q</option>
                    <option value="STEM 11 R">STEM 11 R</option>
                    <option value="STEM 11 S">STEM 11 S</option>
                    <option value="STEM 12 ST">STEM 12 ST</option>
                    <option value="STEM 12 S1">STEM 12 S1</option>
                    <option value="STEM 12 S2">STEM 12 S2</option>
                    <option value="STEM 12 S3">STEM 12 S3</option>
                    <option value="STEM 12 S4">STEM 12 S4</option>
                    <option value="STEM 12 S5">STEM 12 S5</option>
                    <option value="STEM 12 S6">STEM 12 S6</option>
                    <option value="STEM 12 S7">STEM 12 S7</option>
                    <option value="STEM 12 S8">STEM 12 S8</option>
                    <option value="STEM 12 S9">STEM 12 S9</option>
                    <option value="STEM 12 S10">STEM 12 S10</option>
                    <option value="STEM 12 T1">STEM 12 T1</option>
                    <option value="STEM 12 T2">STEM 12 T2</option>
                    <option value="STEM 12 T3">STEM 12 T3</option>
                    <option value="STEM 12 E1">STEM 12 E1</option>
                    <option value="STEM 12 E2">STEM 12 E2</option>
                    <option value="STEM 12 E3">STEM 12 E3</option>
                    <option value="STEM 12 E4">STEM 12 E4</option>
                    <option value="STEM 12 E5">STEM 12 E5</option>
                    <option value="STEM 12 E6">STEM 12 E6</option>
                    <option value="STEM 12 E7">STEM 12 E7</option>
                    </select>
                </div>

                <div className="nice-form-group">
                    <label>Date of Violation/Offense Committed<span style={{color: 'var(--uscred)'}}> *</span></label>
                    <input id="add-violation-date" 
                    type="date" 
                    value={violationDate} 
                    required 
                    onChange={(Event) => {setViolationDate(Event.target.value)}} />
                </div>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    required
                    options={violationArray}
                    inputValue={violationName} 
                    onInputChange={(event, newInputValue) => {setViolationName(newInputValue)}}
                    renderInput={(params) => <TextField {...params} required label="Violation" />}
                />

                <div className="nice-form-group" id="add-details-violation">
                    <label>Details of Violation/Offense<span style={{color: 'var(--uscred)'}}> *</span></label>
                    <textarea id="add-details-violation" 
                    rows={5} 
                    required 
                    value={violationInfo} 
                    onChange={(Event) => {setViolationInfo(Event.target.value)}} />
                </div>    
                <div className="padding-lg"></div>

                <button id="submit-button" className="button-3" role="button" type="submit">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}


export {
    BrowserView,
    AddModalBrowserView
}