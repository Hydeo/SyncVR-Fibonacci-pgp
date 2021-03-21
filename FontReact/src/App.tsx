import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


//We have to build an interface to please TS and avoid type issues
import FiboEntryInterface from './models/fiboEntry'; 
import {getAllFiboEntries} from './services/fibonacciService';
import {FiboItem} from './components/fiboItem';
import {InsertFibo} from './components/insertFibo';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


function App() {
  
  const [list, setList] = useState<any[]>([]);
  const classes = useStyles();
  
  //We use the useEffect hook to call our service and fetch the existing entries
  useEffect(() => {
    getAllFiboEntries()
      .then(items => {
          //Once the promise has resolved, we update the App component state with the gathered data 
          setList(items)
      })
  }, [])


  return (
    <div className="App">
    <h1>SyncVR Assignement Paul Garcia Pelayo </h1>
      <Grid container justify="center">
        <InsertFibo/>
      </Grid>
      <Grid container spacing={3}>
            {list.map((item: FiboEntryInterface,index)=>{
              return <FiboItem {...item}/>
            })}
      </Grid>
    </div>
  );
}

export default App;
