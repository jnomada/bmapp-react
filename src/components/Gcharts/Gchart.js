import classes from './Gchart.module.css';
import { Chart } from "react-google-charts";

const Gchart = (props) => {
  return (
    <div className={classes['g-chart']}>
      <p className={classes['section-title']}>{props.title}</p>
      {props.data.length > 0
      ? <Chart className={classes.chart}
          chartType={props.chartType}
          data={props.data}    
          options={props.options}  
          width={props.width}
          height={props.height}
        />
      : <p>No data available</p>  
      }
    </div>
  )
}

export default Gchart;