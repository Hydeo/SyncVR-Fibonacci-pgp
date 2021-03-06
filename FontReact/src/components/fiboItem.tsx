import React from 'react';
import FiboItemPropsInterface from '../models/fiboItemPropsInterface';

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

//We have our interface here again
const FiboItem = ({id,index,result,useMemoization,execTime,creationDate}:FiboItemPropsInterface) =>{
  const classes = useStyles();
  const date = (new Date(creationDate._seconds*1000)).toUTCString();
  return (
    <Grid item xs={6} sm={2} key={id}>
      <Paper className={classes.paper}>
        <div>Result : <b>{result}</b></div>
        <div>Index : {index}</div>
        <div>Memoization : {useMemoization ? "Yes" : "No"}</div>
        <div>Time : {execTime.toFixed(5)}</div>
        <div>Date : {date}</div>
      </Paper>
    </Grid>
  );
}

export {FiboItem};