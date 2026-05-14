import React, { useState } from 'react'
import { ChevronDown, ChevronUp, EllipsisVertical } from 'lucide-react';
import { ExpenseItem } from './ExpenseItem';
import { ProgressBar } from './ProgressBar';

export const CategoryCard = ({category}) => {
  const [isOpen,setIsOpen] = useState(false);
  const leftover = category.limitAmount - category.subtotal;
  return (
    <article className = "category-card">
        <section id="summary-view">
            <div className="category-header">
                <h3>{category?.name || "Category name"}</h3>
                <EllipsisVertical />
            </div>
            <div className="subtotal-wrapper">
                <div className="top-row">
                    <div className="spent">
                        <h4>Spent</h4>
                        <h5>{category.subtotal}</h5>
                    </div>
                    <div className="expected">
                        <h4>Expected</h4>
                        <h5>{category.limitAmount}</h5>
                    </div>
                </div>
                <ProgressBar
                    subtotal = {category.subtotal}
                    limit = {category.limitAmount}
                />
                {leftover > 0 && <div className="leftover-good"> You have {leftover}₪ left</div>}
                {leftover < 0 && <div className="leftover-bad"> You are {-leftover}₪ beyond budget</div>}
                {leftover === 0 && <div className="leftover-good"> You have reached your budget limit</div>}
                
            </div>
        </section>
        <div className="card-dropdown"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            role="button"
        >
            <span>Details</span>
            {isOpen && <ChevronUp />}
            {!isOpen &&<ChevronDown/>}
        </div>
        {isOpen &&
        <section className="details-section">
            <ul>
                {category.content?.map((expense) => (
                  <ExpenseItem 
                    key={expense.id}
                    expenseItem = {expense}
                  />
                )) || ""}
            </ul>
        </section>
        }
    </article>
  )
}



