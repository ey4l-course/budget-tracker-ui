import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MonthPicker } from '../components/MonthPicker';
import { CategoryCard } from '../components/CategoryCard';


export const Dashboard = () => {
  const location = useLocation();
  const nav = useNavigate();
  const user = location.state;
  const [txn, setTxn] = useState([]);
  return (
    <div>
      <MonthPicker />
      <CategoryCard />
    </div>
  );
};
