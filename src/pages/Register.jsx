import React, { useEffect, useState } from 'react'
import { formFields } from "../config/formConfig.js"
import { FormField } from '../components/FormField'
import { register } from '../utilities/publicApi.js';
import { flattenForm, packForm } from '../utilities/formHelpers.js';

const flatForm = flattenForm (formFields);

export const Register = () => {
  const [formData, setFormData] = useState ({});
  const [formValidity, setFormValidity] = useState ({});
  const [isFormOk, setIsFormOk] = useState (false);

  useEffect(() => {
    const allFieldsValid = flatForm.every(field => {
      return formValidity[field.path] === true;
    });

    const allFieldsFilled = flatForm.every(field => {
      const val = formData[field.path];
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
    const structuredData = packForm(formData)
    const res = register(structuredData);
    console.log(res);
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleRegister}>
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
        <button type="button" onClick={handleReset}>Reset form</button>
      </form>
    </div>
  )
}