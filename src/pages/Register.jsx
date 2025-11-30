import React from 'react'
// no css import

export const Register = () => {
  return (
      <form onSubmit={handleRegister}>
<input type="text" name = "id" placeholder = "id" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "username" placeholder = "username" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "password" placeholder = "password" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "givenName" placeholder = "givenName" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "surname" placeholder = "surname" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "mobile" placeholder = "mobile" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "email" placeholder = "email" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "address" placeholder = "address" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "state" placeholder = "state" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "city" placeholder = "city" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "street" placeholder = "street" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "house" placeholder = "house" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "apartment" placeholder = "apartment" onChange={e => {setMethod(e.target.value); setError("")}} /> 
<input type="text" name = "zipcode" placeholder = "zipcode" onChange={e => {setMethod(e.target.value); setError("")}} /> 
      </form>
  )
}
