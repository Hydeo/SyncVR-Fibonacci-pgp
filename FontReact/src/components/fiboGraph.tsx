import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend} from 'recharts';
import Grid from '@material-ui/core/Grid';

/*
This component groups by generation type (Memoization or not) and then by Index, we calculated the avg exec time for each Index if we have sevral 
data point for one index and then we squash all that together again to feed it to rechats.
There is definitly some opti to do there, at least in clarity, with some map/reduce/filter correctly used.
*/

const FiboGraph = (props) =>{
  if(props.fiboItems.length == 0)
    return (null);

  const getAverageExecTimeForIndexes = (items,fieldName)=>{
    let execTimeByIndexes = {};

    items.forEach(i =>{
      if(!Object.prototype.hasOwnProperty.call(execTimeByIndexes, i.index)){
        execTimeByIndexes[i.index] = {index : i.index}
        execTimeByIndexes[i.index][fieldName+"execTime"] =  i.execTime
        execTimeByIndexes[i.index][fieldName+"count"] =  1
      }
      else{
        execTimeByIndexes[i.index][fieldName+"execTime"] += i.execTime;
        execTimeByIndexes[i.index][fieldName+"count"] += 1;
      }
    })

    for (let key in execTimeByIndexes) {
      execTimeByIndexes[key][fieldName+"AvgExecTime"] = execTimeByIndexes[key][fieldName+"execTime"] / execTimeByIndexes[key][fieldName+"count"];
    }
    return execTimeByIndexes;
  }

  //Thank you to the guy who made this
  const merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }

  let avgFiboItemWithMemoization = getAverageExecTimeForIndexes(props.fiboItems.filter(i => i.useMemoization),"WithMemoization");
  let avgFiboItemWithOutMemoization = getAverageExecTimeForIndexes(props.fiboItems.filter(i => !i.useMemoization),"WithOutMemoization");

  let frankeinFiboItem = Object.values(merge(avgFiboItemWithMemoization, avgFiboItemWithOutMemoization));

  return(
    <Grid container style={{height:"40vh"}}>
      <ResponsiveContainer>
        <LineChart data={frankeinFiboItem} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Legend verticalAlign="top" height={36}/>
          <Line name="Avg Exec Time With Memoization" type="monotone" dataKey="WithMemoizationAvgExecTime" stroke="#8884d8" />
          <Line name="Avg Exec Time WithOut Memoization"type="monotone" dataKey="WithOutMemoizationAvgExecTime" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="index" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </Grid>
  )
}

export {FiboGraph};