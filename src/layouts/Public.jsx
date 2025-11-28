import React from 'react'
import { Outlet } from 'react-router-dom'

export const Public = () => {
  return (
    <div>
        <Outlet />
    </div>
  );
};
