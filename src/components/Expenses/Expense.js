import classes from './Expense.module.css';

const Expense = (props) => {
  return (
    <tr className={classes.expense}>
      <td>
        <input 
          value={props.expenseId} 
          type="checkbox" 
          onChange={props.onSelect}
        />
      </td>
      <td>{props.date}</td>
      <td>{props.type}</td>
      <td>{props.description}</td>
      <td>{props.amount}</td>
    </tr>
  )
}

export default Expense;