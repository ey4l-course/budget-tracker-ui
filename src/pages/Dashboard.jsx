import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import "./Dashboard.css";
import { MonthPicker } from '../components/MonthPicker';
import { CategoryCard } from '../components/CategoryCard';
import { fetchConfigs, fetchDashboardData, postBatchTxns } from '../utilities/ProtectedApi';
import { Loader2, Plus } from 'lucide-react';
import { TxnModal } from '../components/TxnModal';


export const Dashboard = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState (true);
  const [month, setMonth] = useState (() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [batchTxnPayload, setBatchTxnPayload] = useState ([]);
  const [isModalOpen, setIsModalOpen] = useState (false);
  const [modalKey, setModalKey] = useState (0);
  
  useEffect(() => {
    let isMounted = true;
    const dashboardData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const results = await Promise.all([fetchDashboardData("warmup"), fetchConfigs()])
        const responseWu = results[0];
        const responseCfg = results[1];
      if (isMounted)
        if (responseWu.do === "render" && responseCfg === "ok"){
          setData(responseWu.message);
          setLoading(false);
        }else{
          if (responseWu.do === "nav"){
            nav(`${responseWu.path}`, {state: {logId: responseWu.logID, message: responseWu.message}});
          }else{
            nav(`${responseCfg.path}`, {state: {logId: responseCfg.logID, message: responseCfg.message}});
          }
        }
    }
    dashboardData();
    return () => { isMounted = false; }
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

  const onOpenModal = () => { setIsModalOpen(true); }

  const onCloseModal = () => { setIsModalOpen(false); }

  const addMoreTxn = (txnData) => {
    setBatchTxnPayload(prev => [...prev, txnData])
    setModalKey(prev => prev + 1);
  }
  
  const submitNewTxns = async (txnData) => {
    const finalPayload = [...batchTxnPayload, txnData]
    const response = await postBatchTxns(finalPayload);
    if (response.do === "nav"){
      nav(`${response.path}`, {state: {logId: response.logID, message: response.message}});     
    } else {
      console.log(response.message);
      setBatchTxnPayload ([]);
      setIsModalOpen (false);
    }
  }

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
      {isModalOpen &&
        <TxnModal
          key={modalKey}
          onClose={onCloseModal}
          addTxn={addMoreTxn}
          onSubmit={submitNewTxns}
        />
      }
    </div>
  );
};