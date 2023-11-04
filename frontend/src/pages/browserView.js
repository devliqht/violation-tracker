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

const BrowserView = ({student}) => {
    const violationArray = ["20.1.1 Entering the University campus without a valid USC SHS ID.", "20.1.2 Not wearing the official USC SHS ID on campus.", "20.1.3 Using two or more ID cards or gate pass by whatever means or manner.", "20.1.4 Tailgating: Borrowing or lending of USC SHS ID, gate pass, library card, official receipt, or other relevant and official school documents for whatever purpose or intention to gain entry at any University campus.", "20.1.5 Tampering one’s own or another student’s SHS ID card and using it to gain entry to USC premises, whether or not damage was inflicted on any member of the USC academic community.", "20.1.6 Membership in fraternities/sororities and other unrecognized organizations.", "20.1.7 Organizing and recruitment of USC SHS students and other students to become members of unrecognized USC organizations such as fraternities, sororities, and other illegal organizations in and outside the University campus.", "20.1.8 Representing, wearing, or using any uniform, insignia, or other identifying marks of the University or any SHS office without authorization for personal gain.", "20.1.9 Unauthorized access of computer files (i.e. hacking and other IT-related violations).", "20.1.10 Cybercrime as defined in R.A. No. 10175, including various cyber-related offenses.", "20.1.11 Entering the University campus or off-campus sites under the influence of alcohol and prohibited substances.", "20.1.12 Bringing intoxicating beverages in whatever quantity onto the University campus.", "20.1.13 Possession of cigarette, e-cigarette, vaping, or any smoking paraphernalia.", "20.1.14 Violation of parking and speed limit regulations in USC Talamban Campus.", "20.1.15 Violation of curfew hours.", "20.1.16 Engaging in drinking of alcoholic beverages and/or smoking of cigarette, e-cigarette, vaping, or any smoking paraphernalia inside the University campus alone or with schoolmates or friends in school uniform or in civilian attire during school days.", "20.1.17 Possession of firearm/air gun and similar gun replicas, sharp-bladed weapons, tear gas, firecrackers, pyrotechnics, explosives, or miniature bombs inside the University campus.", "20.1.18 Vandalism: willful or malicious destruction or defacement of University properties.", "20.1.19 Indiscriminate littering on the University campus or spitting on floors or walls.", "20.1.20 Engaging in reckless and negligent behavior that endangers the life and well-being of persons.", "20.1.21 Tampering with fire alarms and extinguishers.", "20.1.22 Loitering or making excessive noise in corridors, stairways, or immediate vicinities during class hours or beyond curfew hours.", "20.1.23 Loud and disturbing arguments, shouting, and unrestrained laughter/loud talking in the classroom, corridors, stairways, and immediate vicinities that disrupt classes or academic activities.", "20.1.24 Unauthorized use of cellular phones, iPods, or other communication gadgets, and earphones inside the classroom while classes, examination, or other academic activities are going on.", "20.1.25 Non-attendance in required academic and non-academic school activities or meetings.", "20.1.26 Refusal to surrender the USC SHS ID upon reasonable demand by school authority.", "20.1.27 Non-submission of return slips on the due date.", "20.1.28 Non-observance of proper decorum, policies, and regulations in USC North and South schools.", "20.1.29 Unauthorized classroom visitation while class is ongoing.", "20.1.30 Deliberate non-observance of University protocol during earthquake and fire drills.", "20.1.31 Entering, hiding in, and/or staying in restricted or off-limit areas within the University campus.", "20.1.32 Cutting classes: deliberate absence from attending classes.", "20.1.33 Bringing in and/or playing with any gambling paraphernalia and engaging in gambling activities inside the University campus and off-campus sites.", "20.1.34 Using or entering the restrooms of the opposite sex.", "20.1.35 Any act or infraction punishable under the rules and regulations of the University or the laws of the land even when the act was committed outside the school campus.", "20.1.36 Doing other activities while the class is ongoing, i.e. working on another subject's assignment, eating, sleeping, playing, etc.", "20.1.37 Disruptive behavior, including pushing others, throwing objects at others, giving unsolicited comments, or any other form of distraction.", "20.1.38 Overdue claiming of confiscated USC SHS IDs.", "20.1.39 Deliberate disruption of classes, academic functions, or activities within the University premises.", "20.1.40 Brawls, riots, hooliganism on or off-campus.", "20.1.41 Instigating or participating in group activities, gatherings, rallies, and the like that result in stoppage or disruption of classes and/or other academic activities.", "20.1.42 Causing panic or confusion that leads to the disruption of classes and other academic activities.", "20.1.43 Barricading, picketing, preventing, or threatening any student from entering the University campus or attending classes, and/or school personnel from reporting for work.", "20.1.44 Initiating or participating in activities contrary to law or public order.", "20.1.45 Subverting or defying policies and guidelines of any office of University and DepEd.", "20.1.46 Failure to report for disciplinary sanction for serious and very serious offenses.", "20.1.47 Acting as an accessory or an accomplice in a serious and/or very serious offense.", "20.1.48 Failure to submit within three (3) working days an apology letter for minor offenses.", "20.2.1 Disrespect or discourtesy of any member of the USC Community and its guests resulting in ridicule, embarrassment, or humiliation through any means and medium.", "20.2.2 Extortion, unauthorized solicitations, and similar acts committed against other students, faculty, administrators, office staff, members of the academia, and employees both within and outside the University.", "20.2.3 Oral defamation or slander in any platform or medium of expression.", "20.2.4 Assault resulting in physical injury or damage to property.", "20.2.5 Inflicting or attempting to inflict physical harm on others.", "20.2.6 Instigating or participating in acts that result in physical and moral injury to others.", "20.2.7 Threatening to use any form of weapon to harm anybody inside the University campus and/or off-campus during non-school days.", "20.2.8 Grave threats, intimidation, coercion against any member of the school community.", "20.2.9 Any act of violence against women as defined in the Anti-Violence against Women and their Children Act of 2004.", "20.2.10 Digital Misconduct as defined in the Data Privacy Act of 2012.", "20.2.11 Sexual harassment as defined in the Anti-Sexual Harassment Act of 1995.", "20.2.12 Acts of lasciviousness or other acts of misconduct of a sexual nature.", "20.2.13 The use of text messaging or similar networking techniques to send and receive sexually explicit messages or photographs.", "20.2.14 Gender-Based Sexual Harassment in streets and public places as defined in the Safe Space Act.", "20.2.15 Compromising the well-being of a person by harassing, stalking, and coercing in physical and psychological ways.", "20.2.16 Distribution, transmission, uploading, or downloading of offensive videos and/or pictures of any member of the USC community and/or others outside of the University as defined in the Anti-Photo and Video Voyeurism Act of 2009.", "20.2.17 Capturing, filming, or video recording any member of the USC community and/or others outside of the University with offensive contents/shots as defined in the Anti-Photo and Video Voyeurism Act of 2009.", "20.2.18 Hazing as defined in the Anti-Hazing Law.", "20.2.19 Bullying/cyberbullying or any act degrading the dignity of an individual as defined in the Anti-Bullying Act and the Cybercrime Prevention Act.", "20.2.20 Open defiance to school authority's advice, instruction, or directive towards proper conduct and decorum.", "20.2.21 Unauthorized use of the name of teachers or school officials as co-author of an article to assure its publication.", "20.3.1 Unauthorized use of school facilities or equipment.", "20.3.2 Irresponsible use of school properties resulting in damage.", "20.3.3 Using school facilities, equipment, school properties irresponsibly and without authorization.", "20.3.4 Vandalizing, defacing, destroying, and/or losing the properties of the University or those belonging to any member of the institution.", "20.3.5 Tampering with school records, notices, and official school announcements on bulletin boards and classroom reader board signs.", "20.3.6 Stealing and mutilation of library materials.", "20.3.7 Ransacking bags, drawers, and cabinets with the intent to steal.", "20.3.8 Stealing in and out of the University campus.", "20.3.9 Posting and displaying libelous, obscene, indecent, offensive, subversive, or seditious materials on campus and/or off-campus.", "20.3.10 Copyright infringement as defined in Philippine copyright and intellectual property laws.", "20.4.1 Forging signatures of parents, legal guardians, school administrators, teachers, classmates, and persons in authority.", "20.4.2 Falsification, tampering, alteration, or misuse of official school records, documents, or credentials, or any other acts indicating fraud or misrepresentation.", "20.4.3 Authorship, publication, or circulation of false information and fake news about the University, its officials, members of the faculty, employees, or students.", "20.4.4 Lying, misrepresenting, and other acts of perjury committed during a formal disciplinary proceeding or other investigative proceedings.", "20.4.5 Academic Misconduct (Plagiarism).", "20.4.6 Cheating.", "20.4.7 Collusion.", "20.5.1 Proselytizing, attempting to convert others to one’s religion by disparaging or denigrating someone else's faith or by offering special gifts or favors.", "20.5.2 Any infraction punishable under the laws of the land.", "20.5.3 Disrespect of national symbols, such as mocking the national flag and/or the national anthem.", "20.5.4 Improper decorum during gatherings and programs.", "20.5.5 Coming to school or any school activity drunk or with physical signs of drug use.", "20.5.6 Possession of cigarettes, cigars, e-cigars, vapes, intoxicating beverages, etc., both in and outside the school campus.", "20.5.7 Engaging in drinking of alcoholic beverages and/or smoking of tobacco or related products in public places while in school uniform or civilian attire.", "20.5.8 Bringing firearms, air guns, sharp-bladed weapons, tear gas, firecrackers, pyrotechnics, explosives, or miniature bombs in public places.", "20.5.9 Engaging in relationships (adultery, concubinage, bigamy, live-in arrangements) that are against the laws of the land and/or teachings of the Catholic Church.", "20.5.10 Manifesting vulgar or perverted behavior between students of the same or opposite sexes.", "20.5.11 Bringing, viewing, displaying, or distributing pornographic materials on and/or off-campus.", "20.5.12 Desecrating religious images and practices.", "20.5.13 Irreverent conduct in the Chapel or Church or during religious practices.", "20.5.14 Displaying public intimacy/affection that tends to offend the sensibilities of the school community and people in public places.", "20.5.15 Peeping in restrooms and/or dressing rooms.", "20.5.16 Conviction in court of a criminal offense.", "20.5.17 Scandalous sexual acts committed inside and/or outside the school campus.", "20.6.1 Failure to wear the prescribed school uniform or civilian attire.", "20.6.2 Unprescribed haircut/hairstyle.", "20.6.3 Dyeing of hair.", "20.6.4 Unshaved facial hair.", "20.6.5 Cross-dressing.", "20.6.6 Wearing of makeup (both male and female).", "20.6.7 Untrimmed fingernails and colored nails.", "20.6.8 Wearing of earrings for males, multiple earrings, nose ring, lip/tongue/eyelid, and dangling earrings for both males and females.", "20.6.9 Wearing of cap inside the classroom and hair accessories (for males).", "20.6.10 Shirts with lewd prints.", "20.6.11 Intentional body marks, body piercing, visible body tattoos, or marks by pens."]
    
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
    const violationArray = ["20.1.1 Entering the University campus without a valid USC SHS ID.", "20.1.2 Not wearing the official USC SHS ID on campus.", "20.1.3 Using two or more ID cards or gate pass by whatever means or manner.", "20.1.4 Tailgating: Borrowing or lending of USC SHS ID, gate pass, library card, official receipt, or other relevant and official school documents for whatever purpose or intention to gain entry at any University campus.", "20.1.5 Tampering one’s own or another student’s SHS ID card and using it to gain entry to USC premises, whether or not damage was inflicted on any member of the USC academic community.", "20.1.6 Membership in fraternities/sororities and other unrecognized organizations.", "20.1.7 Organizing and recruitment of USC SHS students and other students to become members of unrecognized USC organizations such as fraternities, sororities, and other illegal organizations in and outside the University campus.", "20.1.8 Representing, wearing, or using any uniform, insignia, or other identifying marks of the University or any SHS office without authorization for personal gain.", "20.1.9 Unauthorized access of computer files (i.e. hacking and other IT-related violations).", "20.1.10 Cybercrime as defined in R.A. No. 10175, including various cyber-related offenses.", "20.1.11 Entering the University campus or off-campus sites under the influence of alcohol and prohibited substances.", "20.1.12 Bringing intoxicating beverages in whatever quantity onto the University campus.", "20.1.13 Possession of cigarette, e-cigarette, vaping, or any smoking paraphernalia.", "20.1.14 Violation of parking and speed limit regulations in USC Talamban Campus.", "20.1.15 Violation of curfew hours.", "20.1.16 Engaging in drinking of alcoholic beverages and/or smoking of cigarette, e-cigarette, vaping, or any smoking paraphernalia inside the University campus alone or with schoolmates or friends in school uniform or in civilian attire during school days.", "20.1.17 Possession of firearm/air gun and similar gun replicas, sharp-bladed weapons, tear gas, firecrackers, pyrotechnics, explosives, or miniature bombs inside the University campus.", "20.1.18 Vandalism: willful or malicious destruction or defacement of University properties.", "20.1.19 Indiscriminate littering on the University campus or spitting on floors or walls.", "20.1.20 Engaging in reckless and negligent behavior that endangers the life and well-being of persons.", "20.1.21 Tampering with fire alarms and extinguishers.", "20.1.22 Loitering or making excessive noise in corridors, stairways, or immediate vicinities during class hours or beyond curfew hours.", "20.1.23 Loud and disturbing arguments, shouting, and unrestrained laughter/loud talking in the classroom, corridors, stairways, and immediate vicinities that disrupt classes or academic activities.", "20.1.24 Unauthorized use of cellular phones, iPods, or other communication gadgets, and earphones inside the classroom while classes, examination, or other academic activities are going on.", "20.1.25 Non-attendance in required academic and non-academic school activities or meetings.", "20.1.26 Refusal to surrender the USC SHS ID upon reasonable demand by school authority.", "20.1.27 Non-submission of return slips on the due date.", "20.1.28 Non-observance of proper decorum, policies, and regulations in USC North and South schools.", "20.1.29 Unauthorized classroom visitation while class is ongoing.", "20.1.30 Deliberate non-observance of University protocol during earthquake and fire drills.", "20.1.31 Entering, hiding in, and/or staying in restricted or off-limit areas within the University campus.", "20.1.32 Cutting classes: deliberate absence from attending classes.", "20.1.33 Bringing in and/or playing with any gambling paraphernalia and engaging in gambling activities inside the University campus and off-campus sites.", "20.1.34 Using or entering the restrooms of the opposite sex.", "20.1.35 Any act or infraction punishable under the rules and regulations of the University or the laws of the land even when the act was committed outside the school campus.", "20.1.36 Doing other activities while the class is ongoing, i.e. working on another subject's assignment, eating, sleeping, playing, etc.", "20.1.37 Disruptive behavior, including pushing others, throwing objects at others, giving unsolicited comments, or any other form of distraction.", "20.1.38 Overdue claiming of confiscated USC SHS IDs.", "20.1.39 Deliberate disruption of classes, academic functions, or activities within the University premises.", "20.1.40 Brawls, riots, hooliganism on or off-campus.", "20.1.41 Instigating or participating in group activities, gatherings, rallies, and the like that result in stoppage or disruption of classes and/or other academic activities.", "20.1.42 Causing panic or confusion that leads to the disruption of classes and other academic activities.", "20.1.43 Barricading, picketing, preventing, or threatening any student from entering the University campus or attending classes, and/or school personnel from reporting for work.", "20.1.44 Initiating or participating in activities contrary to law or public order.", "20.1.45 Subverting or defying policies and guidelines of any office of University and DepEd.", "20.1.46 Failure to report for disciplinary sanction for serious and very serious offenses.", "20.1.47 Acting as an accessory or an accomplice in a serious and/or very serious offense.", "20.1.48 Failure to submit within three (3) working days an apology letter for minor offenses.", "20.2.1 Disrespect or discourtesy of any member of the USC Community and its guests resulting in ridicule, embarrassment, or humiliation through any means and medium.", "20.2.2 Extortion, unauthorized solicitations, and similar acts committed against other students, faculty, administrators, office staff, members of the academia, and employees both within and outside the University.", "20.2.3 Oral defamation or slander in any platform or medium of expression.", "20.2.4 Assault resulting in physical injury or damage to property.", "20.2.5 Inflicting or attempting to inflict physical harm on others.", "20.2.6 Instigating or participating in acts that result in physical and moral injury to others.", "20.2.7 Threatening to use any form of weapon to harm anybody inside the University campus and/or off-campus during non-school days.", "20.2.8 Grave threats, intimidation, coercion against any member of the school community.", "20.2.9 Any act of violence against women as defined in the Anti-Violence against Women and their Children Act of 2004.", "20.2.10 Digital Misconduct as defined in the Data Privacy Act of 2012.", "20.2.11 Sexual harassment as defined in the Anti-Sexual Harassment Act of 1995.", "20.2.12 Acts of lasciviousness or other acts of misconduct of a sexual nature.", "20.2.13 The use of text messaging or similar networking techniques to send and receive sexually explicit messages or photographs.", "20.2.14 Gender-Based Sexual Harassment in streets and public places as defined in the Safe Space Act.", "20.2.15 Compromising the well-being of a person by harassing, stalking, and coercing in physical and psychological ways.", "20.2.16 Distribution, transmission, uploading, or downloading of offensive videos and/or pictures of any member of the USC community and/or others outside of the University as defined in the Anti-Photo and Video Voyeurism Act of 2009.", "20.2.17 Capturing, filming, or video recording any member of the USC community and/or others outside of the University with offensive contents/shots as defined in the Anti-Photo and Video Voyeurism Act of 2009.", "20.2.18 Hazing as defined in the Anti-Hazing Law.", "20.2.19 Bullying/cyberbullying or any act degrading the dignity of an individual as defined in the Anti-Bullying Act and the Cybercrime Prevention Act.", "20.2.20 Open defiance to school authority's advice, instruction, or directive towards proper conduct and decorum.", "20.2.21 Unauthorized use of the name of teachers or school officials as co-author of an article to assure its publication.", "20.3.1 Unauthorized use of school facilities or equipment.", "20.3.2 Irresponsible use of school properties resulting in damage.", "20.3.3 Using school facilities, equipment, school properties irresponsibly and without authorization.", "20.3.4 Vandalizing, defacing, destroying, and/or losing the properties of the University or those belonging to any member of the institution.", "20.3.5 Tampering with school records, notices, and official school announcements on bulletin boards and classroom reader board signs.", "20.3.6 Stealing and mutilation of library materials.", "20.3.7 Ransacking bags, drawers, and cabinets with the intent to steal.", "20.3.8 Stealing in and out of the University campus.", "20.3.9 Posting and displaying libelous, obscene, indecent, offensive, subversive, or seditious materials on campus and/or off-campus.", "20.3.10 Copyright infringement as defined in Philippine copyright and intellectual property laws.", "20.4.1 Forging signatures of parents, legal guardians, school administrators, teachers, classmates, and persons in authority.", "20.4.2 Falsification, tampering, alteration, or misuse of official school records, documents, or credentials, or any other acts indicating fraud or misrepresentation.", "20.4.3 Authorship, publication, or circulation of false information and fake news about the University, its officials, members of the faculty, employees, or students.", "20.4.4 Lying, misrepresenting, and other acts of perjury committed during a formal disciplinary proceeding or other investigative proceedings.", "20.4.5 Academic Misconduct (Plagiarism).", "20.4.6 Cheating.", "20.4.7 Collusion.", "20.5.1 Proselytizing, attempting to convert others to one’s religion by disparaging or denigrating someone else's faith or by offering special gifts or favors.", "20.5.2 Any infraction punishable under the laws of the land.", "20.5.3 Disrespect of national symbols, such as mocking the national flag and/or the national anthem.", "20.5.4 Improper decorum during gatherings and programs.", "20.5.5 Coming to school or any school activity drunk or with physical signs of drug use.", "20.5.6 Possession of cigarettes, cigars, e-cigars, vapes, intoxicating beverages, etc., both in and outside the school campus.", "20.5.7 Engaging in drinking of alcoholic beverages and/or smoking of tobacco or related products in public places while in school uniform or civilian attire.", "20.5.8 Bringing firearms, air guns, sharp-bladed weapons, tear gas, firecrackers, pyrotechnics, explosives, or miniature bombs in public places.", "20.5.9 Engaging in relationships (adultery, concubinage, bigamy, live-in arrangements) that are against the laws of the land and/or teachings of the Catholic Church.", "20.5.10 Manifesting vulgar or perverted behavior between students of the same or opposite sexes.", "20.5.11 Bringing, viewing, displaying, or distributing pornographic materials on and/or off-campus.", "20.5.12 Desecrating religious images and practices.", "20.5.13 Irreverent conduct in the Chapel or Church or during religious practices.", "20.5.14 Displaying public intimacy/affection that tends to offend the sensibilities of the school community and people in public places.", "20.5.15 Peeping in restrooms and/or dressing rooms.", "20.5.16 Conviction in court of a criminal offense.", "20.5.17 Scandalous sexual acts committed inside and/or outside the school campus.", "20.6.1 Failure to wear the prescribed school uniform or civilian attire.", "20.6.2 Unprescribed haircut/hairstyle.", "20.6.3 Dyeing of hair.", "20.6.4 Unshaved facial hair.", "20.6.5 Cross-dressing.", "20.6.6 Wearing of makeup (both male and female).", "20.6.7 Untrimmed fingernails and colored nails.", "20.6.8 Wearing of earrings for males, multiple earrings, nose ring, lip/tongue/eyelid, and dangling earrings for both males and females.", "20.6.9 Wearing of cap inside the classroom and hair accessories (for males).", "20.6.10 Shirts with lewd prints.", "20.6.11 Intentional body marks, body piercing, visible body tattoos, or marks by pens."]
    
    
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