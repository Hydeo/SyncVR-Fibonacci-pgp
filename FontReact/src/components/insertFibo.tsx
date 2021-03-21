import React, { useState }from 'react';

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


const InsertFibo = (props) =>{

  const [index, setIndex] = useState(0);
  const [memoization, setMemoization] = useState(true);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
      <Grid item xs>
        <TextField
          id="standard-number"
          label="Index"
          type="number"
          defaultValue={index}
          onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setIndex(Number(event.target.value))}}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={error}
          error={error == "" ? false : true}
        />
      </Grid>
      <Grid item xs>
        <FormControlLabel control={
          <Checkbox
              checked={memoization}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setMemoization(event.target.checked)}}
              name="checkedB"
              color="primary"
            />} 
          label="Use Memoization"
        />
      </Grid>
      <Grid item xs>
        <Button
          variant="contained"
          color="primary"
          onClick={() => { 
            setLoading(true);
            postFiboEntry({index, memoization})
            .then((res)=>{
              setLoading(false);
              if(res.status != "sucess"){
                if(res.hasOwnProperty("message")){
                  setError(res.message);
                }
                else{
                  setError("Couldn't Compute 🙍");
                }
              }
              else{
                props.callback(res.data);
              }
            })
            }
          }
          className={classes.button}
        >
          Compute {loading ? "🏃" : "🚀"}
        </Button>
      </Grid>
    </Grid>
  );
}


export {InsertFibo};