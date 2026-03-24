import { EllipsisVertical } from 'lucide-react'
import React from 'react'

export const ExpenseItem = ({expenseItem}) => {

  return (
    <li className = "expense-item">
        <div className="expense-info">
            <span className = "expense-name">{expenseItem.name}</span>
            <span className = "expense-date">{expenseItem.date}</span>
        </div>

        <div className="expense-action">
            <span className = "expense-amount">{expenseItem.amount}</span>
            <button className = "icon-btn" aria-label = "Expense options">
                <EllipsisVertical />
            </button>
        </div>

        <style>{`
        .expense-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        /* Remove the border from the very last item so it doesn't look weird in the card */
        .expense-item:last-child {
          border-bottom: none;
        }

        .expense-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .expense-name {
          font-weight: 500;
          color: #1f2937;
        }

        .expense-date {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .expense-action {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .expense-amount {
          font-weight: 600;
          color: #111827;
        }

        .icon-btn {
          background: transparent;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          border-radius: 4px;
        }
        
        .icon-btn:hover {
          background-color: #f3f4f6;
        }
      `}</style>
    </li>
  )
}
