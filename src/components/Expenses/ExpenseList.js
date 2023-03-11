import classes from './ExpenseList.module.css';
import React, {useState } from 'react';
import Expense from './Expense';
import ExpenseFilter from './ExpenseFilter';

const ExpenseList = (props) => {

  const [checkedItems, setCheckedItems] = useState([]);

  const onSelectHandler = (e) => {
    const checkbox = e.target;
    if(checkbox.checked) {
      setCheckedItems((prevCheckedItems) => {
        return [e.target.value, ...prevCheckedItems];
      });
    } else {
      const index = checkedItems.indexOf(String(e.target.value).toString());
      if (index > -1) {
        let itemAarray = [...checkedItems];
        itemAarray.splice(itemAarray.indexOf(index));
        setCheckedItems(itemAarray);
      }
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
          "deleteExpenses": checkedItems
        })
      })

      response.status === 200 && props.updateExpenseList();
      setCheckedItems([]);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
        <div className={classes.expenseList}>
          <p className={classes['section-title']}>Expenses</p>
          <ExpenseFilter onDateChange={props.onDateChange} />
          <button onClick={onSubmitDeletionHandler}>Delete</button>
          {props.hasDataLoaded && (
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
          )}
        </div>
    </React.Fragment>
  )
}

export default ExpenseList;