import './../css/home.css';
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"


const Home = () => {
    return (
        <div className="home">
            <h1 className="title">
                Welcome to the OSA Violation Tracker
            </h1>
            <div id="g-sign-in"></div>
        </div>
    )
}

export default Home