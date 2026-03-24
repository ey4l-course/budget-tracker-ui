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
    <div className = "month-picker">
        <button onClick={() => handleMonthChange(-1)} className = "icon-btn">
            <ChevronLeft size={20} />
        </button>

        <div className = "date-display">
            <Calendar size={18} style={{marginRight: '8px'}} />
            <span>{displayDate}</span>
        </div>

        <button onClick={() => handleMonthChange(1)} className = "icon-btn">
            <ChevronRight size={20} />
        </button>

        <button onClick={resetToday} title='reset to today' className = "icon-btn reset-btn">
            <RotateCcw size={16} />
        </button>
    </div>
  );
};