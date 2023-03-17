import { useState } from 'react';
import classes from './AddExpense.module.css';

const AddExpense = (props) => {

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState();
  const [expenseDate, setExpenseDate] = useState(new Date());
  const today = new Date().toISOString().substring(0,10);

  const expenseTypes = ['Transport', 'Food', 'Restaurants'].map(type => {
    return <option value={type}>{type}</option>
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://bmapp-api.jsealey.com/expenses/', {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "userId": props.userId,
          "type": type,
          "description": description,
          "amount": amount,
          "expenseDate": expenseDate
        })
      })

      response.status === 200 && props.onExpenseSubmit();

    } catch (error) {
      console.log(error);
    }
  }

  const onTypeChangeHandler = (e) => {
    setType(e.target.value);
  }
  
  const onDescriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  
  const onAmountChangeHandler = (e) => {
    setAmount(e.target.value);
  }

  const onExpenseDateChangeHandler = (e) => {
    setExpenseDate(e.target.value);
  }
  
  return (
    <div className={classes['add-expense']}>
      <p className={classes['section-title']}>Add Expense</p>
      <form onSubmit={onSubmitHandler}>
        <div className={classes['input-block']}>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={type} onChange={onTypeChangeHandler}>
            <option value=''>None selected</option>
            {expenseTypes}
          </select>
        </div>
        <div className={classes['input-block']}>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" onChange={onDescriptionChangeHandler}></input>
        </div>
        <div className={classes['input-block']}>
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" name="amount" onChange={onAmountChangeHandler}></input>
        </div>
        <div className={classes['input-block']}>
          <label htmlFor="amount">Date:</label>
          <input type="date" id="date" name="date" defaultValue={today} onChange={onExpenseDateChangeHandler}></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddExpense;