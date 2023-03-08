import classes from './ExpenseList.module.css';
import React from 'react';
import Expense from './Expense';
import ExpenseFilter from './ExpenseFilter';

const ExpenseList = (props) => {

  return (
    <React.Fragment>
        <div className={classes.expenseList}>
          <p className={classes['section-title']}>Expenses</p>
          <ExpenseFilter onDateChange={props.onDateChange} />
          {props.hasDataLoaded && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.expenseData.map(expense => {
                  return <Expense key={expense.expenseId} date={expense.expenseDate} amount={expense.amount} type={expense.type} description={expense.description} />
                })}
              </tbody>
            </table>
          )}
        </div>
    </React.Fragment>
  )
}

export default ExpenseList;