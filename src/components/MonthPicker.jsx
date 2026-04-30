import { ChevronLeft, ChevronRight, Calendar, RotateCcw } from 'lucide-react';

export const MonthPicker = ({value, onChange}) => {
    const handleMonthChange = (direction) => {
        const newDate = new Date(value.getFullYear(), value.getMonth() + direction, 1);
        onChange(newDate);
    };

    const resetToday = () => { 
        const today = new Date();
        onChange(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    const displayDate = value.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    const isCurrent = () => {
    const today = new Date();
    return value.getFullYear() === today.getFullYear() && 
            value.getMonth() === today.getMonth();
    };
    
  return (
    <div className = "month-picker">
        <button onClick={() => handleMonthChange(-1)} className = "icon-btn">
            <ChevronLeft size={20} />
        </button>

        <div className = "date-display">
            <Calendar size={18} style={{marginRight: '8px'}} />
            <span>{displayDate}</span>
        </div>

        {!isCurrent() &&
        <button onClick={() => handleMonthChange(1)} className = "icon-btn">
            <ChevronRight size={20} />
        </button>
        }
        <button onClick={resetToday} title='reset to today' className = "icon-btn reset-btn">
            <RotateCcw size={16} />
        </button>
    </div>
  );
};