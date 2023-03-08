import classes from './ExpenseFilter.module.css';

const ExpenseFilter = (props) => {

  const onDateChange = (e) => {
    props.onDateChange(new Date(e.target.value));
  }

  return (
    <div className={classes['expense-filter']}>
      <input type="month" id="date" name="date" onChange={onDateChange}/>
    </div>
  )
}

export default ExpenseFilter;