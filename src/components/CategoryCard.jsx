import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown, EllipsisVertical } from 'lucide-react';
import { ExpenseItem } from './ExpenseItem';

export const CategoryCard = ({category}) => {
    const location = useLocation();


  const [isOpen,setIsOpen] = useState(false);

  return (
    <article className = "category-card">
        <section id="summary-view">
            <div className="category-header">
                <h3>{category?.name || "Category namee"}</h3>
                <EllipsisVertical />
            </div>
            <div className="subtotal-wrapper">
                <div className="top-row">
                    <div className="spent">
                        <h4>Spent</h4>
                        <h5>{category?.subtotal || "Spent"}</h5>
                    </div>
                    <div className="expected">
                        <h4>Expected</h4>
                        <h5>TBD</h5>
                    </div>
                </div>
                <div className="progress-bar-wrapper">
                    <div className="progress-bar" />
                </div>
                <div className="leftover">Expected-Spent</div>
            </div>
        </section>
        <div className="card-dropdown"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            role="button"
        >
            <span>Details</span>
            <ChevronDown/>
        </div>
        {isOpen &&
        <section className="details-section">
            <ul>
                {category.content.map((expense) => (
                  <ExpenseItem 
                    key={expense.id}
                    expenseItem = {expense}
                  />
                ))}
            </ul>
        </section>
        }
    </article>
  )
}



