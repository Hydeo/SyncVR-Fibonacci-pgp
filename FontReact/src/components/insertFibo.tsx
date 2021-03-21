import React, { useState }from 'react';

import FiboInsertInterface from '../models/fiboEntry';
import {postFiboEntry} from '../services/fibonacciService';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);


const InsertFibo = () =>{
  const [index, setIndex] = useState(0);
  const [memoization, setMemoization] = useState(true);
  const [error,setError] = useState("");
  const classes = useStyles();


  return (
    <Grid item xs>
      <TextField
        id="standard-number"
        label="Index"
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setIndex(Number(event.target.value))}}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={error}
        error={error == "" ? false : true}
      />

      <FormControlLabel control={
        <Checkbox
            checked={memoization}
            onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setMemoization(event.target.checked)}}
            name="checkedB"
            color="primary"
          />} 
        label="Use Memoization"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => { 
          postFiboEntry({index, memoization})
          .then((res)=>{
            if(res.status != "sucess"){
               setError(res.message);
            }
            else{
              setError("");
              //call parent function to update the state holding the fiboItems
            }
          })
          }
        }
        className={classes.button}
      >
        Compute 🚀
      </Button>
    </Grid>
  );
}


export {InsertFibo};