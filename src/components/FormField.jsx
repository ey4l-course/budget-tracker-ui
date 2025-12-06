import React, { useState } from 'react'
import { PwdHint } from './PwdHint';
import { checkPasswordRules } from '../utilities/validator';

export const FormField = ({name, type, value, placeholder, validator, onChange, onValidityChange}) => {
    const [focus, setFocus] = useState(false);
    const [pwdRules, setPwdRules] = useState({
      capital: false,
      small: false,
      digit: false,
      symbol: false,
      length: false
    });

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
        <input
        name = {name}
        type = {type}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleInput}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={!value ? "" : validator(value) ? "valid-field" : "invalid-field"}
        />
        { name === "password" && focus &&(<PwdHint pwdRules = {pwdRules}/>)}
    </div>
  )
}
