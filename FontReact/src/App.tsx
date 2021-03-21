import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {getAllFiboEntires} from './services/fibonacci';
import {FiboItem} from './components/fiboItem';
//We have to build an interface to please TS and avoid type issues
import FiboEntryInterface from './models/fiboEntry'; 

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
    getAllFiboEntires()
      .then(items => {
          //Once the promise has resolved, we update the App component state with the gathered data 
          setList(items)
      })
  }, [])


  return (
    <div className="App">
    <h1>SyncVR Assignement Paul Garcia Pelayo </h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {process.env.REACT_APP_API_URL}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Grid container spacing={3}>
            {list.map((item: FiboEntryInterface,index)=>{
              return <FiboItem {...item}/>
            })}
      </Grid>
    </div>
  );
}

export default App;
