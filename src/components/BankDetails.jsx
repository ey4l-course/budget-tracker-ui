import React, { useState } from 'react'

export const BankDetails = () => {
    const [providerData, setProviderData] = useState({});

    const updateProviderData = (name, value) => {
      setProviderData(prev => ({...prev, [name]: value }));
    };

    const handleAddProvider = async () => {
      console.log(providerData)
    }

  return (
    <form action = {handleAddProvider}>
        <select 
          name="bankName" 
          defaultValue="" 
          onChange={updateProviderData}
        >
          <option value="" disabled>bank name</option>
          <option value="10">10 - Leumi</option>
          <option value="12">12 - Poalim</option>
          <option value="11">11 - Discount</option>
          <option value="20">20 - Mizrahi-Tefahot</option>
          <option value="31">31 - First International</option>
        </select>

        <input
          type="number"
          name="branch"
          placeholder="branch number"
          onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
          onChange={updateProviderData}
        />

        <input
          type="number"
          name="account"
          placeholder="account number"
          onChange={updateProviderData}
        />

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
