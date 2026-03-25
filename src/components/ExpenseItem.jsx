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
    </li>
  )
}
