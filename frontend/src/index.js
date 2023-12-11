import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/auth.css';
import App from './App';
import { StudentsContextProvider } from './context/StudentsContext';
import { ViolationsContextProvider } from './context/ViolationsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientID = "177566154177-2qtgppuanma1jp9gum8lblaiu7lmevhh.apps.googleusercontent.com";
const SignInAuth = ({component}) => {
  const [ user, setUser ] = useState({});
  const [ signedIn, setSigned ] = useState(false);

  function handleSignOut(event) {
    setUser({});
    document.getElementById("sign-in-button").hidden = false;
    setSigned(false);
  }

  function handleCallbackResponse(response) { 
    console.log("Encoded JWT ID Token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);

    let email = userObject.email;
    if (email.includes("usc.edu.ph") == true) {
      console.log("usc account");
      document.getElementById("sign-in-button").hidden = true;
      setSigned(true);
    } else {
      console.log("not usc account");
      setSigned(false);
      document.getElementById("error").innerText = "Please use USC Account."

    }
  }
  useEffect(() => {
    /*global google*/
    console.log(user);
    google.accounts.id.initialize({
      client_id: "177566154177-2qtgppuanma1jp9gum8lblaiu7lmevhh.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("sign-in-button"),
      { theme: "outline", size: "large"}
    );
  }, []);

  return (
    <div className="main">
      <div className="sign-in-form">

        { signedIn == false && 
              <div className="sign-in">
                <div className="wrapper">
                    <h1>Welcome to the OSA Violation Tracker.</h1>
                    <p>Please sign in.</p>
                    <div id="sign-in-button"></div>
                    <p id="error" style={{color: 'var(--uscred)', fontSize: '2em'}}></p>
                  </div>
              </div>
        }
        { signedIn == true && 
          <div className="signed-in">
                      {component}  
          </div>

        }

      </div>
    </div>

  )
}

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="177566154177-2qtgppuanma1jp9gum8lblaiu7lmevhh.apps.googleusercontent.com">
    <StudentsContextProvider>
      <ViolationsContextProvider>
        <SignInAuth component={<App></App>}></SignInAuth>
      </ViolationsContextProvider>
    </StudentsContextProvider>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);

