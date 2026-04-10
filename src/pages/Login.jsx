import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utilities/publicApi';

export const Login = () => {
  const navigate = useNavigate ();
  const [userName, setUserName] = useState ("");
  const [password, setPassword] = useState ("");
  const [pending, setPending] = useState (false);
  const [error, setError] = useState ("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {"username": userName, "password": password};
    setPending(true);
    const res = await login(user)
    if (res.do === "render")
      setError(res.message)
    if (res.do === "nav"){
      setUserName ("");
      setPassword ("");
      setError ("");
      if (res.path != "/error"){
        sessionStorage.setItem("name", res.message);
      }
      // console.log(res.message);
      navigate(`${res.path}`, {state: {logId: res.logID, message: res.message}})
    }
    setPending(false);
  }

  return (
      <form onSubmit = { handleLogin } >
        <div className="form-fields">
          <input type="text"
          name = "userName"
          placeholder = "Username"
          onChange = {e => {setUserName(e.target.value)}} />
        </div>
        <div className="form-fields">
          <input type="password"
          name = "password"
          placeholder = "Password"
          onChange = {e => {setPassword(e.target.value)}} />
        </div>
          <button type = "submit" disabled = {pending || userName.length < 4 || password.length < 8}>
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
