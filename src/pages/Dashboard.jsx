import React from 'react'

export const Dashboard = () => {
const BASE = import.meta.env.VITE_API_BASE; 
  const handleTestCookies = async () => {
    try {
      // Assuming the controller mapping is still /public based on your login log
      // If this method is in a different controller, adjust the path (e.g., /api/test-cookies)
      await fetch(`${BASE}/public/test-cookies`, { 
        method: "GET",
        credentials: "include" // <--- THE MOST IMPORTANT LINE
      });
      console.log("Test request sent! Check server logs.");
    } catch (error) {
      console.error("Test failed:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      
      {/* The Test Button */}
      <button onClick={handleTestCookies} style={{ marginTop: '20px', padding: '10px' }}>
        Test Cookie Round-Trip
      </button>
    </div>
  );
};
