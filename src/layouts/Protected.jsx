import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./Protected.css"
import mainMenu from "../assets/menu.svg"
import {logout, whoAmI} from "../utilities/ProtectedApi.js"
import { X, Menu } from 'lucide-react'
import { MainMenu } from '../components/MainMenu.jsx'

export const Protected = () => {
  const [isMenuOpen, setIsMenuOpen] = useState (false);
  const location = useLocation();
  const STATE = location.state;
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(
    () => STATE?.message?.name || sessionStorage.getItem("name") || null
  );
  const [pending, setPending] = useState (
    () => !(STATE?.message?.name || sessionStorage.getItem("name"))
  );
  
const sysTime = new Date().getHours();

const dayTime = (
  sysTime <= 5 || sysTime > 21 ? "night"   :
  sysTime <= 12                ? "morning"  :
  sysTime <= 18                ? "afternoon":
                                 "evening"
);

  useEffect (() => {
    const verifySession = async () => {
      const fromServer = await whoAmI();
      if (fromServer){
        setLoggedUser(fromServer);
        setPending(false);
      }else{
        sessionStorage.clear();
        navigate ("/login", {state: {message: "Session expired"}, replace: true})
      }
    }
    verifySession();
  },[navigate])

  const updateView = async (chosenView) => {
    setIsMenuOpen(false);
    if (chosenView.label === "Logout"){
      sessionStorage.clear();
      const res = await logout();
      navigate(`${res.path}`, {state: {logId: res.logID, message: res.message}, replace: true });
      return;
    }
    if (chosenView.label === "Contact us"){
      window.location.href = chosenView.path;
      return;
    }
    navigate(chosenView.path);
  }
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="protected-layout-root">
      <div className="app-container">
        <div className="header">
          <div className="logo">
            <h1>Budget-tracker</h1>
          </div>
          <div className="greeting">
            {loggedUser && (
              <p>
                Hello {loggedUser}, <span className = "greeting-time">good {dayTime}</span>
              </p>
            )}
          </div>
          <div className="main-menu" onClick={toggleMenu} style={{ cursor: `pointer`}}>
            {isMenuOpen ? <X size={24}/> : <Menu size={24} />}
          </div>
        </div>
        {isMenuOpen && <MainMenu onClick = {updateView}/>}
        <div className={`content-container ${isMenuOpen ? "blur-active" : ""}`}>
          {!pending && loggedUser && <Outlet />}
          {pending && <div className="pending-msg">Verifying session...</div>}
        </div>
      </div>
    </div>
  );
};