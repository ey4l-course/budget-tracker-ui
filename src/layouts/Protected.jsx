import React, { useEffect, useState } from 'react'
import { Outlet, replace, useLocation, useNavigate } from 'react-router-dom'
import "../assets/Protected.css"
import mainMenu from "../assets/menu.svg"
import {whoAmI} from "../utilities/ProtectedApi.js"

export const Protected = () => {
  const location = useLocation();
  const STATE = location.state;
  const nav = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [pending, setPending] = useState (true);
  
const sysTime = new Date().getHours();

const dayTime = (
  sysTime <= 5 || sysTime > 21 ? "night"   :
  sysTime <= 12                ? "morning"  :
  sysTime <= 18                ? "afternoon":
                                 "evening"
);

  useEffect (() => {
    let currentName = null;
    currentName = STATE?.name || null;
    if (!currentName)
      currentName = sessionStorage.getItem("name");
    if (currentName){
      setLoggedUser(currentName);
      setPending(false);
    }

    const verifySession = async () => {
      const fromServer = "John Doe"
      // await whoAmI();
      if (fromServer){
        setLoggedUser(fromServer);
        setPending(false);
      }else{
        sessionStorage.clear();
        nav ("/login", {state: {message: "Session expired"}}, {replace: true})
      }
    }
    verifySession(nav, STATE);
  },[])

  return (
    <div className="app-container">
      <div className="header">
        <div className="logo">
          <h1>Budget-tracker</h1>
        </div>
        <div className="greeting">
          {loggedUser && <p>Hello {loggedUser}, good {dayTime}</p>}
        </div>
        <div className="main-menu">
          <img src={mainMenu} alt='menu' />
        </div>
      </div>
      <div className="content-container">
        {!pending && loggedUser && <Outlet />}
        {pending && <div className="pending-msg">Verifying session...</div>}
      </div>
    </div>
  );
};