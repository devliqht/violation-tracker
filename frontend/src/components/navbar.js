import './../css/navbar.css'
import SchoolLogo from './../assets/reportheader1.png'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
    return (
        <div className="top-navbar">
            <div className="menu-button">
                <i className="fa-solid fa-bars fa-2x"></i>  
            </div> 

            <h1 className="nav-title">Violation Tracker</h1>   
            <div className="nav-links">
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>ISMIS</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>USC Website</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>USC Facebook Page</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>Contact</h3></a>
                <a href='https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F'><h3>Help</h3></a>
            </div>

            <Link to="/" style={{textDecoration: 'none'}}>
                <img className="school-logo" src={SchoolLogo} alt="School Logo"></img>
            </Link>
        </div>
    )
}

const SideNavbar = () => {
    return (
        <div className="side-navbar">
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
        </div>
    )
}
export {
    TopNavbar,
    SideNavbar
}