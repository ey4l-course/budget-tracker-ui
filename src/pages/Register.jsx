import React, { useEffect, useState } from 'react'
import { formFields } from "../config/formConfig.js"
import { FormField } from '../components/FormField'
import { register } from '../utilities/publicApi.js';

export const Register = () => {
  const [formData, setFormData] = useState ({});
  const [formValidity, setFormValidity] = useState ({});
  const [isFormOk, setIsFormOk] = useState (false);

  useEffect(() => {
    const allFieldsValid = formFields.every(field => {
      return formValidity[field.name] === true;
    });

    const allFieldsFilled = formFields.every(field => {
      const val = formData[field.name];
      return val !== undefined && val !== "";
    });

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

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    const res = register(formData);
    console.log(res);
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleRegister}>
        {formFields.map(field => (
          <FormField
            key={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            placeholder={field.placeholder}
            validator={field.validator}
            onChange={updateFormData}
            onValidityChange={updateFormValidity}
          />
        ))}
        <button type = "submit" disabled = {!isFormOk}>Register</button>
        <button type="button" onClick={handleReset}>Reset form</button>
      </form>
    </div>
  )
}