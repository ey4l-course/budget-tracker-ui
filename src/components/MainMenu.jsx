import React from 'react'
import "./MainMenu.css"
import { MENU_CONFIG } from "../config/menuConfig.js"

export const MainMenu = ({onClick}) => {
  return (
    <div className="menu-dropdown">
        <ul>
            {MENU_CONFIG.map(item => (
              <li
                key={item.key}
                onClick={() => onClick(item)}
              >
                {item.label}</li>))}
        </ul>
    </div>
    
  )
}