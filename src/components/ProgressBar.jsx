import React from 'react'

export const ProgressBar = ({subtotal, limit}) => {
    const rawPercent = limit > 0 ? (subtotal / limit) * 100 : 100;  
    const percent = Math.min(100, Math.max(0, Math.round(rawPercent)));
  return (
    <div className="progress-bar-wrapper">
        <div
            className="progress-bar"
            style={{width: `${percent}%`}}
            role = "progressbar"
            aria-valuenow={percent}
        />
    </div>
  )
}
