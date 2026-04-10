import React, { useEffect, useState } from 'react'
import { formFields } from "../config/formConfig.js"
import { FormField } from '../components/FormField'
import { register } from '../utilities/publicApi.js';
import { flattenForm, packForm } from '../utilities/formHelpers.js';
import { useNavigate } from 'react-router-dom';

const flatForm = flattenForm (formFields);

export const Register = () => {
  const [formData, setFormData] = useState ({});
  const [formValidity, setFormValidity] = useState ({});
  const [isFormOk, setIsFormOk] = useState (false);
  const [error, setError] = useState ("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const allFieldsValid = flatForm.every(field => {
      return formValidity[field.path] === true;
    });

    const allFieldsFilled = flatForm.every(field => {
      const val = formData[field.path];
      return val !== undefined && val !== "";
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFormOk(allFieldsValid && allFieldsFilled);
  }, [formData, formValidity]);

  const updateFormData = (name, value) => {    
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const updateFormValidity = (name, isValid) => {
    setFormValidity(prev => ({ ...prev, [name]: isValid }));
  };

  const handleReset = () => {
    setFormData({});
    setFormValidity({});
    setIsFormOk(false);    
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const structuredData = packForm(formData)
    const res = await register(structuredData);
    if (res.status === 201){
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }else if (res.status === 400){
      setError(res.message)
    }else{
      navigate("/error", {state: {logId: res.logID, message: res.message}})
    }
  };

  return (
    <div className="registration-form">
      {success &&
          <div className="success-message" role="alert">
            <h2>User sucsessfuly created</h2>
            <p>Redirecting...</p>
          </div>
      }
      <form onSubmit={handleRegister} style={{ opacity: success ? 0.5 : 1, pointerEvents: success ? 'none' : 'auto' }}>
        {flatForm.map(field => (
          <FormField
            key={field.path}
            name={field.path}
            type={field.type}
            value={formData[field.path]}
            placeholder={field.placeholder}
            validator={field.validator}
            onChange={updateFormData}
            onValidityChange={updateFormValidity}
          />
        ))}
        <button type = "submit" disabled = {!isFormOk}>Register</button>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button type="button" onClick={handleReset}>Reset form</button>
      </form>
    </div>
  )
}