import React from 'react';
import FiboEntryInterface from '../models/fiboEntry';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const FiboItem = ({id,index,result,useMemoization,execTime}:FiboEntryInterface) =>{
  const classes = useStyles();
  return (
    <Grid item xs key={id}>
      <Paper className={classes.paper}>
        <div>{index}</div>
        <div>{result}</div>
        <div>{useMemoization ? "Yes" : "No"}</div>
        <div>{execTime}</div>
      </Paper>
    </Grid>
  );
}


export {FiboItem};