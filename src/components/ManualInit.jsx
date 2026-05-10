import React, { useState } from 'react'
import { initLoginManual, submitLoginManual } from '../utilities/ProtectedApi';
import { data, useNavigate } from 'react-router-dom';
import { Trash2, Plus, CheckCircle2 } from 'lucide-react';
// import dummy from "../utilities/dev/dummyCategories.json"

export const ManualInit = () => {
    const navigate = useNavigate();
    const [pending, setPending] = useState(false);
    const [estimates, setEstimates] = useState ([]);
    const [fetchedData, setFetchedData] = useState ([]);

    
    const updateEstimate = (name, value, data) => {
        setEstimates (
            [{
                categoryName: name,
                categoryType: data,
                amount: value
            }]);
        };
    
    const handleConfigUpdate = (catKey, propKey, value) => {
        setFetchedData(prev => 
            prev.map(item => item.id === catKey
                ? {...item, [propKey]: value}
                : item
            )
        );
    }
    const handleManual = async () => {
        setPending(true);
        const response = await initLoginManual(estimates);
        if (response.do === "render"){
            const data = response.message;
            setFetchedData(data.map((item, index) => ({...item, id: index})))
            setPending(false)
        }else{
            navigate(`${response.path}`, {state: {logId: response.logID, message: response.message}});
        };
    }

    const handleRemove = (id) => {
        setFetchedData(prev => prev.filter((obj) => obj.id !== id))
    }

    const handleAddCategory = () => {
        setFetchedData(
            [...fetchedData, {
                id: fetchedData.length,
                username: null,
                categoryName: "New category",
                categoryType: "EXPENSE",
                amount: 0,
                manual: true
            }]
    )};

    const handleSubmit = async () => {
        const payload = fetchedData.map(({id,...rest}) => rest);
        const res = await submitLoginManual(payload);
        navigate(res.path, {state: {logId: res.logID, message: res.message}});
    }

  return (
    <div className="tab-content-panel">
        <h3>Manual account setup</h3>
        <p className = "intro">
            Brief explanation of how the system estimates (I'll re-write it later):
            Enter your total estimated monthly income including sallaries, grants, goverment payments, etc..
            We will provide a rough recommendations for your budget based on our analisys and your income.
            In the next step you will be able to adjust our recommendation to suit your needs.
        </p>
        <input
            type="number"
            name="income"
            data-type="INCOME"
            onChange={(e => updateEstimate(e.target.name, e.target.value, e.target.dataset.type))}
        />
        <button className = "primary-btn" onClick={handleManual}>Show me</button>
        {fetchedData.length > 0 &&
        <>
            <ul className = "category-config-list">
                {fetchedData.map(cat => 
                    <li className = "category-config-item" key = {cat.id}>
                        <input
                            type="text"
                            value={cat.categoryName}
                            onChange={e => handleConfigUpdate(cat.id, "categoryName", e.target.value)}
                        />
                        <input 
                            type="number"
                            value={cat.amount}
                            onChange={e => handleConfigUpdate(cat.id, "amount", e.target.value)}
                        />
                        <button
                            className = "icon-btn-danger"
                            onClick = {() => handleRemove(cat.id)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </li>
                )}
            </ul>
            <div className="action-row">
                <button className="secondary-btn" onClick={handleAddCategory}>
                    <Plus size={18} /> Add category
                </button>
                <button className="primary-btn" onClick={handleSubmit}>
                    <CheckCircle2 size={18} /> Submit
                </button>
            </div>
        </>
        }
    </div>
  )
}