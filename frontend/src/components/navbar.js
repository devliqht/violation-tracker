import './../css/navbar.css'
import SchoolLogo from './../assets/reportheader1.png'
import Profile from './../assets/profile.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

const TopNavbar = () => {
    const [ time, setTime ] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date().toLocaleString());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    return (
        <div className="top-navbar">
            

            <div className="menu-button">
                <i className="fa-solid fa-bars fa-2x"></i>  
            </div> 


            <Link to="/" style={{textDecoration: 'none'}}>
                <img className="school-logo" src={SchoolLogo} alt="School Logo"></img>
            </Link>
            <h1 className="nav-title">Violation Tracker</h1>   
            <h3 className="date-and-time">{time}</h3>
            <div className="nav-links">
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F' style={{borderLeft: '1px solid #d9d9d9'}}><h3>ISMIS</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>USC Website</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>USC Facebook Page</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>Contact</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>Help</h3></a>
            </div>

            <h3 className="db-indicator"><code>Database Connection 200 OK</code></h3>

        </div>
    )
}

const SideNavbar = () => {
    return (
        <div className="side-navbar">
            <div className="side-item" id="profile-button">
                <img className="profile-icon" src={Profile} alt="Profile Icon"></img>
            </div>
            <Link to="/" style={{textDecoration: 'none', color: 'black'}}>
                <div className="side-item" id="home-button">
                    <i className="fa-solid fa-home fa-2x"></i>  
                    <p className="side-title">Home</p>
                </div>
            </Link>
            <Link to="/students" style={{textDecoration: 'none', color: 'black'}}>
                <div className="side-item" id="students-button">
                    <i className="fa-solid fa-user fa-2x"></i>  
                    <p className="side-title">Students</p>
                </div>
            </Link>

            <Link to="/history" style={{textDecoration: 'none', color: 'black'}}>
                <div className="side-item" id="history-button">
                    <i className="fa-solid fa-clock-rotate-left fa-2x"></i>  
                    <p className="side-title">History</p>
                </div>
            </Link>

            <div className="side-item" id="export-button">
                <i className="fa-solid fa-file-export fa-2x"></i>  
                <p className="side-title">Export</p>
            </div>
            <div className="side-item" id="import-button">
                <i className="fa-solid fa-file-import fa-2x"></i>  
                <p className="side-title">Import</p>
            </div>
            <div className="side-item" id="settings-button">
                <i className="fa-solid fa-gear fa-2x"></i>  
                <p className="side-title">Settings</p>
            </div>
            <Link to="/info" style={{textDecoration: 'none', color: 'black'}}>
                <div className="side-item" id="info-button">
                    <i className="fa-solid fa-circle-question fa-2x"></i>  
                    <p className="side-title">Info</p>
                </div>
            </Link>

        </div>
    )
}
export {
    TopNavbar,
    SideNavbar
}