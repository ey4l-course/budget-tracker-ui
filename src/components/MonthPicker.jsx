import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';

export const MonthPicker = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleMonthChange = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const resetToday = () => { setCurrentDate(new Date()); };

    const displayDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    
  return (
    <div style={containerStyle}>
        <button onClick={() => handleMonthChange(-1)} style={buttonStyle}>
            <ChevronLeft size={20} />
        </button>

        <div style={dateDisplayStyle}>
            <Calendar size={18} style={{marginRight: '8px'}} />
            <span>{displayDate}</span>
        </div>

        <button onClick={() => handleMonthChange(1)} style={buttonStyle}>
            <ChevronRight size={20} />
        </button>

        <button onClick={resetToday} title='reset to today' style={buttonStyle}>
            <RotateCcw size={16} />
        </button>
    </div>
  );
};
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#f4f4f4',
  padding: '8px 16px',
  borderRadius: '20px',
  width: 'fit-content',
  fontFamily: 'sans-serif'
};

const dateDisplayStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: '600',
  minWidth: '150px',
  justifyContent: 'center'
};

const buttonStyle = {
  border: 'none',
  background: '#888',
  borderRadius: '50%',
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const resetButtonStyle = {
  ...buttonStyle,
  marginLeft: '10px',
  color: '#666'
};