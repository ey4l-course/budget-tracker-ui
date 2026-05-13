import React from 'react'
import "./MainMenu.css"

export const MainMenu = () => {
    const menuItems = ["App settings", "Account settings", "Export cashflow", "Contact us", "Logout"];
  return (
    <div className="menu-dropdown">
        <ul>
            {menuItems.map(item => <li>{item}</li>)}
        </ul>
    </div>
    
  )
}