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
        {/* --- TEMPORARY LAYOUT CSS --- */}
      {/* Keeping strictly to display, flex/grid, gap, and alignment. 
          Added a basic border/padding just so you can see the card's physical boundaries. */}
      <style>{`
        .category-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden; /* Prevents square corners from child elements poking out */
        }
        
        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .subtotal-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .top-row {
          display: grid;
          grid-template-columns: 1fr 1fr; /* Two equal columns */
          gap: 1rem;
        }

        .spent, .expected {
          display: flex;
          flex-direction: column;
        }

        .card-dropdown {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0.5rem 0; /* Makes it easier to tap on mobile */
        }

        .details-section {
          display: flex;
          flex-direction: column;
        }

        /* Temporary dummy styling for the progress bar so it's visible */
        .progress-bar-wrapper {
          width: 100%;
          height: 8px;
          background-color: #f3f4f6;
          border-radius: 4px;
        }
        .progress-bar {
          width: 45%; 
          height: 100%;
          background-color: #3b82f6;
          border-radius: 4px;
        }
      `}</style>
    </article>


  )
}



