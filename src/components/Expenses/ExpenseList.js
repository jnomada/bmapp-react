import classes from './ExpenseList.module.css';
import React, {useState } from 'react';
import Expense from './Expense';
import ExpenseActions from './ExpenseActions';

const ExpenseList = (props) => {

  let checkedItemArray = [];

  const onSelectHandler = (e) => {
    const checkbox = e.target;
    if(checkbox.checked && !checkedItemArray.includes(e.target.value)) {
      checkedItemArray.push(e.target.value);
    } 
    if(!checkbox.checked && checkedItemArray.includes(e.target.value)) {
      const checkedItems = checkedItemArray.filter(value => !(value === e.target.value));
      checkedItemArray = checkedItems;
    }
  }

  const onSubmitDeletionHandler = async () => {
    try {
      const response = await fetch('https://bmapp-api.jsealey.com/expenses', {
        method: 'DELETE',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userId": props.userId,
          "deleteExpenses": checkedItemArray
        })
      })

      response.status === 200 && props.updateExpenseList();
      checkedItemArray = [];

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
        <div className={classes.expenseList}>
          <p className={classes['section-title']}>Expenses</p>
          <ExpenseActions onDateChange={props.onDateChange} onDeleteSubmission={onSubmitDeletionHandler}/>
          {props.hasDataLoaded && (
            <div className={classes['scrollable']}>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {props.expenseData.map(expense => {
                    return (
                      <Expense 
                        key={expense.expenseId}
                        expenseId={expense.expenseId}  
                        date={expense.expenseDate} 
                        amount={expense.amount} 
                        type={expense.type} 
                        description={expense.description} 
                        onSelect={onSelectHandler}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </React.Fragment>
  )
}

export default ExpenseList;