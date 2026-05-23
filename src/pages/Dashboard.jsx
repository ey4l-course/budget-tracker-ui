import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Dashboard.css";
import { MonthPicker } from '../components/MonthPicker';
import { CategoryCard } from '../components/CategoryCard';
import { fetchDashboardData } from '../utilities/ProtectedApi';
import { Loader2, Plus } from 'lucide-react';


export const Dashboard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState (true);
  const [month, setMonth] = useState (() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  
  useEffect(() => {
    const dashboardData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await fetchDashboardData("warmup");
        if (response.do === "render"){
          setData(response.message);
          setLoading(false);
        }else{
          nav(`${response.path}`, {state: {logId: response.logID, message: response.message}});          
        }
    }
    dashboardData();
  },[nav])

  const updateMonth = async (val) => {
    setMonth(val)
    setLoading(true);
    const response = await fetchDashboardData("fetch-dashboard", `${val.getFullYear()}-${String (val.getMonth() + 1).padStart(2,"0")}`);
    if (response.do === "render"){
      setData(response.message);
      setLoading(false);
    }else{
      nav(`${response.path}`, {state: {logId: response.logID, message: response.message}});     
    }
  }

  const onOpenModal = () => {}

  return (
    <div className = "dashboard-view">
      <div className="dashboard-controls">
        <MonthPicker
          value={month}
          onChange={updateMonth}
        />
        <button className = "add-txn-btn" onClick={onOpenModal}>
          <Plus size={20} />
          <span>New transaction</span>
        </button>  
      </div>
      <div className="categories-list">
          { loading
          ? <Loader2
              size={20}
              className = "lucide-spinner"
             />
          : data.map (category => (
          <CategoryCard 
            key={category.name}
            category = {category}
          />
        ))};
      </div>
    </div>
  );
};
