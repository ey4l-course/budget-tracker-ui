import React from 'react'
import { Outlet } from 'react-router-dom'
import "../assets/Public.css"

export const Public = () => {
  return (
    <div className="main">
        <div className="title">
        <h1>Personal budget tracker</h1>
        <h3>control your every-day finance</h3>
      </div>
      <div className="form-wrapper">
        <Outlet />
      </div>
    </div>
  );
};
