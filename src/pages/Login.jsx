import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import "../assets/Public.css"

export const Login = () => {
  const [userName, setUserName] = useState ("");
  const [password, setPassword] = useState ("");
  const [pending, setPending] = useState (false);
  const [error, setError] = useState ("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");
  }

  return (
      <form onSubmit = { handleLogin } >
        <div className="form-fields">
          <input type="text"
          name = "userName"
          placeholder = "Username"
          onChange = {e => {setUserName(e.target.value); setError("")}} />
        </div>
        <div className="form-fields">
          <input type="password"
          name = "password"
          placeholder = "Password"
          onChange = {e => {setPassword(e.target.value); setError("")}} />
        </div>
          <button type = "submit" disabled = {pending || userName.length < 4 || password.length < 8 || error !== ""}>
            {pending ? "Processing..." : "Login"}
          </button>
        {error && <div className="form-error" role = "alert">{error}</div>}
        <footer>
          <Link to = "/register">Register new account</Link><br />
          <Link>Forgot password?</Link>
        </footer>
      </form>
  )
}
