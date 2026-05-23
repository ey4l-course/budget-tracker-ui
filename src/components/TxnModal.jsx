import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { FormField } from './FormField';
import './TxnModal.css';
import { TxnModalFields as data } from '../config/formConfig';

export const TxnModal = ({ categories, onClose, addTxn, onSubmit }) => {
    const [txnData, setTxnData] = useState({date: new Date().toISOString().split('T')[0]});
    const [formValidity, setFormValidity] = useState({date: true});
    const [isFormOk, setIsFormOk] = useState(false);

    
    useEffect(() => {
        const allFieldsValid = Object.keys(data).every(field => {
            return formValidity[field] === true;
    });

        const allFieldsFilled = Object.keys(data).every(field => {
          const val = txnData[field];
        return val !== undefined && val !== "";
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFormOk(allFieldsValid && allFieldsFilled);
    }, [txnData, formValidity]);
    
    const handleFormSumbit = (e) => {
        e.preventDefault();
        onSubmit(txnData);
    }

    const handleMoreTxn = () => {
        addTxn(txnData);
    }

    const updateFormData = (name, value) => {    
        setTxnData(prev => ({ ...prev, [name]: value }));
    };
    
    const updateFormValidity = (name, isValid) => {
        setFormValidity(prev => ({ ...prev, [name]: isValid }));
    };

  return (
    <div className = "modal-backdrop" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
                <h2>Add Transaction</h2>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleFormSumbit}>
                {Object.entries(data).map(([key, field]) => (
                            <FormField
                                key = {key}
                                name = {key}
                                type = {field.type}
                                value={txnData[key] || ""}
                                placeholder = {field.placeholder}
                                validator = {field.validator}
                                onChange = {updateFormData}
                                onValidityChange = {updateFormValidity}
                                options = {field.type === "select" ? categories : null}
                            />
                        ))
                }
                <button type = "submit" disabled = { !isFormOk }>Submit</button>
                <button onClick={handleMoreTxn} disabled = { !isFormOk }>Add transaction</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    </div>
  )
}
