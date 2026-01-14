import React from 'react'

export const PwdHint = ({pwdRules}) => {
  return (
    <div className="pwd-hints">
        <div className = {pwdRules.capital ? "hint met" : "hint"}>Uppercase letter</div>
        <div className = {pwdRules.small ? "hint met" : "hint"}>Lower case letter</div>
        <div className = {pwdRules.digit ? "hint met" : "hint"}>Digit</div>
        <div className = {pwdRules.symbol ? "hint met" : "hint"}>Special character (!@#$%^&*)</div>
        <div className = {pwdRules.length ? "hint met" : "hint"}>Length of 8 characters or more</div>
    </div>
  )
}
