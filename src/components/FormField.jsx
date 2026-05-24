import React, { useState } from 'react'
import { PwdHint } from './PwdHint';
import { checkPasswordRules } from '../utilities/validator';
import { checkUsername } from '../utilities/publicApi';
import './FormField.css';

export const FormField = ({name, type, value, placeholder, validator, onChange, onValidityChange, options}) => {
    const [focus, setFocus] = useState(false);
    const [error, setError] = useState("");
    const [pwdRules, setPwdRules] = useState({
      capital: false,
      small: false,
      digit: false,
      symbol: false,
      length: false
    });

    const handleBlur = async (e) => {
      setFocus(false);
      const val = e.target.value;
      if (name === "username" && val){
        const res = await checkUsername(val);
        if (res && res.fieldValue === val && res.message !== "Username available"){
          setError(res.message);
          onValidityChange(name, false);
        }
      }
    }

    const handleFocus = (e) => {
      setFocus(true);
      if (e.target.name === "username")
        setError("");
    }

    const handleInput = (e) => {
        const val = e.target.value;
        const valid = validator(val);

        onChange(name, val);
        onValidityChange(name, valid);
        if (name === "password") {
            setPwdRules(checkPasswordRules(val));
        }
    }
  return (
    <div className="form-fields">
      {type !== "select" &&
        <input
        name = {name}
        type = {type}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={!value ? "" : (validator(value) && !error) ? "valid-field" : "invalid-field"}
        />
      }
      {type === "select" &&
        <select
          name = {name}
          value={value || ""}
          placeholder={placeholder}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value = "" disabled>{placeholder}</option>
          {options && options.map(cat => (
            <option
              className = {cat.categoryType === "EXPENSE" ? "dropdown-expense" : "dropdown-income"}
              key={cat.categoryName}
              value={cat.categoryName}
            >
              {cat.categoryName}
            </option>))}
        </select>
      }

        { name === "password" && focus &&(<PwdHint pwdRules = {pwdRules}/>)}
        { name === "username" && error && !focus && (<span>{error}</span>)}
    </div>
  )
}
