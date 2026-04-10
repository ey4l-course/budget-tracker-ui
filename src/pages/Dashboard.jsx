import React, { useState } from 'react'
// import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MonthPicker } from '../components/MonthPicker';
import { CategoryCard } from '../components/CategoryCard';
import dummy from "../utilities/dev/dummy.json"


export const Dashboard = () => {
  // const location = useLocation();
  // const nav = useNavigate();
  // const user = location.state;
  const [txn, setTxn] = useState([]);

  //TODO: remove later.
  () => setTxn(dummy);

  return (
    <div className = "dashboard-view">
      <MonthPicker />
      <div className="categories-list">
          {txn.map (category => (
          <CategoryCard 
            key={category.name}
            category = {category}
          />
        ))};
      </div>
    </div>
  );
};
