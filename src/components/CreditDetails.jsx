import React, { useState } from 'react'

export const CreditDetails = () => {
    const [providerData, setProviderData] = useState({});

    const updateProviderData = (name, value) => {
      setProviderData(prev => ({...prev, [name]: value }));
    };

    const years = [];
    for (let i = 2026; i <=2040; i ++){
        years.push(i);
    }

    const handleAddProvider = async () => {
        console.log(providerData)
    }
    
  return (
    <form action={handleAddProvider}>
        <select 
          name="cardIssuer" 
          defaultValue="" 
          onChange={updateProviderData}
        >
          <option value="" disabled>Card issuer</option>
          <option value="10">C.A.L</option>
          <option value="12">Isracard</option>
          <option value="11">Max</option>
          <option value="20">Amex</option>
        </select>

        <input
          type="number"
          name="cardNumber"
          placeholder="Card number (Last 4 digits)"
          onInput={(e) => e.target.value = e.target.value.slice(0, 4)}
          onChange={updateProviderData}
        />
        <div>
            <h4>Valid thru:</h4>
            <input
            type="month"
            name="month"
            onChange={updateProviderData}
            />

            <select
                name = "year"
                defaultValue = ""
                onChange={updateProviderData}
            >
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
        <div>
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            onChange={updateProviderData}
          />
          <small>nickname helps you identify your accounts</small>
        </div>
    </form>
  )
}
