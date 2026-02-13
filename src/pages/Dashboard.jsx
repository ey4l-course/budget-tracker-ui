import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';

export const Dashboard = () => {
  const location = useLocation();
  const nav = useNavigate();
  const user = location.state;
  console.log(user);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
    </div>
  );
};
