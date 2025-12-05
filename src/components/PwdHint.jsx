import React from 'react'

export const PwdHint = ({pwdRules}) => {
  return (
    <div className="pwd-rules">
        <div className = {pwdRules.capital ? "rule-ok" : "rule-bad"}>Uppercase letter</div>
        <div className = {pwdRules.small ? "rule-ok" : "rule-bad"}>Lower case letter</div>
        <div className = {pwdRules.digit ? "rule-ok" : "rule-bad"}>Digit</div>
        <div className = {pwdRules.symbol ? "rule-ok" : "rule-bad"}>Special character (!@#$%^&*)</div>
        <div className = {pwdRules.length ? "rule-ok" : "rule-bad"}>Length of 8 characters or more</div>
    </div>
  )
}
