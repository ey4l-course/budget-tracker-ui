import React, { useState } from 'react'
import { formFields } from "../config/formConfig.js"
import { FormField } from '../components/FormField'
import { checkPasswordRules } from '../utilities/validator.js'

export const Register = () => {
  const [formData, setFormData] = useState ({});
  const [formValidity, setFormValidity] = useState ({});

  const updateFormData = (name, value) => {

    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const updateFormValidity = (name, isValid) => {
    setFormValidity(prev => ({ ...prev, [name]: isValid }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
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
        <button type = "submit">Register</button>
      </form>
    </div>
  )
}