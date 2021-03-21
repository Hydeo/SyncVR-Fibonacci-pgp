import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


//We have to build an interface to please TS and avoid type issues
import FiboEntryInterface from './models/fiboItemPropsInterface'; 
import {getAllFiboEntries} from './services/fibonacciService';
import {FiboItem} from './components/fiboItem';
import {InsertFibo} from './components/insertFibo';
import {FiboGraph} from './components/fiboGraph';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


function App() {
  
  const [fiboItems, setFiboItems] = useState<any[]>([]);
  const classes = useStyles();
  const pushFiboEntry = (newEntry) =>{
    setFiboItems([...fiboItems,newEntry]);
  }
  //We use the useEffect hook to call our service and fetch the existing entries
  useEffect(() => {
    getAllFiboEntries()
      .then(items => {
          //Once the promise has resolved, we update the App component state with the gathered data 
          setFiboItems(items)
      })
  }, [])

  
  return (
    <div className="App">
    <h1>SyncVR Assignement Paul Garcia Pelayo </h1>
        
        <InsertFibo callback={pushFiboEntry}/>

        <FiboGraph fiboItems={fiboItems}/>

        <Grid container spacing={3}>
            {fiboItems.map((item: FiboEntryInterface,index)=>{
              return <FiboItem {...item} key={index}/>
            })}
        </Grid>
    </div>
  );
}

export default App;
